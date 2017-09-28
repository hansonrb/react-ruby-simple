import * as cx from './constants';

export function getUsers(payload) {
  return { type: cx.GET_USERS, payload };
}

export function getUser(payload) {
  return { type: cx.GET_USER, payload };
}

export function createUser(payload) {
  return { type: cx.CREATE_USER, payload };
}

export function updateUser(payload) {
  return { type: cx.UPDATE_USER, payload };
}

export function deleteUser(payload) {
  return { type: cx.DELETE_USER, payload };
}
