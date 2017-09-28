import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

import './enhanced-datepicker.css';

export default function EnhancedInput({
  input,
  label,
  placeholder,
  meta: { touched, error },
}) {
  return (
    <FormGroup color={touched && error ? 'danger' : ''}>
      <Label>{label}</Label>
      <div className="custom-date-picker">
        <DatePicker
          {...input}
          dateFormat="YYYY-MM-DD"
          selected={input.value ? moment(input.value) : null}
          placeholderText={placeholder}
          className="form-control"
        />
        <span className="calendar-icon"><i className="fa fa-calendar" /></span>
      </div>
      {touched && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}

EnhancedInput.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object, // eslint-disable-line
};

EnhancedInput.defaultProps = {
  meta: { touched: '', error: '', warning: '' },
  placeholder: '',
};
