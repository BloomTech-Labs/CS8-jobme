import actionTypes from '../actions/actionTypes';

const defaultState = {
  token: '', // use token to test if logged in, == type coercion
  profile: {
    firstName: '',
    lastName: '',
    industry: '',
    email: '',
    summary: '',
    desiredTitle: '',
    topSkills: [''],
    additionalSkills: '',
    familiarWith: '',
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SEEKER.SUCCESS:
      const { token } = action;
      return { ...state, token };
    case actionTypes.GET_SEEKER_PROFILE.SUCCESS:
      const { profile } = action;
      return { ...state, profile };
    default:
      return state;
  }
};
