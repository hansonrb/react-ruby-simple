import { SubmissionError } from 'redux-form';
import { get } from 'lodash';

export default function formValidator(func, data) {
  return (new Promise((resolve, reject) => {
    func({ data, resolve, reject });
  })).catch((res) => {
    throw new SubmissionError(get(res, 'data.errors', 'Internal Server Error'));
  });
}
