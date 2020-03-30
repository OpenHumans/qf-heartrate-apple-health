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
        This application is designed to allow you to upload your heart rate and resting heart rate data
        from your local <Text style={{fontStyle: 'italic'}}>Apple Health</Text> store on your phone
        to the <Text style={{fontStyle: 'italic'}}>Open Humans</Text> platform.
        {"\n\n"}
        The platform is run by the 501(c)(3), non-profit <Text style={{fontStyle: 'italic'}}>Open
        Humans Foundation</Text>.
        You can read their full terms of service for <Text style={{fontStyle: 'italic'}}>Open Humans</Text>{" "}
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
            {'\n'}{'\n'}
            Learn more about the <Text style={{fontStyle: 'italic'}}>Open Humans</Text>{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  Linking.openURL('https://www.openhumans.org/data-use/').catch(err =>
                    console.error('An error occurred', err),
                  );
                }}>
                data use policy
              </Text>
                .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyInformationComponent;
