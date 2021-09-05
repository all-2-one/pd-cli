import { delay, put, takeEvery } from '@redux-saga/core/effects';
import ActionTypes from '../action-types';
import actionMap from './createAction';

function* handleAsyncToggle() {
  yield delay(1000);
  yield put(actionMap.toggle());
}

export default function* globalSaga() {
  yield takeEvery(ActionTypes.asyncToggle, handleAsyncToggle);
}
