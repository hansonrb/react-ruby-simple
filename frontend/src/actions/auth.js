import * as cx from './constants';

export function doLogin (payload) {
  return { type: cx.DO_LOGIN, payload };
}

export function doLogout (payload) {
  return { type: cx.DO_LOGOUT, payload };
}

export function doSignup (payload) {
  return { type: cx.DO_SIGNUP, payload };
}
