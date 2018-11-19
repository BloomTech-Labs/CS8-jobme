import axios from 'axios';
import jwt from 'jsonwebtoken';
import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production'
  ? 'https://jobitduder.herokuapp.com/api'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

const sign = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

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
        modalMessage: err.response.data.message,
      });
    });
};

export const loginUser = credentials => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_USER.IN_PROGRESS });
  const types = ['jobseeker', 'employer'];
  credentials = sign(credentials);
  axios
    .post(`/${types[0]}s/login`, { token: credentials })
    .then((response) => {
      const { token, profile } = response.data;
      localStorage.setItem('user', JSON.stringify({ type: types[0], token }));
      dispatch({ type: actionTypes.LOGIN_USER.SUCCESS, profile });
    })
    .catch((err) => {
      axios
        .post(`/${types[1]}s/login`, { token: credentials })
        .then((response) => {
          const { token, profile } = response.data;
          localStorage.setItem('user', JSON.stringify({ type: types[1], token }));
          dispatch({ type: actionTypes.LOGIN_USER.SUCCESS, profile });
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.LOGIN_USER.ERROR,
            modalMessage: 'INVALID CREDENTIALS',
          });
        });
    });
};

export const registerUser = (user, type) => async (dispatch) => {
  const ERROR_REGISTER = err => dispatch({
    type: actionTypes.REGISTER_USER.ERROR,
    modalMessage: err,
  });

  dispatch({ type: actionTypes.REGISTER_USER.IN_PROGRESS });

  user = sign(user);

  // Checking for employers with the same email
  const userExist = (await axios.post('/exist', { token: user })).data.exist;

  // Return with error if email exist in employers
  if (await userExist) return ERROR_REGISTER('EMAIL IS ALREADY IN USE');

  // If email has never been used proceed with registration
  axios
    .post(`${type}s/register`, { token: user })
    .then((response) => {
      const { token, profile } = response.data;
      localStorage.setItem('user', JSON.stringify({ type, token }));
      dispatch({ type: actionTypes.REGISTER_USER.SUCCESS, profile });
    })
    .catch(err => ERROR_REGISTER(err.response.data.message));
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
        modalMessage: err.message,
      });
    });
};

export const updateUserPassword = updatedInfo => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_PROFILE.IN_PROGRESS });

  const user = JSON.parse(localStorage.getItem('user'));
  updatedInfo = sign(updatedInfo);
  const requestOptions = { // send with get on protected routes
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  axios
    .put(`/${user.type}s/password`, { token: updatedInfo }, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.UPDATE_USER_PROFILE.SUCCESS, profile: response.data });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.UPDATE_USER_PROFILE.ERROR,
        modalMessage: err.response.data.message,
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
          modalMessage: err.response.data.message,
        });
      });
  }).catch((err) => {
    dispatch({
      type: actionTypes.UPDATE_USER_PHOTO.ERROR,
      modalMessage: err.response.data.message,
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

export const forgotPassword = email => async (dispatch) => {
  dispatch({ type: actionTypes.FORGOT_PASSWORD.IN_PROGRESS });
  Promise
    .all([
      await axios.post('/employers/forgotPassword', { email }),
      await axios.post('/jobseekers/forgotPassword', { email }),
    ])
    .then((responses) => {
      const foundUser = responses.find(response => response.data.userWasFound);
      if (!foundUser) {
        dispatch({ type: actionTypes.FORGOT_PASSWORD.ERROR, modalMessage: 'No user found with that email address.' });
      } else {
        dispatch({ type: actionTypes.FORGOT_PASSWORD.SUCCESS, modalMessage: `An email link has been sent to ${email}. Please check your inbox.` });
      }
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.FORGOT_PASSWORD.ERROR,
        modalMessage: err.data.response.message,
      });
    });
};

export const resetPassword = ({ userType, resetToken, newPassword }) => (dispatch) => {
  dispatch({ type: actionTypes.RESET_PASSWORD.IN_PROGRESS });
  const newPasswordToken = sign(newPassword);
  axios
    .put(`/${userType}/resetpassword`, { resetToken, newPasswordToken })
    .then((response) => {
      if (response.data.passwordChangeSuccess) {
        dispatch({
          type: actionTypes.RESET_PASSWORD.SUCCESS,
          modalMessage: 'Password reset successful!',
        });
      } else {
        dispatch({
          type: actionTypes.RESET_PASSWORD.ERROR,
          modalMessage: 'Something went wrong. Please try resetting your password again.',
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.RESET_PASSWORD.ERROR,
        modalMessage: 'Something went wrong. Please try resetting your password again.',
      });
    });
};
