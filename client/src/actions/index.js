import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
  updateUserPassword,
  logoutUser,
  clearState,
  returnedHome,
} from './user';

import checkout from './billing';

import { getJobs, likeJob, getJobMatches } from './jobs';

import { getSeekers, likeSeeker, getSeekerMatches } from './seekers';

export {
  // User
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  logoutUser,
  clearState,
  returnedHome,
  // JOBS
  getJobs,
  likeJob,
  getJobMatches,
  // BROWSE SEEKERS
  getSeekers,
  likeSeeker,
  getSeekerMatches,
  // BILLING
  checkout,
};
