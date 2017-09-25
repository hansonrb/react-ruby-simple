import { all } from 'redux-saga/effects';

import auth from './auth';
import users from './users';

export default function* rootSaga() {
  yield all([
    auth(),
    users(),
  ]);
}
