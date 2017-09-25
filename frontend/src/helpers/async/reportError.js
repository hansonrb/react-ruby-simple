
import { put } from 'redux-saga/effects';
import { ERROR } from '../../actions/constants';

export default (type, error) => put({
  type: ERROR,
  payload: { type, error },
});
