import {
  initHealthKit,
  getHeartRateSamples,
  getRestingHeartRate,
} from '../../services/HealthKitService';
import {uploadData} from '../../services/OpenHumansService';
import {
  AUTHENTICATION_ERROR,
  HEALTH_KIT_ERROR,
  HEALTH_KIT_INITIALIZE_SUCCESS,
  HEART_RATE_SAMPLES_GET_SUCCESS,
  HEART_RATE_SAMPLES_RESET,
  HEART_RATE_SAMPLES_UPLOAD_SUCCESS,
  LOADER_START,
  LOADER_STOP,
} from './actionTypes';
import {I18N} from '../../common/config';

const InitHealthKit = () => {
  return dispatch => {
    initHealthKit().then(() => {
      dispatch({
        type: HEALTH_KIT_INITIALIZE_SUCCESS,
      });
    });
  };
};

const resetHealthKitUploader = () => {
  return {
    type: HEART_RATE_SAMPLES_RESET,
  };
};

const GetHeartRateInfo = access_token => {
  return async dispatch => {
    dispatch({
      type: LOADER_START,
    });
    try {
      const samples = await getHeartRateSamples();
      const rest_samples = await getRestingHeartRate();
      dispatch({
        type: HEART_RATE_SAMPLES_GET_SUCCESS,
        payload: {
          'heart_rate': samples,
          'resting_heart_rate': rest_samples
        }
      });

      await uploadData(access_token,
        {
          'heart_rate': samples,
          'resting_heart_rate': rest_samples
        });

      dispatch({
        type: HEART_RATE_SAMPLES_UPLOAD_SUCCESS,
      });

      dispatch({
        type: LOADER_STOP,
      });
    } catch (data) {
      const {status} = data;
      if (status === 401) {
        dispatch({
          type: AUTHENTICATION_ERROR,
        });
      }
      let {detail} = data;
      if (!detail) {
        detail = I18N.GENERIC_ERROR;
      }
      dispatch({
        type: HEALTH_KIT_ERROR,
        payload: {status, detail},
      });
    }
  };
};
export {GetHeartRateInfo, InitHealthKit, resetHealthKitUploader};
