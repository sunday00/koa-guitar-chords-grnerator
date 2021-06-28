import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/song";

const LIST_SONG = "song/LIST_SONG";
const LIST_SONG_DONE = "song/LIST_SONG_DONE";

export const listSongs = createAction(LIST_SONG, (songs) => songs);

function* listSongSaga(action) {
  const songs = yield call(api.getSongs, action.payload);
  yield put({
    type: LIST_SONG_DONE,
    payload: songs.data,
  });
}

export function* songSaga() {
  // yield takeLatest(READ_CHORD, readChordSaga);
  // yield takeLatest(READ_CHORD, readChordSaga);
  // yield takeLatest(READ_CHORD, readChordSaga);
  yield takeLatest(LIST_SONG, listSongSaga);
}

const initialState = [];

const songs = handleActions(
  {
    [LIST_SONG_DONE]: (state, { payload: songs }) => [...songs],
    // [LIST_CHORD_DONE]: (state, { payload: chords }) => [...chords],
  },
  initialState
);

export default songs;
