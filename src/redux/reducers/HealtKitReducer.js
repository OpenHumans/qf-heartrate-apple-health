import {
  HEALTH_KIT_ERROR,
  HEALTH_KIT_INITIALIZE_SUCCESS,
  HEART_RATE_SAMPLES_GET_SUCCESS,
  HEART_RATE_SAMPLES_RESET,
  HEART_RATE_SAMPLES_UPLOAD_SUCCESS,
} from '../actions/actionTypes';

const HealthKitReducer = (state = {}, action) => {
  switch (action.type) {
    case HEALTH_KIT_INITIALIZE_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case HEART_RATE_SAMPLES_GET_SUCCESS:
      return {
        ...state,
        heartRateSamples: action.payload,
      };
    case HEART_RATE_SAMPLES_UPLOAD_SUCCESS:
      return {
        ...state,
        uploaded: true,
      };
    case HEART_RATE_SAMPLES_RESET:
      return {
        initialized: true,
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

export default HealthKitReducer;
