import { all } from 'redux-saga/effects';
import { getSaga } from '../core/Model';
import globalSaga from './global/saga';
import userModel from './user';

export default function* rootSaga() {
  yield all([
    globalSaga(),
    getSaga(userModel)(),
  ]);
}
