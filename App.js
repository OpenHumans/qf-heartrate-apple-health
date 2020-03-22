/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  DatePickerIOS,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';
const moment = require('moment');
import AppleHealthKit from 'rn-apple-healthkit';

const App: () => React$Node = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [heartData, setHeartData] = useState([]);

  const _handleOpenURL = event => {
    console.log(event.url);
    handleOAuthRedirector(
      event.url.split('code=')[1].replace('&origin=external', ''),
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

  const PERMS = AppleHealthKit.Constants.Permissions;
  let options = {
    permissions: {
      read: [PERMS.HeartRate],
    },
  };
  const triggerOAuthFlow = () => {
    Linking.openURL(
      'https://www.openhumans.org/direct-sharing/projects/oauth2/authorize/?client_id=m09t9CpUv9johGtIykRS1olElHG77Aa0t6L4iNpr&response_type=code',
    ).catch(err => console.error('An error occurred', err));
  };

  const handleOAuthRedirector = async redirectorCode => {
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

  const retrieveHealthData = () => {
    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }

      let options = {
        unit: 'bpm', // optional; default 'bpm'
        startDate: chosenDate.toISOString(), // required
        endDate: new Date().toISOString(), // optional; default now
        ascending: false, // optional; default false
        limit: 10, // optional; default no limit
      };

      AppleHealthKit.getHeartRateSamples(options, (err, results) => {
        if (err) {
          return;
        }
        console.log(results);
        const hd = results.map(result => {
          const {value, startDate} = result;
          return {
            value,
            startDate,
          };
        });
        setHeartData(hd);
      });
    });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 2}}>
            <DatePickerIOS
              date={chosenDate}
              onDateChange={setChosenDate}
              style={{flex: 1, height: 50}}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={retrieveHealthData}
              style={{
                height: 50,
                flex: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                backgroundColor: '#798ced',
              }}>
              <Text style={{color: '#FFF'}}>Get heart rate samples</Text>
            </TouchableOpacity>
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
          </View>
          <View style={{flex: 4}}>
            {heartData.map(item => {
              return (
                <Text>
                  {item.value}bpm recorded @
                  {moment(item.startDate).format('DD-mm-YYYY')}
                </Text>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
