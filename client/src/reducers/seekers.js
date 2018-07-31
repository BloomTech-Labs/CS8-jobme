import actionTypes from '../actions/actionTypes';

const defaultState = {
  jobsWithSeekers: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEEKERS.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.GET_SEEKERS.SUCCESS:
      return { ...state, jobsWithSeekers: action.jobsWithSeekers };
    case actionTypes.GET_SEEKERS.ERROR:
      return {
        ...state,
        inProgress: false,
      };
    case actionTypes.LIKE_SEEKER.SUCCESS:
      return {
        ...state,
        // structure is array of jobs with array of seekers per job
        // need to remove first seeker on first job
        jobsWithSeekers: state.jobsWithSeekers,
        inProgress: false,
      };
    case actionTypes.CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};
