import * as cx from '../actions/constants';
import { success } from '../helpers/async';

const initialState = {
  users: [],
  paginate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(cx.GET_USERS):
      return Object.assign({}, state, {
        users: action.payload.data,
        paginate: action.payload.paginate,
      });
    case success(cx.GET_USER): {
      return Object.assign({}, state, {
        users: [action.payload.user],
        paginate: null,
      });
    }
    default:
      return state;
  }
};
