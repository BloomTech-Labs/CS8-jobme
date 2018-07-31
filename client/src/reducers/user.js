import actionTypes from '../actions/actionTypes';

const defaultState = {
  isLoggedIn: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER.IN_PROGRESS:
      return {
        ...state,
        registerInProgress: true,
      };
    case actionTypes.REGISTER_USER.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        registerSuccess: true, // in case this triggers first-time welcome action
      };
    case actionTypes.REGISTER_USER.ERROR:
      return {
        registerFailure: true,
        errorMessage: action.errorMessage,
      };
    case actionTypes.LOGIN_USER.IN_PROGRESS:
      return {
        ...state,
        loginInProgress: true,
      };
    case actionTypes.LOGIN_USER.SUCCESS:
      return {
        ...state,
        loginInProgress: false,
        isLoggedIn: true,
        profile: action.profile,
      };
    case actionTypes.LOGIN_USER.ERROR:
      return {
        ...state,
        loginInProgress: false,
        isLoggedIn: false,
        errorMessage: action.errorMessage,
      };
    case actionTypes.GET_USER_PROFILE.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        profile: action.profile,
      };
    case actionTypes.LOGOUT_USER:
      return defaultState;
    case actionTypes.GET_USER_PROFILE.ERROR:
      return defaultState;
    default:
      return state;
  }
};
