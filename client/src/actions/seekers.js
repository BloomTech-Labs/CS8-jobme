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
      modalMessage: err.response.data.message,
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
      const { credits, callsAvailable, match } = response.data;
      const modalMessage = match ? 'You have a new match! Go to matches to send them a message!' : '';
      dispatch({
        type: actionTypes.LIKE_SEEKER.SUCCESS,
        seekerId,
        jobId,
        credits,
        callsAvailable,
        match,
        modalMessage,
      });
    }).catch((err) => {
      dispatch({ type: actionTypes.LIKE_SEEKER.ERROR, modalMessage: err.response.data.message });
    });
};

export const archiveSeeker = (seekerId, jobId, reverse) => (dispatch) => {
  dispatch({ type: actionTypes.ARCHIVE_SEEKER.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.put(`/jobseekers/archive/${seekerId}`, { jobId, reverse }, requestOptions)
    .then(() => {
      dispatch({
        type: actionTypes.ARCHIVE_SEEKER.SUCCESS,
        seekerId,
        jobId,
      });
    }).catch((err) => {
      dispatch({ type: actionTypes.ARCHIVE_SEEKER.ERROR, modalMessage: err.response.data.message });
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
