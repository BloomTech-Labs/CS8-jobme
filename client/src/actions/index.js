import {
  getEmployerProfile,
  loginEmployer,
  registerEmployer,
  updateEmployerProfile,
  updateEmployerPassword,

} from './user';


import { getJobs, toggleJobAvailability } from './jobActions';

import { getSeekers, toggleSeekerAvailability } from './browseSeekerActions';

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
  // BROWSE SEEKERS
  getSeekers,
  toggleSeekerAvailability,
};
