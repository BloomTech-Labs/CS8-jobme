import actionTypes from '../actions/actionTypes';

const defaultState = { jobsWithSeekers: [] };

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
    case actionTypes.CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};
