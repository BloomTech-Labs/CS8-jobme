import actionTypes from '../actions/actionTypes';

const defualtState = {
  loggedInEmployer: {
    token: '', // use token to test if logged in, == type coercion
    username: ''
  },
}

export default (state = defualtState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_EMPLOYER.SUCESS:
      const { token, username } = action;
      return { ...state, loggedInEmployer: {
        username: username, token: token
      }}
  }};