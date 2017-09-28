
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import async from './async';
import users from './users';
import hours from './hours';

const rootReducer = combineReducers({
  auth,
  async,
  users,
  hours,
  form: formReducer,
  routing,
});

export default rootReducer;
