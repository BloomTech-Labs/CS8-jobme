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
      dispatch({
        type: actionTypes.GET_USER_PROFILE.ERROR,
        errorMessage: err.response.data.message,
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
      dispatch({
        type: actionTypes.LOGIN_USER.ERROR,
        errorMessage: err.response.data.message,
      });
    });
};

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
      dispatch({
        type: actionTypes.REGISTER_USER.ERROR,
        errorMessage: err.response.data.message,
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
      dispatch({ type: actionTypes.UPDATE_USER_PROFILE.SUCCESS, changes: updatedInfo });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.UPDATE_USER_PROFILE.ERROR,
        errorMessage: err.response.data.message,
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
    .put(`/${user.type}s/password`, updatedInfo, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.UPDATE_USER_PROFILE.SUCCESS, profile: response.data });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.UPDATE_USER_PROFILE.ERROR,
        errorMessage: err.response.data.message,
      });
    });
};

export const updateUserPic = file => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_PHOTO.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  let preset = null;
  if (user.type === 'jobseeker') {
    preset = process.env.REACT_APP_CLOUDINARY_PRESET_SEEKER;
  } else if (user.type === 'employer') {
    preset = process.env.REACT_APP_CLOUDINARY_PRESET_EMPLOYER;
  } else {
    dispatch({ type: actionTypes.UPDATE_USER_PHOTO.ERROR, message: 'Please log in before uploading a profile image.' });
    return;
  }
  console.log('HERE: ', user.type);
  const key = process.env.REACT_APP_CLOUDINARY_KEY;
  // build the form to send file to cloudinary api
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tags', user.type);
  formData.append('upload_preset', preset);
  formData.append('api_key', key);
  formData.append('timestamp', (Date.now() / 1000) | 0);
  axios.post('https://api.cloudinary.com/v1_1/jobme/image/upload', formData, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  }).then((response) => {
    const imgUrl = response.data.secure_url;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .put(`/${user.type}s/profile`, { imgUrl }, requestOptions)
      .then(() => {
        dispatch({ type: actionTypes.UPDATE_USER_PHOTO.SUCCESS, imgUrl });
        window.location.reload();
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.UPDATE_USER_PHOTO.ERROR,
          errorMessage: err.response.data.message,
        });
      });
  }).catch((err) => {
    dispatch({
      type: actionTypes.UPDATE_USER_PHOTO.ERROR,
      errorMessage: err.response.data.message,
    });
  });
};

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: actionTypes.LOGOUT_USER });
};

export const returnedHome = () => (dispatch) => {
  dispatch({ type: actionTypes.RETURNED_HOME });
};

export const clearState = () => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_STATE });
};

export const closeModal = () => (dispatch) => {
  dispatch({ type: actionTypes.CLOSE_MODAL });
};
