import React from 'react';
import { Route } from 'react-router';

import { AppContainer, LayoutContainer } from './components/containers';

import { SignIn, SignUp, Four04 } from './components/pages';

// import ownerOnly from '~/components/owner-only';
// import requireAuth from '~/components/require-auth';
// import requireNotAuth from '~/components/require-auth/not-auth';

const routes = (
  <Route path="/" component={AppContainer}>
    <Route path="login" component={SignIn} />
    <Route path="signup" component={SignUp} />
    <Route component={LayoutContainer} />
    <Route path="*" component={Four04} />
  </Route>
);

export default routes;
