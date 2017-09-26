import React from 'react';
import PropTypes from 'prop-types';

import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { uniqueId } from 'lodash';

export default function EnhancedSelect({
  input,
  label,
  placeholder,
  options,
  optionsWithBlank,
  meta: { touched, error },
}) {
  return (
    <FormGroup color={touched && error ? 'danger' : ''}>
      <Label>{label}</Label>
      <Input {...input} placeholder={placeholder} type="Select">
        { optionsWithBlank &&
          <option key="0" value="" />
        }
        { options.map(option => (
          <option key={uniqueId()} value={option.value}>{option.label}</option>
        ))
        }
      </Input>
      {touched && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}

EnhancedSelect.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array, // eslint-disable-line
  meta: PropTypes.object, // eslint-disable-line
  optionsWithBlank: PropTypes.bool,
};

EnhancedSelect.defaultProps = {
  options: [],
  type: '',
  optionsWithBlank: false,
};
