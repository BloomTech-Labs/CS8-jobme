import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production' ? 'heroku' : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const getEmployerProfile = () => (dispatch);
