import actionTypes from '../actions/actionTypes';

const defaultState = {
  availableJobs: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_JOBS.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.GET_JOBS.SUCCESS:
      return { ...state, inProgress: false, availableJobs: action.availableJobs };
    case actionTypes.GET_JOBS.ERROR:
      return { ...state, inProgress: false, availableJobs: [] };
    case actionTypes.CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};