import {
  handleOAuthRedirector,
  refreshToken,
} from '../../services/AuthenticationService';
import {LOADER_STOP, LOGIN_SUCCESS} from './actionTypes';

const retrieveOAuthToken = code => {
  return dispatch => {
    handleOAuthRedirector(code).then(({data}) => {
      const {access_token, refresh_token, expires_in} = data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {access_token, refresh_token, expires_in},
      });
      dispatch({
        type: LOADER_STOP,
      });
    });
  };
};

const refreshTokenAction = refreshTokenValue => {
  return dispatch => {
    refreshToken(refreshTokenValue).then(({data}) => {
      const {access_token, refresh_token, expires_in} = data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {access_token, refresh_token, expires_in},
      });
    });
  };
};

export {retrieveOAuthToken, refreshTokenAction};
