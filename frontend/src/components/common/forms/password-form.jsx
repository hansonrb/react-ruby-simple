
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import { Form, Button } from 'reactstrap';

import { EnhancedInput } from '../../common';
import { validators } from '../../../helpers';

const enhance = compose(
  reduxForm({
    form: 'passwordForm',
    validate(values) {
      const errors = {};

      if (values.password && values.password.length > 0 &&
        values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Please double check your password';
      }

      return errors;
    },
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
  submitting,
}) => (
  <Form
    name="password-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      name="password"
      component={EnhancedInput}
      type="password"
      placeholder="Password"
      label="Password"
      validate={[validators.required]}
    />
    <Field
      name="password_confirmation"
      component={EnhancedInput}
      type="password"
      placeholder="Confirm Password"
      label="Confirm Password"
      validate={[validators.required]}
    />
    <Button type="submit" color="primary" disabled={submitting}>Update</Button>
  </Form>
));
