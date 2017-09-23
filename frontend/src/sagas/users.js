
import * as cx from '~/actions/constants';
import { apiClient, async } from '~/helpers';
import { takeLatest, takeEvery } from 'redux-saga/effects';

const getUsers = async.apiCall({
  type: cx.GET_USERS,
  method: apiClient.get,
  path: () => '/user/employees/',
  success: res => ({ users: res.data })
});

const createUser = async.apiCall({
  type: cx.CREATE_EMPLOYEE,
  method: apiClient.post,
  path: ({ payload }) => {
    return `/venue/${payload.data.venue_id}/employees/`;
  },
  success: res => ({ employee: res.data })
});

const updateUser = async.apiCall({
  type: cx.UPDATE_EMPLOYEE,
  method: apiClient.patch,
  path: ({ payload }) =>
    `/venue/${payload.data.venue_id}/employees/${payload.data.id}/`,
  success: res => ({ employee: res.data })
});

const deleteUser = async.apiCall({
  type: cx.DELETE_EMPLOYEE,
  method: apiClient.delete,
  path: ({ payload }) =>
    `/venue/${payload.venue_id}/employees/${payload.employee_id}/`,
  success: (res, { payload }) => ({
    id: payload.employee_id
  })
});

export default function* rootSaga () {
  yield takeLatest(cx.GET_USERS, getUsers);
  yield takeEvery(cx.CREATE_USER, createUser);
  yield takeEvery(cx.UPDATE_USER, updateUser);
  yield takeEvery(cx.DELETE_USER, deleteUser);
}
