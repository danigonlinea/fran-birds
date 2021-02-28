import { takeLatest } from 'redux-saga/effects';
import { INIT } from '../actions/types';

function* initial() {
  console.log('Init saga!');
}

export default function* global() {
  yield takeLatest(INIT, initial);
}
