import * as cx from './constants';

export function getHours(payload) {
  return { type: cx.GET_HOURS, payload };
}

export function createHour(payload) {
  return { type: cx.CREATE_HOUR, payload };
}

export function updateHour(payload) {
  return { type: cx.UPDATE_HOUR, payload };
}

export function deleteHour(payload) {
  return { type: cx.DELETE_HOUR, payload };
}
