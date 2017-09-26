
import React from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
// import { map, uniqueId } from 'lodash';
import { Form, Button } from 'reactstrap';

import { EnhancedInput } from '../../common';

const enhance = compose(
  reduxForm({
    form: 'loginForm',
    validate(values) {
      const errors = {};

      if (!values.email || values.email.length === 0) {
        errors.email = 'Please input email address';
      }
      if (!values.password || values.password.length === 0) {
        errors.password = 'Please input password';
      }

      return errors;
    },
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
}) => (
  <Form
    name="login-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <h2>Please sign in</h2>

    <Field
      name="email"
      component={EnhancedInput}
      type="email"
      placeholder="Email address"
      label="Email Address"
    />
    <Field
      name="password"
      component={EnhancedInput}
      type="password"
      placeholder="Password"
      label="Password"
    />
    <Button type="submit" color="primary">Sign In</Button>
    <div>Need a new account? <Link to="/signup">Register Now</Link></div>
  </Form>
));
