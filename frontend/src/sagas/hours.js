/* eslint-disable func-names */
import { takeLatest, takeEvery } from 'redux-saga/effects';

import * as cx from '../actions/constants';
import { apiClient, async } from '../helpers';

const getHours = async.apiCall({
  type: cx.GET_HOURS,
  method: apiClient.get,
  path: ({ payload }) =>
    `/api/hours/?page=${payload.page}&from_date=${payload.from_date || ''}&to_date=${payload.to_date || ''}`,
  success: res => res.data,
});

const getHour = async.apiCall({
  type: cx.GET_HOUR,
  method: apiClient.get,
  path: ({ payload }) => `/api/hours/${payload.id}`,
  success: res => ({ hour: res.data }),
});

const createHour = async.apiCallPromise({
  type: cx.CREATE_HOUR,
  method: apiClient.post,
  path: () => '/api/hours',
  success: res => ({ hour: res.data }),
});

const updateHour = async.apiCallPromise({
  type: cx.UPDATE_HOUR,
  method: apiClient.patch,
  path: ({ payload }) => `/api/hours/${payload.data.id}/`,
  success: res => ({ hour: res.data }),
});

const deleteHour = async.apiCall({
  type: cx.DELETE_HOUR,
  method: apiClient.delete,
  path: ({ payload }) =>
    `/api/hours/${payload.id}/`,
  success: res => ({
    id: res.data.hour_id,
  }),
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_HOURS, getHours);
  yield takeLatest(cx.GET_HOUR, getHour);
  yield takeEvery(cx.CREATE_HOUR, createHour);
  yield takeEvery(cx.UPDATE_HOUR, updateHour);
  yield takeEvery(cx.DELETE_HOUR, deleteHour);
}
