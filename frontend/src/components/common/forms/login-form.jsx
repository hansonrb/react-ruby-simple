
import React from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import { Form, Button, Alert } from 'reactstrap';

import { EnhancedInput } from '../../common';
import { validators } from '../../../helpers';

const enhance = compose(
  reduxForm({
    form: 'loginForm',
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
  isSubmitting,
  errors,
}) => (
  <Form
    name="login-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <h2>Please sign in</h2>

    { errors.length > 0 && <Alert color="danger">{ errors }</Alert> }
    <Field
      name="email"
      component={EnhancedInput}
      type="email"
      placeholder="Email address"
      label="Email Address"
      validate={[validators.required]}
    />
    <Field
      name="password"
      component={EnhancedInput}
      type="password"
      placeholder="Password"
      label="Password"
      validate={[validators.required]}
    />
    <Button type="submit" color="primary" disabled={isSubmitting}>Sign In</Button>
    <div>Need a new account? <Link to="/signup">Register Now</Link></div>
  </Form>
));
