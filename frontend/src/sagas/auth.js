/* eslint-disable */
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { find } from 'lodash';
import { browserHistory } from 'react-router';

import * as cx from '../actions/constants';
import { apiClient, async } from '../helpers';

const doLogin = async.apiCall({
  type: cx.DO_LOGIN,
  method: apiClient.post,
  path: '/api/auth/sign_in',
  onSuccess: (res) => {
    localStorage.setItem('auth_data', JSON.stringify({
        headers: res.headers,
        data: res.data.data,
    }));
    browserHistory.push('/');
  }
});

const doLogout = async.apiCall({
  type: cx.DO_LOGOUT,
  method: apiClient.delete,
  path: 'api/auth/sign_out/',
  onSuccess: () => {
    localStorage.removeItem('auth_data');
    browserHistory.push('/login');
  },
  onFailure: () => {
    localStorage.removeItem('auth_data');
    browserHistory.push('/login');
  },
});

const doSignup = async.apiCallPromise({
  type: cx.DO_SIGNUP,
  method: apiClient.post,
  path: 'api/auth/',
  onSuccess: () => {
    browserHistory.push('/');
  }
});

const doUpdatePassword = async.apiCallPromise({
  type: cx.DO_UPDATE_PASSWORD,
  method: apiClient.put,
  path: 'api/auth/password',
});

export default function* rootSaga() {
  yield takeLatest(cx.DO_LOGIN, doLogin);
  yield takeLatest(cx.DO_LOGOUT, doLogout);
  yield takeLatest(cx.DO_SIGNUP, doSignup);
  yield takeLatest(cx.DO_UPDATE_PASSWORD, doUpdatePassword);
}
