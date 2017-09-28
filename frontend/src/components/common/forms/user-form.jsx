
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import { Form, Button } from 'reactstrap';

import { EnhancedInput, EnhancedSelect } from '../../common';
import { validators, Only } from '../../../helpers';

const enhance = compose(
  reduxForm({
    form: 'userForm',
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
  submitting,
}) => (
  <Form
    name="user-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      name="name"
      component={EnhancedInput}
      type="text"
      placeholder="Your Name"
      label="Name"
      validate={[validators.required]}
    />
    <Field
      name="email"
      component={EnhancedInput}
      type="email"
      placeholder="Your Email address"
      label="Email Address"
      validate={[validators.required, validators.email]}
    />
    <Field
      name="prefered_working_hours"
      component={EnhancedInput}
      type="number"
      placeholder="Preferred Working Hours"
      label="Preferred Working Hours"
      validate={[validators.number]}
    />
    <Only roles={['admin']}>
      <Field
        name="role"
        component={EnhancedSelect}
        placeholder="Roles"
        label="Role"
        validate={[validators.required]}
        options={[{
          label: 'Regular', value: 'regular',
        }, {
          label: 'Manager', value: 'manager',
        }, {
          label: 'Admin', value: 'admin',
        }]}
      />
    </Only>
    <Button type="submit" color="primary" disabled={submitting}>Save</Button>
  </Form>
));
