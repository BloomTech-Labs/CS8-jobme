import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
  updateUserPassword,
  updateSeekerPic,
  logoutUser,
  clearState,
  returnedHome,
} from './user';

import checkout from './billing';

import {
  getJobs,
  likeJob,
  getJobMatches,
  uploadJob,
  editJob,
  deleteJob,
} from './jobs';

import {
  getSeekers,
  likeSeeker,
  getSeekerMatches,
} from './seekers';

export {
  // User
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  updateSeekerPic,
  logoutUser,
  clearState,
  returnedHome,
  // JOBS
  getJobs,
  likeJob,
  getJobMatches,
  uploadJob,
  editJob,
  deleteJob,
  // BROWSE SEEKERS
  getSeekers,
  likeSeeker,
  getSeekerMatches,
  // BILLING
  checkout,
};
