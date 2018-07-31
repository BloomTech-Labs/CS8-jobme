import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production'
  ? 'https://jobitduder.herokuapp.com/api'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getUserProfile = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_USER_PROFILE.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  axios
    .get(`/${user.type}s/profile`, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.GET_USER_PROFILE.SUCCESS, profile: response.data });
    })
    .catch((err) => {
      localStorage.clear(); // jwt is bad get rid of it
      alert('get profile failed');
      dispatch({
        type: actionTypes.GET_USER_PROFILE.ERROR,
        errorMessage: err,
      });
    });
};

export const loginUser = (credentials, type) => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_USER.IN_PROGRESS });

  axios
    .post(`/${type}s/login`, credentials)
    .then((response) => {
      const { token, profile } = response.data;
      localStorage.setItem('user', JSON.stringify({ type, token }));
      dispatch({ type: actionTypes.LOGIN_USER.SUCCESS, profile });
    })
    .catch((err) => {
      alert('login user failed: ', err);
      dispatch({
        type: actionTypes.LOGIN_USER.ERROR,
        errorMessage: err,
      });
    });
};

export const clearState = () => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_STATE });
}

export const registerUser = (user, type) => (dispatch) => {
  dispatch({ type: actionTypes.REGISTER_USER.IN_PROGRESS });

  axios
    .post(`${type}s/register`, user)
    .then((response) => {
      const { token, profile } = response.data;
      localStorage.setItem('user', JSON.stringify({ type, token }));
      dispatch({ type: actionTypes.REGISTER_USER.SUCCESS, profile });
    })
    .catch((err) => {
      alert('Failed to register: ', err);
      dispatch({
        type: actionTypes.REGISTER_USER.ERROR,
        errorMessage: err,
      });
    });
};

export const updateUserProfile = updatedInfo => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_PROFILE.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  axios
    .put(`/${user.type}s/profile`, updatedInfo, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.UPDATE_USER_PROFILE.SUCCESS, edits: response.data });
    })
    .catch((err) => {
      alert('update failed: ', err)
      dispatch({
        type: actionTypes.UPDATE_USER_PROFILE.ERROR,
        errorMessage: err,
      });
    });
};

export const updateUserPassword = updatedInfo => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_PROFILE.IN_PROGRESS });

  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  axios
    .put(`/${user.type}/password`, updatedInfo, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.UPDATE_USER_PROFILE.SUCCESS, profile: response.data });
    })
    .catch((err) => {
      alert('update failed: ', err)
      dispatch({
        type: actionTypes.UPDATE_USER_PROFILE.ERROR,
        errorMessage: err,
      });
    });
};

export const logoutUser = (dispatch) => {
  localStorage.clear();
  dispatch({ type: actionTypes.LOGOUT_USER });
};
