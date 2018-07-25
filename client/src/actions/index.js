import actionTypes from './actionTypes';
import {
  getEmployerProfile,
  loginEmployer,
  registerEmployer,
  updateEmployerProfile,
  updateEmployerPassword,

} from './employerActions';

import {
  registerJobSeeker,
  loginSeeker,
  getSeekerProfile,
  updateSeekerProfile,
  updateSeekerPassword,
} from './seekerActions';

export {
  loginEmployer,
  registerEmployer,
  getEmployerProfile,
  updateEmployerProfile,
  updateEmployerPassword,
  // -----
  loginSeeker,
  registerJobSeeker,
  getSeekerProfile,
  updateSeekerProfile,
  updateSeekerPassword,
};
