/* eslint-disable func-names */
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';

import { apiClient } from '../../helpers';
import * as async from '../async';

export default ({
  type,
  method,
  path,
  onSuccess,
  onFailure,
  success,
  failure,
}) => function* (action) {
  const auth = localStorage.getItem('auth_data'); // eslint-disable-line
  if (auth) {
    const headers = JSON.parse(auth).headers;
    Object.assign(apiClient.defaults, {
      headers: {
        'access-token': headers['access-token'],
        client: headers.client,
        expiry: headers.expiry,
        uid: headers.uid,
      },
    });
  }

  try {
    yield async.reportPending(type);

    const res = yield call(
      method,
      typeof path === 'function' ? path(action) : path,
      action.payload.data,
    );

    if (onSuccess) {
      onSuccess(res, action);
    }

    yield put({
      type: async.success(type),
      payload: success ? success(res, action) : res,
    });

    yield async.reportSuccess(type);
    if (action.payload) {
      yield action.payload.resolve(success ? success(res, action) : res);
    }
  } catch (err) {
    const errRes = get(err, 'response', err);
    if (onFailure) {
      onFailure(errRes);
    }

    const errPayload = failure ? failure(errRes) : errRes;

    yield put({
      type: async.failure(type),
      payload: errPayload,
    });

    yield async.reportError(type, errPayload);
    yield async.reportFailure(type);
    if (action.payload) {
      yield action.payload.reject(errPayload);
    }
  }
};
