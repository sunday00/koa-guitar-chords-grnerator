import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/chord";

const READ_CHORD = "chord/READ_CHORD";
const READ_CHORD_DONE = "chord/READ_CHORD_DONE";

const LIST_CHORD = "chord/LIST_CHORD";
const LIST_CHORD_DONE = "chord/LIST_CHORD_DONE";

export const readChord = createAction(READ_CHORD, (chord) => chord);
export const listChord = createAction(LIST_CHORD, (chords) => chords);

function* readChordSaga(action) {
  const chord = yield call(api.getChord, action.payload);
  yield put({
    type: READ_CHORD_DONE,
    payload: chord.data,
  });
}

function* listChordSaga(action) {
  const chords = yield call(api.getChords, action.payload);
  yield put({
    type: LIST_CHORD_DONE,
    payload: chords.data,
  });
}

export function* chordSaga() {
  yield takeLatest(READ_CHORD, readChordSaga);
  yield takeLatest(LIST_CHORD, listChordSaga);
}

const initialState = [];

const chords = handleActions(
  {
    [READ_CHORD_DONE]: (state, { payload: chord }) => ([
      {
        name: chord.name,
        strings: chord.strings,
        tags: chord.tags,
      }
    ]),
    [LIST_CHORD_DONE]: (state, { payload: chords }) => ([
      ...chords
    ]),
  },
  initialState
);

export default chords;
