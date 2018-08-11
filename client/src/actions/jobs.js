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
    dispatch({ type: actionTypes.GET_JOBS.SUCCESS, availableJobs: response.data });
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
        appsAvailable, credits, match, employerId,
      } = response.data;
      const modalMessage = match ? 'You have a new match! Go to matches to send them a message!' : '';
      dispatch({
        type: actionTypes.LIKE_JOB.SUCCESS,
        appsAvailable,
        credits,
        match,
        modalMessage,
        jobId,
        employerId,
      });
    }).catch((err) => {
      dispatch({ type: actionTypes.LIKE_JOB.ERROR, modalMessage: err.response.data.message });
    });
};

export const archiveJob = (jobId, reverse) => (dispatch) => {
  dispatch({ type: actionTypes.ARCHIVE_JOB.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.put(`/jobs/archive/${jobId}`, { reverse }, requestOptions)
    .then(() => {
      dispatch({
        type: actionTypes.ARCHIVE_JOB.SUCCESS,
        jobId,
      });
    }).catch((err) => {
      dispatch({ type: actionTypes.ARCHIVE_JOB.ERROR, modalMessage: err.response.data.message });
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
    dispatch({ type: actionTypes.GET_JOB_MATCHES.ERROR, modalMessage: err.response.data.message });
  });
};

export const uploadJob = job => (dispatch) => {
  dispatch({ type: actionTypes.POST_JOB.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { headers: { Authorization: `Bearer ${user.token}` } };

  axios.post('/jobs', job, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.POST_JOB.SUCCESS });
    }).catch((err) => {
      dispatch({ type: actionTypes.POST_JOB.ERROR, modalMessage: err.response.data.message });
    });
};
export const editJob = (id, update) => (dispatch) => {
  dispatch({ type: actionTypes.EDIT_JOB.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { headers: { Authorization: `Bearer ${user.token}` } };

  axios.put(`/jobs/${id}`, update, requestOptions)
    .then(() => {
      dispatch({ type: actionTypes.EDIT_JOB.SUCCESS });
    }).catch((err) => {
      dispatch({ type: actionTypes.EDIT_JOB.ERROR, modalMessage: err.response.data.message });
    });
};
export const deleteJob = id => (dispatch) => {
  dispatch({ type: actionTypes.DELETE_JOB.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { headers: { Authorization: `Bearer ${user.token}` } };

  axios.delete(`/jobs/${id}`, requestOptions)
    .then(() => {
      dispatch({ type: actionTypes.DELETE_JOB.SUCCESS, id });
    }).catch((err) => {
      dispatch({ type: actionTypes.DELETE_JOB.ERROR, modalMessage: err.response.data.message });
    });
};
