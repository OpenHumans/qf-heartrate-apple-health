import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, DatePickerIOS} from 'react-native';
import {connect} from 'react-redux';
import {
  InitHealthKit,
  GetHeartRateInfo,
} from '../redux/actions/HealthKitActions';
import {uploadData} from '../services/OpenHumansService';
const RNFS = require('react-native-fs');

const HealthKitComponent = ({
  initialized,
  uploaded,
  acces_token,
  InitHealthKit,
  GetHeartRateInfo,
  access_token,
}) => {
  useEffect(() => {
    if (!initialized) {
      InitHealthKit();
    }
  }, [initialized]);

  return (
    <>
      {uploaded && (
        <Text style={{color: '#FFF', fontSize: 48, textAlign: 'center'}}>
          DATA UPLOAD SUCCESS
        </Text>
      )}
      {initialized && !uploaded && (
        <TouchableOpacity
          onPress={() => {
            GetHeartRateInfo(access_token);
          }}
          style={{
            height: 296,
            width: 296,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 148,
            backgroundColor: '#212D58',
          }}>
          <Text style={{color: '#FFF', fontSize: 48, textAlign: 'center'}}>
            UPLOAD DATA
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const {initialized, heartRateSamples, uploaded} = state.HealthKitReducer;
  const {access_token} = state.AuthenticationReducer;
  return {initialized, heartRateSamples, access_token, uploaded};
};

export default connect(
  mapStateToProps,
  {InitHealthKit, GetHeartRateInfo},
)(HealthKitComponent);
