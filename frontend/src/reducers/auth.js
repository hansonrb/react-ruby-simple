
import * as C from '../actions/constants';
import { success } from '../helpers/async';

let initialAuthState = {
  data: {},
  headers: {},
};

if (localStorage.getItem('auth_data')) { // eslint-disable-line
  initialAuthState = JSON.parse(localStorage.getItem('auth_data')); // eslint-disable-line
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case success(C.DO_SIGNUP):
    case success(C.DO_UPDATE_PASSWORD):
      localStorage.setItem('auth_data', JSON.stringify({ // eslint-disable-line
        data: action.payload.data.data,
        headers: action.payload.headers,
      }));
      return Object.assign({}, state, {
        data: action.payload.data.data,
        headers: action.payload.headers,
      });
    case success(C.DO_LOGOUT):
      return Object.assign({}, state, { data: {}, headers: {} });
    case success(C.DO_LOGIN):
      return Object.assign({}, state, {
        data: action.payload.data.data,
        headers: action.payload.headers,
      });
    case success(C.UPDATE_USER): {
      if (action.payload.data.id === state.data.id) {
        localStorage.setItem('auth_data', JSON.stringify({ // eslint-disable-line
          data: action.payload.data,
          headers: action.payload.headers,
        }));

        return Object.assign({}, state, {
          data: action.payload.data,
        });
      }
      return state;
    }
    default:
      return state;
  }
};
