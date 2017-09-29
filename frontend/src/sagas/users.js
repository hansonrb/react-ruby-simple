/* eslint-disable func-names */
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { apiClient, async } from '../helpers';

import * as cx from '../actions/constants';

const getUsers = async.apiCall({
  type: cx.GET_USERS,
  method: apiClient.get,
  path: ({ payload }) => {
    if (payload.filter && payload.filter !== '') {
      return `/api/users/?page=${payload.page}&filter=${payload.filter}`;
    }
    return `/api/users/?page=${payload.page}`;
  },
  success: res => res.data,
});

const getUser = async.apiCall({
  type: cx.GET_USER,
  method: apiClient.get,
  path: ({ payload }) => `/api/users/${payload.id}/`,
  success: res => ({ user: res.data }),
});

const createUser = async.apiCallPromise({
  type: cx.CREATE_USER,
  method: apiClient.post,
  path: '/api/users/',
  success: res => ({ user: res.data }),
});

const updateUser = async.apiCallPromise({
  type: cx.UPDATE_USER,
  method: apiClient.patch,
  path: ({ payload }) =>
    `api/users/${payload.data.id}/`,
});

const deleteUser = async.apiCall({
  type: cx.DELETE_USER,
  method: apiClient.delete,
  path: ({ payload }) =>
    `api/users/${payload.id}/`,
  success: res => ({
    id: res.data.user_id,
  }),
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_USERS, getUsers);
  yield takeLatest(cx.GET_USER, getUser);
  yield takeEvery(cx.CREATE_USER, createUser);
  yield takeEvery(cx.UPDATE_USER, updateUser);
  yield takeEvery(cx.DELETE_USER, deleteUser);
}
