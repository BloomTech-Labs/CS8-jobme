import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production'
  ? 'https://jobitduder.herokuapp.com/api'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const loginJobSeeker = credentials => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_SEEKER.IN_PROGRESS });

  axios
    .post('/jobseeker/login', credentials)
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

export const getJobSeekerProfile = token => (dispatch) => {
  dispatch({ type: actionTypes.GET_SEEKER_PROFILE.IN_PROGRESS });
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get('/jobseeker/profile', requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.GET_SEEKER_PROFILE, profile: response.data });
    })
    .catch((error) => {
      console.log('Error', error);
      dispatch({ type: actionTypes.GET_EMPLOYER_PROFILE.ERROR });
    });
};

export const registerJobSeeker = user => (dispatch) => {
  dispatch({ type: actionTypes.REGISTER_SEEKER.IN_PROGRESS });

  axios
    .post('/jobseeker/register', user)
    .then(() => {
      dispatch({ type: actionTypes.REGISTER_SEEKER.SUCCESS });
    })
    .catch((error) => {
      const { message } = error.data;
      dispatch({
        type: actionTypes.REGISTER_SEEKER.ERROR,
        errorMessage: message,
      });
    });
};
