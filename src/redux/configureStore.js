import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import AuthenticationReducer from './reducers/AuthenticationReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import HealthKitReducer from './reducers/HealtKitReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Store from './store';
const persistConfig = {
  key: 'root',
  AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, {});

export default () => {
  const persistor = persistStore(Store);
  return {Store, persistor};
};
