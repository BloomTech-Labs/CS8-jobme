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
    const { job, seekers } = response.data;
    dispatch({ type: actionTypes.GET_SEEKERS.SUCCESS, job, seekers });
  }).catch((err) => {
    dispatch({
      type: actionTypes.GET_SEEKERS.ERROR,
      errorMessage: err.response.data.message,
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
      const { credits, callsAvailable } = response.data;
      dispatch({
        type: actionTypes.LIKE_SEEKER.SUCCESS,
        seekerId,
        jobId,
        credits,
        callsAvailable,
      });
    }).catch((err) => {
      dispatch({ type: actionTypes.LIKE_SEEKER.ERROR, errorMessage: err.response.data.message });
    });
};

export const getSeekerMatches = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_SEEKER_MATCHES.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.get('/jobs/matches', requestOptions).then((response) => {
    const jobsWithSeekerMatches = response.data.filter(job => job.matchedSeekers.length);
    dispatch({ type: actionTypes.GET_SEEKER_MATCHES.SUCCESS, jobsWithSeekerMatches });
  }).catch((err) => {
    dispatch({ type: actionTypes.GET_SEEKER_MATCHES.ERROR, message: err });
  });
};
