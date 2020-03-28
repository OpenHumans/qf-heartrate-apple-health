import {AUTHENTICATION_ERROR, LOGIN_SUCCESS} from '../actions/actionTypes';

const AuthenticationReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const {access_token, refresh_token, expires_in} = action.payload;
      const now = new Date();
      return {
        ...state,
        access_token,
        refresh_token,
        expires_in,
        login_date: now.getTime(),
      };
    case AUTHENTICATION_ERROR: {
      return {};
    }
    default:
      return state;
  }
};

export default AuthenticationReducer;
