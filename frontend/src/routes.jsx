import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { AppContainer, LayoutContainer } from './components/containers';
import {
  SignIn, SignUp,
  Dashboard, Preference, Four04,
  Hours, NewHour, EditHour,
  Users, NewUser, EditUser,
} from './components/pages';
import { RequireAuth, RequireNotAuth } from './components/common';

const routes = (
  <Route path="/" component={AppContainer}>
    <Route component={LayoutContainer}>
      <IndexRoute component={RequireAuth(Dashboard)} />
      <Route path="hours">
        <IndexRoute component={RequireAuth(Hours)} />
        <Route path="edit/:id" component={RequireAuth(EditHour)} />
        <Route path="new" component={RequireAuth(NewHour)} />
      </Route>
      <Route path="users">
        <IndexRoute component={RequireAuth(Users)} />
        <Route path="edit/:id" component={RequireAuth(EditUser)} />
        <Route path="new" component={RequireAuth(NewUser)} />
      </Route>

      <Route path="preference" component={RequireAuth(Preference)} />
    </Route>

    <Route path="login" component={RequireNotAuth(SignIn)} />
    <Route path="signup" component={RequireNotAuth(SignUp)} />

    <Route path="*" component={Four04} />
  </Route>
);

export default routes;
