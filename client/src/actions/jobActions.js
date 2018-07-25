import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production'
  ? 'https://jobitduder.herokuapp.com/api'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getEmployerProfile = token => (dispatch) => {
  dispatch({ type: actionTypes.GET_JOBS.IN_PROGRESS });

  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios.get('/jobs', requestOptions).then(((response) => {

  }));
};
