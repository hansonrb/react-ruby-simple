import * as cx from './constants';

export function getUsers (payload) {
  return { type: cx.GET_USERS, payload };
}

export function createUser (payload) {
  return { type: cx.CREATE_EMPLOYEE, payload };
}

export function updateUser (payload) {
  return { type: cx.UPDATE_EMPLOYEE, payload };
}

export function deleteUser (payload) {
  return { type: cx.DELETE_EMPLOYEE, payload };
}
