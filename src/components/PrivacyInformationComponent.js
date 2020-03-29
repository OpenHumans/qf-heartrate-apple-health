import React from 'react';
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  Linking,
  View,
} from 'react-native';
import {I18N, PRIVACY_POLICY_URL} from '../common/config';

const PrivacyInformationComponent = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#5D71BA'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
        }}>
        <Text style={{fontSize: 16, color: '#FFF'}}>
          {I18N.PRIVACY_POLICY_TEXT}
          <Text
            style={{
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              Linking.openURL(PRIVACY_POLICY_URL).catch(err =>
                console.error('An error occurred', err),
              );
            }}>
            here
          </Text>
            .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyInformationComponent;
