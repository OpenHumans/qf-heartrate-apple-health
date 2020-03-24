import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import AuthenticationComponent from './AuthenticationComponent';
import {connect} from 'react-redux';
import HealthKitComponent from './HealthKitComponent';

const HomeScreen = ({access_token}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#5D71BA'}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
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
