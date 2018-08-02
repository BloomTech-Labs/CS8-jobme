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

import {
  getJobs, likeJob, getJobMatches, uploadJob,
} from './jobs';

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
  uploadJob,
  // BROWSE SEEKERS
  getSeekers,
  likeSeeker,
  getSeekerMatches,
  // BILLING
  checkout,
};
