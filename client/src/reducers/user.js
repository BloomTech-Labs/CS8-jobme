import actionTypes from '../actions/actionTypes';

const defaultState = {
  isLoggedIn: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.REGISTER_USER.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        inProgress: false,
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
        inProgress: true,
      };
    case actionTypes.LOGIN_USER.SUCCESS:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: true,
        profile: action.profile,
      };
    case actionTypes.LOGIN_USER.ERROR:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: false,
        errorMessage: action.errorMessage,
      };
    case actionTypes.GET_USER_PROFILE.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.GET_USER_PROFILE.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        profile: action.profile,
        inProgress: false,
      };
    case actionTypes.LOGOUT_USER:
      return defaultState;
    case actionTypes.GET_USER_PROFILE.ERROR:
      return defaultState;
    default:
      return state;
  }
};
