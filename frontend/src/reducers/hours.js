import { findIndex } from 'lodash';
import * as cx from '../actions/constants';
import { success } from '../helpers/async';

const initialState = {
  hours: [],
  paginate: null,
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case success(cx.GET_HOURS):
      return Object.assign({}, state, {
        hours: action.payload.data,
        paginate: action.payload.paginate,
      });
    case success(cx.GET_HOUR): {
      const hours = state.hours.slice();
      const idx = findIndex(hours, { id: action.payload.hour.id });

      if (idx > -1) {
        hours[idx] = action.payload.hour;
      } else {
        hours.push(action.payload.hour);
      }

      return Object.assign({}, state, { hours });
    }
    case success(cx.CREATE_HOUR):
      newState = state.hours.slice();
      newState.push(action.payload.hour);
      return Object.assign({}, state, {
        hours: newState,
      });
    case success(cx.UPDATE_HOUR):
      newState = state.hours.slice().map(user =>
        (user.id === action.payload.data.id
          ? action.payload.data
          : user),
      );
      return Object.assign({}, state, {
        hours: newState,
      });
    case success(cx.DELETE_HOUR):
      newState = state.hours.filter(user =>
        (user.id !== action.payload.id),
      );
      return Object.assign({}, state, {
        hours: newState,
      });
    default:
      return state;
  }
};
