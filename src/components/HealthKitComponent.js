import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, DatePickerIOS} from 'react-native';
import {connect} from 'react-redux';
import {
  InitHealthKit,
  GetHeartRateInfo,
} from '../redux/actions/HealthKitActions';

const HealthKitComponent = ({
  initialized,
  heartRateSamples,
  InitHealthKit,
  GetHeartRateInfo,
}) => {
  const [chosenDate, setChosenDate] = useState(new Date());

  useEffect(() => {
    if (!initialized) {
      InitHealthKit();
    }
  }, [initialized]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2}}>
        <DatePickerIOS
          date={chosenDate}
          onDateChange={setChosenDate}
          style={{flex: 1, height: 50}}
        />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={GetHeartRateInfo}
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
        <Text>tet{JSON.stringify(heartRateSamples)}</Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {initialized, heartRateSamples} = state.HealthKitReducer;
  return {initialized, heartRateSamples};
};

export default connect(
  mapStateToProps,
  {InitHealthKit, GetHeartRateInfo},
)(HealthKitComponent);
