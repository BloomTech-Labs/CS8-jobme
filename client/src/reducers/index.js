import actionTypes from '../actions/actionTypes';

const defaultState = {
  loggedInEmployer: {
    token: '', // use token to test if logged in, == type coercion
    username: '',
  },
  registerEmployerSuccess: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_EMPLOYER.SUCESS:
      return {
        ...state,
        loggedInEmployer: {
          username: action.user.username,
          token: action.token,
        },
      };
    case actionTypes.REGISTER_EMPLOYER.SUCCESS:
      return {
        ...state,
        registerEmployerSuccess: true,
      };
    default:
      return state;
  }
};
