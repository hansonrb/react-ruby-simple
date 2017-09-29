
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import { Form, Button } from 'reactstrap';
import { EnhancedInput } from '../../common';

import './user-filter.css';

const enhance = compose(
  reduxForm({
    form: 'userFilterForm',
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
}) => (
  <Form
    name="user-filter-form"
    onSubmit={handleSubmit(onSubmit)}
    className="d-flex justify-content-start"
  >
    <Field
      name="name"
      component={EnhancedInput}
      type="input"
      placeholder="Name"
    />
    <Button type="submit" color="primary">Filter</Button>
  </Form>
));
