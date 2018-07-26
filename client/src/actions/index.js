import {
  getEmployerProfile,
  loginEmployer,
  registerEmployer,
  updateEmployerProfile,
  updateEmployerPassword,

} from './employerActions';

import {
  registerSeeker,
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
  registerSeeker,
  getSeekerProfile,
  updateSeekerProfile,
  updateSeekerPassword,
  // JOBS
  getJobs,
  toggleJobAvailability,
};
