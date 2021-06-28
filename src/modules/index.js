import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import auth, { authSaga } from "./auth";
import chords, { chordSaga } from "./chords";
import songs, { songSaga } from "./songs";
import providers, { providerSaga } from "./providers";

const rootReducer = combineReducers({
  auth,
  chords,
  songs,
  providers,
});

export function* rootSaga() {
  yield all([authSaga(), chordSaga(), songSaga(), providerSaga()]);
}

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 100,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
