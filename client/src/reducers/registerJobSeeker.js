import actionTypes from '../actions/actionTypes';

const defaultState = false;

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SEEKER.SUCCESS:
      return true;
    default:
      return state;
  }
};
