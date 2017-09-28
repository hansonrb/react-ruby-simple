
import React from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { compose } from 'recompose';
import { Form, Button } from 'reactstrap';
import { uniqueId } from 'lodash';

import { EnhancedInput, EnhancedDatePicker } from '../../common';
import { validators } from '../../../helpers';

import './hour-form.css';

const enhance = compose(
  reduxForm({
    form: 'hourForm',
    validate(values) {
      const errors = {};

      if (!values.hours_worked || values.hours_worked.length === 0) {
        errors.hours_worked = 'Required';
      }
      if (isNaN(values.hours_worked)) {
        errors.hours_worked = 'Should be a Number';
      }
      if (values.hours_worked > 24) {
        errors.hours_worked = 'Should be less than 24';
      }
      if (values.hours_worked < 0) {
        errors.hours_worked = 'Should be at least 0';
      }

      return errors;
    },
  }),
);

const renderNotes = ({ fields }) => ( // eslint-disable-line
  <div className="notes-wrapper mb-3" id="notes-wrapper">
    { fields.map((note, idx) => (
      <div className="note-wrapper" key={uniqueId()}>
        <Field
          name={`${note}`}
          component={EnhancedInput}
          validate={[validators.required]}
        />
        <Link
          className="delete-note"
          onClick={() => fields.remove(idx)}
        >&times;</Link>
      </div>
    )) }
    <div>
      <Button
        type="button"
        color="info"
        onClick={() => fields.push('')}
      >Add Note</Button>
    </div>
  </div>
);

export default enhance(({
  handleSubmit,
  onSubmit,
}) => (
  <Form
    name="hour-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      name="record_date"
      component={EnhancedDatePicker}
      type="input"
      label="Record Date"
      validate={[validators.required]}
    />
    <Field
      name="hours_worked"
      component={EnhancedInput}
      type="number"
      label="Hours Worked"
    />

    <label htmlFor="notes-wrapper">Notes</label>
    <FieldArray name="notes" component={renderNotes} />

    <Button type="submit" color="primary">Save</Button>
  </Form>
));
