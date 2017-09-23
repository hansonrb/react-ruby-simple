
import { default as auth } from './auth';
import { default as users } from './users';

export default function* rootSaga () {
  yield [
    auth(),
    users()
  ];
}
