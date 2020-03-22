import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import AuthenticationReducer from './reducers/AuthenticationReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import HealthKitReducer from './reducers/HealtKitReducer';

const Store = createStore(
  combineReducers({AuthenticationReducer, HealthKitReducer}),
  {},
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export default Store;
