import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/provider";

const LIST_PROVIDER = "provider/LIST_PROVIDER";
const LIST_PROVIDER_DONE = "provider/LIST_PROVIDER_DONE";

export const listProvider = createAction(
  LIST_PROVIDER,
  (providers) => providers
);

function* listProviderSaga(action) {
  const providers = yield call(api.getProviders, action.payload);
  yield put({
    type: LIST_PROVIDER_DONE,
    payload: providers.data,
  });
}

export function* providerSaga() {
  // yield takeLatest(READ_CHORD, readChordSaga);
  // yield takeLatest(READ_CHORD, readChordSaga);
  // yield takeLatest(READ_CHORD, readChordSaga);
  yield takeLatest(LIST_PROVIDER, listProviderSaga);
}

const initialState = [];

const providers = handleActions(
  {
    [LIST_PROVIDER_DONE]: (state, { payload: providers }) => [...providers],
    // [LIST_CHORD_DONE]: (state, { payload: chords }) => [...chords],
  },
  initialState
);

export default providers;
