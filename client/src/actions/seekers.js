import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production'
  ? 'https://jobitduder.herokuapp.com/api'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getSeekers = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_SEEKERS.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  axios.get('/jobseekers', requestOptions).then((response) => {
    const jobsWithSeekers = response.data.jobsWithSeekers.filter(job => job.seekers.length);
    dispatch({ type: actionTypes.GET_SEEKERS.SUCCESS, jobsWithSeekers });
  }).catch((err) => {
    dispatch({
      type: actionTypes.GET_SEEKERS.ERROR,
      message: err,
    });
  });
};

export const likeSeeker = (seekerId, jobId, options) => (dispatch) => {
  dispatch({ type: actionTypes.LIKE_SEEKER.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.put(`/jobseekers/like/${seekerId}`, { jobId, ...options }, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.LIKE_SEEKER.SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.LIKE_SEEKER.ERROR, message: err });
    });
};
