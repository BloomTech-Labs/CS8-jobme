import actionTypes from '../actions/actionTypes';

const defaultState = {
  outOfJobs: true,
  availableJobs: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_JOBS.SUCCESS:
      return { ...state, availableJobs: action.payload, outOfJobs: false };
    case actionTypes.GET_JOBS.ERROR:
      return { ...state, availableJobs: [], outOfJobs: true };
    default:
      return state;
  }
};
