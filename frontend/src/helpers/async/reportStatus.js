
import { put } from 'redux-saga/effects';
import { STATUS } from '../../actions/constants';

export default (type, status) => put({
  type: STATUS,
  payload: { type, status },
});
