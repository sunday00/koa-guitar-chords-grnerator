import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/chord";

const READ_CHORD = "chord/READ_CHORD";
const READ_CHORD_DONE = "chord/READ_CHORD_DONE";

export const readChord = createAction(READ_CHORD, (chord) => chord);

function* readChordSaga(action) {
  const chord = yield call(api.getChord, action.payload);
  console.log(chord);
  yield put({
    type: READ_CHORD_DONE,
    payload: chord.data.result,
  });
}

export function* chordSaga() {
  yield takeLatest(READ_CHORD, readChordSaga);
}

const initialState = {
  name: "",
  strings: [],
  tags: [],
};

const chord = handleActions(
  {
    [READ_CHORD_DONE]: (state, { payload: chord }) => ({
      ...state,
      chord,
    }),
  },
  initialState
);

export default chord;
