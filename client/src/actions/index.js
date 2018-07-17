import axios from 'axios';

import actionTypes from './actionTypes';
const url = process.env.NODE_ENV === 'production'
  ? 'heroku'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const loginEmployer = credentials => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_EMPLOYER.IN_PROGRESS })

  axios.post('/employers/login')
    .then(response => {
      const { user, token } = response.data;
      dispatch({type: actionTypes.LOGIN_EMPLOYER.SUCESS, user: user, token: token })
    })
    .catch(err => {
      console.log('Error', err)
      dispatch({
        type: actionTypes.LOGIN_EMPLOYER.ERROR
    })
})}