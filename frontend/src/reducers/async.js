
import { STATUS, ERROR, RELOAD } from '../actions/constants';

const initialState = {
  errors: {},
  statuses: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STATUS: {
      const { type, status } = action.payload;
      const { statuses } = state;
      statuses[type] = status;
      return { ...state, statuses };
    }
    case ERROR: {
      const { type, error } = action.payload;
      const { errors } = state;
      errors[type] = error;
      return { ...state, errors };
    }
    case RELOAD: {
      const { key } = action.payload;
      const { errors, statuses } = state;

      delete errors[key];
      delete statuses[key];

      return { errors, statuses };
    }
    default:
      return state;
  }
};
