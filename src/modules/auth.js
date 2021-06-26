import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import {checkAuth as api} from "../lib/util";

const CHECK_AUTH = "auth/CHECK_AUTH";
const CHECK_AUTH_DONE = "auth/CHECK_AUTH_DONE";

export const checkAuth = createAction(
  CHECK_AUTH,
  () => auth
);

function* checkAuthSaga(action) {
  const auth = yield call(api, action.payload);
  yield put({
    type: CHECK_AUTH_DONE,
    payload: auth,
  });
}

export function* authSaga() {
  yield takeLatest(CHECK_AUTH, checkAuthSaga);
}

const initialState = false;

const auth = handleActions(
  {
    [CHECK_AUTH_DONE]: (state, { payload: auth }) => auth,
  },
  initialState
);

export default auth;
