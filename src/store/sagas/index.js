import { takeLatest, call, put, all } from 'redux-saga/effects';
import global from './global';

export default function* rootSagas() {
  yield all([global()]);
}
