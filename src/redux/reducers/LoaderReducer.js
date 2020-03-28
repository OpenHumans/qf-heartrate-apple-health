import {
  HEALTH_KIT_ERROR,
  LOADER_START,
  LOADER_STOP,
} from '../actions/actionTypes';

const LoaderReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADER_START:
      return {
        ...state,
        loading: true,
      };
    case HEALTH_KIT_ERROR:
    case LOADER_STOP:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default LoaderReducer;
