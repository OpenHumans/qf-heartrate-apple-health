const HealthKitReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HEALTH_KIT_INITIALIZE_SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    case 'HEART_RATE_SAMPLES_GET_SUCCESS':
      return {
        ...state,
        heartRateSamples: action.payload,
      };
    case 'HEART_RATE_SAMPLES_UPLOAD_SUCCESS':
      return {
        ...state,
        uploaded: true,
      };
    case 'HEALTH_KIT_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default HealthKitReducer;
