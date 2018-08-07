import axios from 'axios';

import actionTypes from './actionTypes';

const checkout = (source, total, cart) => (dispatch) => {
  dispatch({ type: actionTypes.CHECKOUT.IN_PROGRESS });
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.post('/billing', { source, total, cart }, requestOptions)
    .then((response) => {
      const { credits, postsAvailable } = response.data;
      dispatch({ type: actionTypes.CHECKOUT.SUCCESS, credits, postsAvailable });
    }).catch((err) => {
      dispatch({ type: actionTypes.CHECKOUT.ERROR, errorMessage: err.response.data.message.response.data.message });
    });
};

export default checkout;
