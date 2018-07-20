import actionTypes from '../actions/actionTypes';

const defaultState = {
  token: '', // use token to test if logged in, == type coercion
  username: '',
  profile: {
    // might wanna refactor with placeholder text
    // for new members
    submittedJobs: [''],
    companyName: '',
    companyUrl: '',
    industry: '',
    email: '',
    description: '',
    username: '',
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_EMPLOYER.SUCCESS:
      const { username, token } = action;
      return { ...state, username, token };
    case actionTypes.GET_EMPLOYER_PROFILE.SUCCESS:
      const { profile } = action;
      return { ...state, profile };
    default:
      return state;
  }
};
