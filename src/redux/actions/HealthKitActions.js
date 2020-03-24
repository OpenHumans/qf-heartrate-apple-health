import {
  initHealthKit,
  getHeartRateSamples,
} from '../../services/HealthKitService';
import {uploadData} from '../../services/OpenHumansService';

const InitHealthKit = () => {
  return dispatch => {
    initHealthKit().then(() => {
      dispatch({
        type: 'HEALTH_KIT_INITIALIZE_SUCCESS',
      });
    });
  };
};

const GetHeartRateInfo = acces_token => {
  return dispatch => {
    getHeartRateSamples()
      .then(samples => {
        dispatch({
          type: 'HEART_RATE_SAMPLES_GET_SUCCESS',
          payload: samples,
        });
        return uploadData(acces_token, samples)
          .then(() => {
            dispatch({
              type: 'HEART_RATE_SAMPLES_UPLOAD_SUCCESS',
            });
          })
          .catch(e => {
            dispatch({
              type: 'HEALTH_KIT_ERROR',
              payload: e,
            });
          });
      })
      .catch(e => {
        dispatch({
          type: 'HEALTH_KIT_ERROR',
          payload: e,
        });
      });
  };
};
export {GetHeartRateInfo, InitHealthKit};
