import axios from 'axios';

import actionTypes from './actionTypes';

const url =  process.env.NODE_ENV === 'production'
    ? 'http://jobitduder.herokuapp.com/api'
    : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getEmployerProfile = token => (dispatch) => {
  dispatch({ type: actionTypes.GET_EMPLOYER_PROFILE.IN_PROGRESS });

  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get('/employers/profile', requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.GET_EMPLOYER_PROFILE.SUCCESS, profile: response.data })
      ;
    })
    .catch((err) => {
      console.log('Error', err);
      dispatch({
        type: actionTypes.GET_EMPLOYER_PROFILE.ERROR,
      });
    });
};
