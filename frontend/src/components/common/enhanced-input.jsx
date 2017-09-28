import React from 'react';
import PropTypes from 'prop-types';

import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

export default function EnhancedInput({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error },
}) {
  return (
    <FormGroup color={touched && error ? 'danger' : ''}>
      { label && <Label>{label}</Label> }
      <Input {...input} placeholder={placeholder} type={type} />
      {touched && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}

EnhancedInput.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object, // eslint-disable-line
  type: PropTypes.string,
};

EnhancedInput.defaultProps = {
  meta: { touched: '', error: '', warning: '' },
  type: '',
  placeholder: '',
  label: null,
};
