import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production'
  ? 'https://jobitduder.herokuapp.com/api'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getJobs = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_JOBS.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.get('/jobs', requestOptions).then((response) => {
    if (response.data.length > 0) {
      dispatch({ type: actionTypes.GET_JOBS.SUCCESS, availableJobs: response.data });
    } else {
      dispatch({ type: actionTypes.GET_JOBS.ERROR });
    }
  });
};

export const likeJob = (jobId, likeOptions) => (dispatch) => {
  dispatch({ type: actionTypes.LIKE_JOB.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.put(`/jobs/like/${jobId}`, likeOptions, requestOptions)
    .then((response) => {
      const {
        likedJobs, matchedJobs, skippedJobs, credits,
      } = response.data;
      dispatch({
        type: actionTypes.LIKE_JOB.SUCCESS,
        likedJobs,
        matchedJobs,
        skippedJobs,
        credits,
        jobId,
      });
    }).catch((err) => {
      dispatch({ type: actionTypes.LIKE_JOB.ERROR, message: err });
    });
};

export const getJobMatches = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_JOB_MATCHES.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.get('/jobs/matches', requestOptions).then((response) => {
    dispatch({ type: actionTypes.GET_JOB_MATCHES.SUCCESS, matchedJobs: response.data });
  }).catch((err) => {
    dispatch({ type: actionTypes.GET_JOB_MATCHES.ERROR, message: err });
  });
};
