import { all } from 'redux-saga/effects';

import auth from './auth';
import users from './users';
// import hours from './hours';

export default function* rootSaga() {
  yield all([
    auth(),
    users(),
    // hours(),
  ]);
}
