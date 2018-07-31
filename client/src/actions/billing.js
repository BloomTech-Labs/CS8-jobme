import axios from 'axios';

import actionTypes from './actionTypes';

const checkout = (source, total, cart) => (dispatch) => {
  dispatch({ type: actionTypes.CHECKOUT.IN_PROGRESS });
  const user = localStorage.getItem('user');
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.post('/billing', { source, total, cart }, requestOptions)
    .then((response) => {
      dispatch({ type: actionTypes.CHECKOUT.SUCCESS });
    }).catch((err) => {
      dispatch({ type: actionTypes.CHECKOUT.ERROR });
    });
};

export default checkout;
