import {
  AUTHENTICATION_ERROR,
  CLEAR_ERRORS,
  HEALTH_KIT_ERROR,
} from '../actions/actionTypes';
import {I18N} from '../../common/config';

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
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        error: {detail: I18N.AUTHENTICATION_ERROR},
      };
    default:
      return state;
  }
};

export default ErrorReducer;
