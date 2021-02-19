import { takeLatest, call, put } from 'redux-saga/effects';
import global from './global';

export default function* rootSagas() {
  yield all([global()]);
}
