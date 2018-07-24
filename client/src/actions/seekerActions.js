import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production'
  ? 'https://jobitduder.herokuapp.com/api'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getSeekerProfile = token => (dispatch) => {
  dispatch({ type: actionTypes.GET_SEEKER_PROFILE.IN_PROGRESS });

  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get('/seekers/profile', requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.GET_SEEKER_PROFILE.SUCCESS, profile: response.data });
    })
    .catch((err) => {
      console.log('Error', err);
      dispatch({
        type: actionTypes.GET_SEEKER_PROFILE.ERROR,
      });
    });
};

export const loginSeeker = credentials => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_SEEKER.IN_PROGRESS });

  axios
    .post('/seekers/login', credentials)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type: actionTypes.LOGIN_SEEKER.SUCCESS, token });
    })
    .catch((err) => {
      console.log('Error', err);
      dispatch({
        type: actionTypes.LOGIN_SEEKER.ERROR,
      });
    });
};

export const registerSeeker = user => (dispatch) => {
  dispatch({ type: actionTypes.REGISTER_SEEKER.IN_PROGRESS });

  axios
    .post('/seekers/register', user)
    .then(() => {
      dispatch({ type: actionTypes.REGISTER_SEEKER.SUCCESS });
    })
    .catch((err) => {
      const { message } = err.data;
      dispatch({
        type: actionTypes.REGISTER_SEEKER.ERROR,
        errorMessage: message,
      });
    });
};

// TODO: complete updateSeekerProfile, this is just cp from GET

export const updateSeekerProfile = (token, updatedInfo) => (dispatch) => {
  dispatch({ type: actionTypes.GET_SEEKER_PROFILE.IN_PROGRESS });

  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .put('/seekers/profile', updatedInfo, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.GET_SEEKER_PROFILE.SUCCESS, profile: response.data });
    })
    .catch((err) => {
      console.log('Error', err);
      dispatch({
        type: actionTypes.GET_SEEKER_PROFILE.ERROR,
      });
    });
};

export const updateSeekerPassword = (token, updatedInfo) => (dispatch) => {
  dispatch({ type: actionTypes.GET_SEEKER_PROFILE.IN_PROGRESS });

  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .put('/seekers/password', updatedInfo, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.GET_SEEKER_PROFILE.SUCCESS, profile: response.data });
    })
    .catch((err) => {
      console.log('Error', err);
      dispatch({
        type: actionTypes.GET_SEEKER_PROFILE.ERROR,
      });
    });
};
