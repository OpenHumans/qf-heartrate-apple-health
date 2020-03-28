import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {I18N} from '../common/config';
import {clearErrorsAction} from '../redux/actions/ErrorActions';

const ErrorComponent = ({error, clearErrorsActionDispatcher}) => {
  useEffect(() => {
    if (error) {
      Alert.alert(I18N.ERROR_TITLE, error.detail, [
        {
          text: 'OK',
          onPress: () => {
            console.log('error clear');
            clearErrorsActionDispatcher();
          },
        },
      ]);
    }
  }, [error]);
  return <></>;
};
const mapStateToProps = state => {
  const {error} = state.ErrorReducer;
  return {error};
};

export default connect(
  mapStateToProps,
  {clearErrorsActionDispatcher: clearErrorsAction},
)(ErrorComponent);
