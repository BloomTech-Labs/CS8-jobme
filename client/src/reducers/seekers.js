import actionTypes from '../actions/actionTypes';

const defaultState = { jobsWithSeekers: [], jobsWithSeekerMatches: [] };

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEEKERS.IN_PROGRESS:
      return {
        ...state,
        needToGet: false,
        inProgress: true,
      };
    case actionTypes.GET_SEEKERS.SUCCESS:
      return {
        ...state,
        inProgress: false,
        jobsWithSeekers: action.jobsWithSeekers,
      };
    case actionTypes.GET_SEEKERS.ERROR:
      return {
        ...state,
        inProgress: false,
      };
    case actionTypes.LIKE_SEEKER.SUCCESS:
      return {
        ...state,
        inProgress: false,
        needToGet: true,
      };
    case actionTypes.GET_JOB_MATCHES.IN_PROGRESS:
      return {
        ...state,
        needToGet: false,
        inProgress: true,
      };
    case actionTypes.GET_JOB_MATCHES.SUCCESS:
      return {
        ...state,
        inProgress: false,
        jobsWithSeekerMatches: action.jobsWithSeekerMatches,
      };
    case actionTypes.GET_JOB_MATCHES.ERROR:
      return {
        ...state,
        inProgress: false,
      };
    case actionTypes.CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};
