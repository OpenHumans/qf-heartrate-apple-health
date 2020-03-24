import React, {useEffect} from 'react';
import {TouchableOpacity, Text, Linking} from 'react-native';
import {OAUTH_URL} from '../common/config';
import {retrieveOAuthToken} from '../redux/actions/AuthenticationActions';
import {connect} from 'react-redux';

const AuthenticationComponent = ({retrieveOAuthTokenAction, access_token}) => {
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
            LOGIN
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const {access_token} = state.AuthenticationReducer;
  return {access_token};
};

export default connect(
  mapStateToProps,
  {retrieveOAuthTokenAction: retrieveOAuthToken},
)(AuthenticationComponent);
