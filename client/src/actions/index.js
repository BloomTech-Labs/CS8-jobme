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

import { getJobs, toggleJobAvailability } from './jobActions';

export {
  // EMPLOYER
  loginEmployer,
  registerEmployer,
  getEmployerProfile,
  updateEmployerProfile,
  updateEmployerPassword,
  // SEEKER
  loginSeeker,
  registerJobSeeker,
  getSeekerProfile,
  updateSeekerProfile,
  updateSeekerPassword,
  // JOBS
  getJobs,
  toggleJobAvailability,
};
