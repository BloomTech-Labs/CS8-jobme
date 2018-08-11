import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production'
  ? 'https://jobitduder.herokuapp.com/api'
  : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getMessages = (jobId, partnerId) => (dispatch) => {
  dispatch({ type: actionTypes.GET_MESSAGES.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.get(`/messages?partnerId=${partnerId}&jobId=${jobId}`, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.GET_MESSAGES.SUCCESS, messageHistory: response.data });
    });
};

export const getConversations = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_CONVERSATIONS.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.get('/messages/conversations', requestOptions).then((response) => {
    dispatch({ type: actionTypes.GET_CONVERSATIONS.SUCCESS, conversations: response.data });
  }).catch((err) => {
    dispatch({ type: actionTypes.GET_CONVERSATIONS.ERROR, modalMessage: err.response.data.message });
  });
};

export const sendMessage = (title, body, toId, matchedJob) => (dispatch) => {
  dispatch({ type: actionTypes.SEND_MESSAGE.IN_PROGRESS });
  const message = {
    title,
    body,
    toId,
    matchedJob,
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = { headers: { Authorization: `Bearer ${user.token}` } };

  axios.post('/messages', message, requestOptions)
    .then(() => {
      dispatch({ type: actionTypes.SEND_MESSAGE.SUCCESS });
    }).catch((err) => {
      dispatch({ type: actionTypes.SEND_MESSAGE.ERROR, modalMessage: err.response.data.message });
    });
};