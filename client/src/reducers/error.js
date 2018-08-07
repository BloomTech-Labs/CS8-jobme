import actionTypes from '../actions/actionTypes';

const defaultState = {
  message: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_MODAL:
      return defaultState;
    default:
      return {
        message: action.errorMessage,
      };
  }
};
