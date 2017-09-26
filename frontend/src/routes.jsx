import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { AppContainer, LayoutContainer } from './components/containers';
import {
  SignIn, SignUp,
  Dashboard, Preference, Four04,
  Hours, NewHour, EditHour,
  Users, NewUser, EditUser,
} from './components/pages';

// import ownerOnly from '~/components/owner-only';
// import requireAuth from '~/components/require-auth';
// import requireNotAuth from '~/components/require-auth/not-auth';

const routes = (
  <Route path="/" component={AppContainer}>
    <Route component={LayoutContainer}>
      <IndexRoute component={Dashboard} />
      <Route path="hours">
        <IndexRoute component={Hours} />
        <Route path="edit/:id" component={EditHour} />
        <Route path="new" component={NewHour} />
      </Route>
      <Route path="users">
        <IndexRoute component={Users} />
        <Route path="edit/:id" component={EditUser} />
        <Route path="new" component={NewUser} />
      </Route>

      <Route path="preference" component={Preference} />
    </Route>

    <Route path="login" component={SignIn} />
    <Route path="signup" component={SignUp} />

    <Route path="*" component={Four04} />
  </Route>
);

export default routes;
