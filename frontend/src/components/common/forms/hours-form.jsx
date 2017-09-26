
import React from 'react';
// import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
// import { map, uniqueId } from 'lodash';
import { Form, Button } from 'reactstrap';

import { EnhancedInput } from '../../common';

const enhance = compose(
  reduxForm({
    form: 'hoursForm',
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
    name="hours-form"
    onSubmit={handleSubmit(onSubmit)}
  >
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
      label="Password"
    />
    <Field
      name="password1"
      component={EnhancedInput}
      type="password"
      label="Confirm Password"
    />
    <Button type="submit" color="primary">Create</Button>
  </Form>
));
