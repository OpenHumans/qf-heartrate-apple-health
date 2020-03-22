const AuthenticationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const {access_token, refresh_token} = action.payload;
      return {
        ...state,
        access_token,
        refresh_token,
      };
    default:
      return state;
  }
};

export default AuthenticationReducer;
