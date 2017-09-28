import * as cx from '../actions/constants';
import { success } from '../helpers/async';

const initialState = {
  hours: [],
  paginate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(cx.GET_HOURS):
      return Object.assign({}, state, {
        hours: action.payload.data,
        paginate: action.payload.paginate,
      });
    case success(cx.GET_HOUR): {
      return Object.assign({}, state, {
        hours: [action.payload.hour],
        paginate: null,
      });
    }
    default:
      return state;
  }
};
