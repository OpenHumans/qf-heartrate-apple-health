import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, Linking} from 'react-native';

const AuthenticationComponent = () => {
  const _handleOpenURL = event => {
    console.log(event.url);
    handleOAuthRedirector(
      event.url.split('code=')[1].replace('&origin=external', ''),
    );
  };

  const triggerOAuthFlow = () => {
    Linking.openURL(
      'https://www.openhumans.org/direct-sharing/projects/oauth2/authorize/?client_id=m09t9CpUv9johGtIykRS1olElHG77Aa0t6L4iNpr&response_type=code',
    ).catch(err => console.error('An error occurred', err));
  };

  const handleOAuthRedirector = async redirectorCode => {
    // TODO: clientSecret and clientId should NOT be checked into the code, this should ideally be proxied through a server.
    const clientId = 'm09t9CpUv9johGtIykRS1olElHG77Aa0t6L4iNpr';
    const clientSecret =
      '096chMk1Derwd1ylHdMcA1VOevqGWUkPwH7LigyPFSlanzwUptBiQH32nb7ihmTtRLWy0TGyujTJtxvoaDPKb4lhherUsWQIkAAEw2aENY5xbqX4FQ1uDB19oIicf6h3';

    try {
      const fd = new FormData();
      fd.append('grant_type', 'authorization_code');
      fd.append('code', redirectorCode);
      fd.append('redirect_uri', 'https://baldy.pl/authenticate');

      const transformRequest = (jsonData = {}) =>
        Object.entries(jsonData)
          .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
          .join('&');

      const tokenResponse = await axios.post(
        'https://www.openhumans.org/oauth2/token/',
        {
          grant_type: 'authorization_code',
          code: redirectorCode,
          // TODO: THIS REDIRECT URL SHOULD BE a) EXTERNALIZED b) CHANGED
          redirect_uri: 'https://baldy.pl/authenticate',
        },
        {
          transformRequest: jsonData => transformRequest(jsonData),
          auth: {
            username: clientId,
            password: clientSecret,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      console.log('tokenResponse', tokenResponse);
      const {
        data: {access_token},
      } = tokenResponse;
      console.log('accessToken', access_token);
    } catch (error) {
      console.log(error);
    }
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
      <TouchableOpacity
        onPress={triggerOAuthFlow}
        style={{
          height: 50,
          flex: 0.7,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          backgroundColor: '#798ced',
        }}>
        <Text style={{color: '#FFF'}}>Authenticate</Text>
      </TouchableOpacity>
    </>
  );
};

export default AuthenticationComponent;
