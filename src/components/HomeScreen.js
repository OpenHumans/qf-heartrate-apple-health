import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import AuthenticationComponent from './AuthenticationComponent';
import {connect} from 'react-redux';
import HealthKitComponent from './HealthKitComponent';
import {uploadData} from '../services/OpenHumansService';

const RNFS = require('react-native-fs');

const HomeScreen = ({access_token}) => {
  const readFile = () => {
    var path = RNFS.DocumentDirectoryPath + '/heartrate_samples.txt';
    RNFS.readFile(path, 'utf8').then(data => {
      console.log('data', data);
      uploadData(access_token);
    });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={readFile}>
              <Text>Read</Text>
            </TouchableOpacity>
            {access_token && <HealthKitComponent />}

            {!access_token && <AuthenticationComponent />}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => {
  const {access_token} = state.AuthenticationReducer;
  return {access_token};
};

export default connect(
  mapStateToProps,
  null,
)(HomeScreen);
