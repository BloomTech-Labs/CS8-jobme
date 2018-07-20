import actionTypes from '../actions/actionTypes';

const defaultState = {
  loggedInEmployer: {
    token: '', // use token to test if logged in, == type coercion
    username: '',

    profile: { // might wanna refactor with placeholder text
      // for new memebrs
      submittedJobs: [''],
      companyName: '',
      companyUrl: '',
      industry: '',
      email: '',
      description: '',
      username: '',
    },
    registerEmployerSuccess: false,
  },

};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_EMPLOYER.SUCCESS:
      const { username, token } = action;
      return { ...state, loggedInEmployer: { username, token } };
    case actionTypes.GET_EMPLOYER_PROFILE.SUCCESS:
      const { profile } = action;
      return { ...state, loggedInEmployer: { profile } };

    case actionTypes.REGISTER_EMPLOYER.SUCCESS:
      return {
        ...state,
        registerEmployerSuccess: true,
      };

    default:
      return state;
  }
};
