import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/song";

const LIST_SONG = "song/LIST_SONG";
const LIST_SONG_DONE = "song/LIST_SONG_DONE";
const READ_SONG = "song/READ_SONG";
const READ_SONG_DONE = "song/READ_SONG_DONE";

export const listSongs = createAction(LIST_SONG, (songs) => songs);
export const readSong = createAction(READ_SONG, (song) => song);

function* listSongSaga(action) {
  const songs = yield call(api.getSongs, action.payload);
  yield put({
    type: LIST_SONG_DONE,
    payload: songs.data,
  });
}

function* readSongSaga(action) {
  const song = yield call(api.getSong, action.payload);
  yield put({
    type: READ_SONG_DONE,
    payload: song.data,
  });
}

export function* songSaga() {
  yield takeLatest(READ_SONG, readSongSaga);
  yield takeLatest(LIST_SONG, listSongSaga);
}

const initialState = [];

const songs = handleActions(
  {
    [LIST_SONG_DONE]: (state, { payload: songs }) => [...songs],
    [READ_SONG_DONE]: (state, { payload: song }) => song,
  },
  initialState
);

export default songs;
