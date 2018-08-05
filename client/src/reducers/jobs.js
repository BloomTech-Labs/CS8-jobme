import actionTypes from '../actions/actionTypes';

const defaultState = {
  availableJobs: [],
  matchedJobs: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_JOBS.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.GET_JOBS.SUCCESS:
      return {
        ...state,
        inProgress: false,
        availableJobs: action.availableJobs,
      };
    case actionTypes.GET_JOBS.ERROR:
      return {
        ...state,
        inProgress: false,
        availableJobs: [],
      };
    case actionTypes.POST_JOB.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.POST_JOB.SUCCESS:
      return {
        ...state,
        inProgress: false,
        availableJobs: action.availableJobs,
      };
    case actionTypes.POST_JOB.ERROR:
      return {
        ...state,
        inProgress: false,
        availableJobs: [],
      };
    case actionTypes.EDIT_JOB.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.EDIT_JOB.SUCCESS:
      return {
        ...state,
        inProgress: false,
      };
    case actionTypes.EDIT_JOB.ERROR:
      return {
        ...state,
        inProgress: false,
      };
    case actionTypes.DELETE_JOB.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.DELETE_JOB.SUCCESS: {
      const jobs = state.availableJobs.filter(job => job._id !== action.id);
      return {
        ...state,
        inProgress: false,
        availableJobs: jobs,
      };
    }
    case actionTypes.DELETE_JOB.ERROR:
      return {
        ...state,
        inProgress: false,

      };
    case actionTypes.CLEAR_STATE:
      return defaultState;
    case actionTypes.LIKE_JOB.SUCCESS:
      return {
        ...state,
        availableJobs: state.availableJobs.slice(1),
      };
    case actionTypes.GET_JOB_MATCHES.SUCCESS:
      return {
        ...state,
        matchedJobs: action.matchedJobs,
      };
    default:
      return state;
  }
};
