import React, {useEffect} from 'react';
import {TouchableOpacity, Text, Linking} from 'react-native';
import {I18N, OAUTH_URL} from '../common/config';
import {
  refreshTokenAction,
  retrieveOAuthToken,
} from '../redux/actions/AuthenticationActions';
import {connect} from 'react-redux';

const AuthenticationComponent = ({
  retrieveOAuthTokenAction,
  refreshTokenActionDispatcher,
  access_token,
  refresh_token,
  expires_in,
  login_date,
}) => {
  useEffect(() => {
    const now = new Date();
    const isValid = new Date(login_date + expires_in).getTime() > now.getTime();
    if (refresh_token && !isValid) {
      console.log('refresh');
      refreshTokenActionDispatcher(refresh_token);
    }
  }, [refresh_token]);

  const _handleOpenURL = event => {
    retrieveOAuthTokenAction(event.url);
  };

  const triggerOAuthFlow = () => {
    Linking.openURL(OAUTH_URL).catch(err =>
      console.error('An error occurred', err),
    );
  };

  useEffect(() => {
    console.log('link handleOpenUrl');
    Linking.addEventListener('url', _handleOpenURL);
    // Specify how to clean up after this effect:
    return function cleanup() {
      Linking.removeEventListener('url', _handleOpenURL);
    };
  });

  return (
    <>
      {!access_token && (
        <TouchableOpacity
          onPress={triggerOAuthFlow}
          style={{
            height: 296,
            width: 296,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 148,
            backgroundColor: '#3BB155',
          }}>
          <Text style={{color: '#FFF', fontSize: 48, textAlign: 'center'}}>
            {I18N.LOGIN}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const {
    access_token,
    refresh_token,
    expires_in,
    login_date,
  } = state.AuthenticationReducer;
  return {access_token, refresh_token, expires_in, login_date};
};

export default connect(
  mapStateToProps,
  {
    retrieveOAuthTokenAction: retrieveOAuthToken,
    refreshTokenActionDispatcher: refreshTokenAction,
  },
)(AuthenticationComponent);
