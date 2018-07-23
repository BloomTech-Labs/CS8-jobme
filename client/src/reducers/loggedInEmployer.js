import actionTypes from '../actions/actionTypes';

const defaultState = {
  token: '', // use token to test if logged in, == type coercion
  profile: {
    // might wanna refactor with placeholder text
    // for new members
    // we want to add
    submittedJobs: [''],
    companyName: '',
    companyUrl: '',
    industry: '',
    email: '',
    description: '',
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_EMPLOYER.SUCCESS:
      const { token } = action;
      return { ...state, token };
    case actionTypes.GET_EMPLOYER_PROFILE.SUCCESS:
      const { profile } = action;
      return { ...state, profile };
    default:
      return state;
  }
};
