import actionTypes from '../actions/actionTypes';

const defaultState = {
  modalMessage: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_MODAL:
      return defaultState;
    default:
      return {
        ...state,
        modalMessage: action.modalMessage,
      };
  }
};
