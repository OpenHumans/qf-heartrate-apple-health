import {
  initHealthKit,
  getHeartRateSamples,
} from '../../services/HealthKitService';

const InitHealthKit = () => {
  return dispatch => {
    initHealthKit().then(() => {
      dispatch({
        type: 'HEALTH_KIT_INITIALIZE_SUCCESS',
      });
    });
  };
};

const GetHeartRateInfo = () => {
  return dispatch => {
    getHeartRateSamples().then(samples => {
      dispatch({
        type: 'HEART_RATE_SAMPLES_GET_SUCCESS',
        payload: samples,
      });
    });
  };
};
export {GetHeartRateInfo, InitHealthKit};
