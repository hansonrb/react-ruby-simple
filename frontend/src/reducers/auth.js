
import * as C from '../actions/constants';
import { success, failure } from '../helpers/async';

const initialAuthState = {
};

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case failure(C.DO_LOGIN):
      return Object.assign({}, state, { errorMessage: action.payload.error });
    case success(C.DO_LOGOUT):
      return Object.assign({}, state, initialAuthState);
    case failure(C.DO_LOGOUT):
      return Object.assign({}, state, { errorMessage: action.payload.error });
    default:
      return state;
  }
};
