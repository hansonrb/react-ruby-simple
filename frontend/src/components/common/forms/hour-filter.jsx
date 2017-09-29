
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import { Form, Button } from 'reactstrap';
import { EnhancedDatePicker } from '../../common';

import './hour-filter.css';

const enhance = compose(
  reduxForm({
    form: 'hourFilterForm',
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
}) => (
  <Form
    name="hour-filter-form"
    onSubmit={handleSubmit(onSubmit)}
    className="d-flex justify-content-start"
  >
    <Field
      name="from_date"
      component={EnhancedDatePicker}
      type="input"
      placeholder="From"
    />
    <Field
      name="to_date"
      component={EnhancedDatePicker}
      type="input"
      placeholder="To"
    />
    <Button type="submit" color="primary">Filter</Button>
  </Form>
));
