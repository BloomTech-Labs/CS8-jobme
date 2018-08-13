import actionTypes from '../actions/actionTypes';

const defaultState = {
  job: '',
  availableSeekers: [],
  jobsWithSeekerMatches: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEEKERS.IN_PROGRESS:
      return {
        ...state,
        getNewSeeker: false,
        inProgress: true,
      };
    case actionTypes.GET_SEEKERS.SUCCESS:
      return {
        ...state,
        inProgress: false,
        job: action.job,
        availableSeeker: action.seeker,
      };
    case actionTypes.GET_SEEKERS.ERROR:
      return {
        ...state,
        inProgress: false,
        getSeekerFailed: true,
      };
    case actionTypes.LIKE_SEEKER.SUCCESS:
      return {
        ...state,
        inProgress: false,
        getNewSeeker: true,
      };
    case actionTypes.GET_SEEKER_MATCHES.IN_PROGRESS:
      return {
        ...state,
        getNewSeeker: false,
        inProgress: true,
      };
    case actionTypes.GET_SEEKER_MATCHES.SUCCESS:
      return {
        ...state,
        inProgress: false,
        jobsWithSeekerMatches: action.jobsWithSeekerMatches,
      };
    case actionTypes.GET_SEEKER_MATCHES.ERROR:
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
