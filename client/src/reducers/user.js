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
        profile: action.profile,
      };
    case actionTypes.REGISTER_USER.ERROR:
      return {
        inProgress: false,
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
        returnHome: true,
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
      return {
        ...state,
        profile: {
          ...state.profile,
          credits: action.credits,
          postsAvailable: action.postsAvailable,
        },
        returnHome: true,
      };
    case actionTypes.POST_JOB.SUCCESS:
      return {
        ...state,
        returnHome: true,
      };
    case actionTypes.LIKE_SEEKER.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          credits: action.credits,
          callsAvailable: action.callsAvailable,
        },
      };
    case actionTypes.LIKE_JOB.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          credits: action.credits,
          appsAvailable: action.appsAvailable,
        },
      };
    case actionTypes.RETURNED_HOME:
      return { ...state, returnHome: false };
    case actionTypes.CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};
