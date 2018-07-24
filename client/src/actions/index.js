import actionTypes from './actionTypes';
import {
  getEmployerProfile,
  loginEmployer,
  registerEmployer,
  updateEmployerProfile,
  updateEmployerPassword,
} from './employerActions';

import {
<<<<<<< HEAD
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
  // registerSeeker,
  getSeekerProfile,
  updateSeekerProfile,
  updateSeekerPassword,
=======
  getJobSeekerProfile,
  loginJobSeeker,
  registerJobSeeker,
} from './seekerActions';

export {
  getEmployerProfile, loginEmployer, registerEmployer, //Employer 
  loginJobSeeker, getJobSeekerProfile, registerJobSeeker,
>>>>>>> Added actions/reducers/ui so job seekers can register
};
