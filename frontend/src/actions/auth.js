import * as cx from './constants';

export function doLogin(payload) {
  return { type: cx.DO_LOGIN, payload };
}

export function doLogout(payload) {
  return { type: cx.DO_LOGOUT, payload };
}

export function doSignup(payload) {
  return { type: cx.DO_SIGNUP, payload };
}

export function doUpdatePassword(payload) {
  return { type: cx.DO_UPDATE_PASSWORD, payload };
}

export function doUpdateInfo(payload) {
  return { type: cx.DO_UPDATE_INFO, payload };
}
