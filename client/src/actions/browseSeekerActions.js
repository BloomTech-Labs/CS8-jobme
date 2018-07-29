import axios from 'axios';

import actionTypes from './actionTypes';

const url =  process.env.NODE_ENV === 'production'
    ? 'https://jobitduder.herokuapp.com/api'
    : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getSeekers = token => (dispatch) => {
  dispatch({ type: actionTypes.GET_SEEKERS.IN_PROGRESS });

  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.get('/seekers', requestOptions).then((response) => {
    if (response.data.length > 0) {
      dispatch({ type: actionTypes.GET_SEEKERS.SUCCESS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.GET_SEEKERS.ERROR });
    }
  });
};

export const toggleSeekerAvailability = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_SEEKERS.ERROR });
  // delete/disable this action when Backend refactored to filter liked jobs
};
