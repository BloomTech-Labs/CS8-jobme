import actionTypes from '../actions/actionTypes';

const defaultState = {
  isLoggedIn: false,
  inProgress: false,
  profile: {},
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
        registerSuccess: true,
        profile: action.profile, // in case this triggers first-time welcome action
      };
    case actionTypes.REGISTER_USER.ERROR:
      return {
        registerFailure: true,
        inProgress: false,
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
      return {
        ...state,
        isLoggedIn: false,
        loggedOut: true,
      };
    case actionTypes.GET_USER_PROFILE.ERROR:
      return {
        ...state,
        isLoggedIn: false,
        loggedOut: true,
        inProgress: false,
      };
    case actionTypes.UPDATE_USER_PROFILE.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.changes,
        },
      };
    case actionTypes.UPDATE_USER_PHOTO.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          imgUrl: action.imgUrl,
        },
      };
    case actionTypes.CHECKOUT.SUCCESS:
      return { ...state, profile: { ...state.profile, credits: action.credits, postsAvailable: action.postsAvailable }, returnHome: true };
    case actionTypes.RETURNED_HOME:
      return { ...state, returnHome: false };
    case actionTypes.CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};
