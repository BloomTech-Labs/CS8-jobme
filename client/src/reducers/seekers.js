import actionTypes from '../actions/actionTypes';

const defaultState = {
  outOfSeekers: true,
  availableSeekers: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEEKERS.SUCCESS:
      return { ...state, availableSeekers: action.payload, outOfSeekers: false };
    case actionTypes.GET_SEEKERS.ERROR:
      return { ...state, availableSeekers: [], outOfSeekers: true };
    case actionTypes.LIKE_SEEKER.SUCCESS:
      return {
        ...state,
        availableSeekers: state.availableSeekers.slice(1),
      };
    default:
      return state;
  }
};
