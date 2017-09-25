import * as cx from '../actions/constants';
import { success, failure } from '../helpers/async';

const initialState = {
  error: null,
  users: []
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case success(cx.GET_USERS):
      return Object.assign({}, state, {
        error: null,
        users: action.payload.users.results
      });
    case success(cx.CREATE_USER):
      newState = state.users.slice();
      newState.push(action.payload.employee);
      return Object.assign({}, state, {
        error: null,
        users: newState
      });
    case success(cx.UPDATE_USER):
      newState = state.users.slice().map(employee =>
        (employee.id === action.payload.employee.id
          ? action.payload.employee
          : employee)
      );
      return Object.assign({}, state, {
        error: null,
        users: newState
      });
    case success(cx.DELETE_USER):
      newState = state.users.slice().filter(employee =>
        (employee.id !== action.payload.id)
      );
      return Object.assign({}, state, {
        error: null,
        users: newState
      });
    case failure(cx.CREATE_USER):
    case failure(cx.UPDATE_USER):
    case failure(cx.DELETE_USER): {
      return Object.assign({}, state, {
        error: action.payload
      });
    }
    default:
      return state;
  }
};
