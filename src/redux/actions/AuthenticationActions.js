import {handleOAuthRedirector} from '../../services/AuthenticationService';

const retrieveOAuthToken = code => {
  return dispatch => {
    // dispatch({
    //   type: 'LOGIN_SUCCESS',
    //   payload: {access_token: '1w23', refresh_token: '231'},
    // });

    handleOAuthRedirector(code).then(({data}) => {
      const {access_token, refresh_token} = data;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {access_token, refresh_token},
      });
    });
  };
};

export {retrieveOAuthToken};
