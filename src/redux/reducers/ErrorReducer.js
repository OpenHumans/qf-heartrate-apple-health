import {CLEAR_ERRORS, HEALTH_KIT_ERROR} from '../actions/actionTypes';

const ErrorReducer = (state = {}, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case HEALTH_KIT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ErrorReducer;
