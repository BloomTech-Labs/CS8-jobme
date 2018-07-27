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
      return { ...state, token: action.token };
    case actionTypes.GET_EMPLOYER_PROFILE.SUCCESS:
      return { ...state, profile: action.profile };
    case actionTypes.UPDATE_EMPLOYER_PROFILE.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.edits,
        },
      };
    default:
      return state;
  }
};
