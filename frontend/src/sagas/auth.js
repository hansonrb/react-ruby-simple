
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { find } from 'lodash';
import * as cx from './actions/constants';
import { apiClient, async } from '~/helpers';

const doLogin = async.apiCall({
  type: cx.DO_LOGIN,
  method: apiClient.post,
  path: () => '/auth/login/',
  onSuccess: (res, { payload: { remember_me } }) => {
    if (remember_me) {
    } else {
    }
  },
  success: () => ({}),
  failure: res => ({
    error: res.data.non_field_errors.join('. '),
    status: res.status
  })
});

const doLogout = async.apiCall({
  type: cx.DO_LOGOUT,
  method: apiClient.post,
  path: () => '/auth/logout/',
  onSuccess: () => {

  },
  success: () => ({}),
  onFailure: () => {

  },
  failure: () => ({})
});

const doSignup = async.apiCall({
  type: cx.DO_SIGNUP,
  method: apiClient.post,
  path: ({ payload }) => {

  },
  onSuccess: (res) => {
  },
  success: res => ({ auth: res.data })
});

export default function* rootSaga () {
  yield takeLatest(cx.DO_LOGIN, doLogin);
  yield takeLatest(cx.DO_LOGOUT, doLogout);
  yield takeLatest(cx.DO_SIGNUP, doSignup);
}
