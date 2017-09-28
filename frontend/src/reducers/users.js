import * as cx from '../actions/constants';
import { success } from '../helpers/async';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case success(cx.GET_USERS):
      return Object.assign({}, state, {
        users: action.payload.users,
      });
    case success(cx.CREATE_USER):
      newState = state.users.slice();
      newState.push(action.payload.user);
      return Object.assign({}, state, {
        users: newState,
      });
    case success(cx.UPDATE_USER):
      newState = state.users.slice().map(user =>
        (user.id === action.payload.user.id
          ? action.payload.user
          : user),
      );
      return Object.assign({}, state, {
        users: newState,
      });
    case success(cx.DELETE_USER):
      newState = state.users.filter(user =>
        (user.id !== action.payload.id),
      );
      return Object.assign({}, state, {
        users: newState,
      });
    default:
      return state;
  }
};
