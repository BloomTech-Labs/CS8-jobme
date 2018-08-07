import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
  updateUserPassword,
  updateUserPic,
  logoutUser,
  clearState,
  returnedHome,
  closeModal,
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
  updateUserPic,
  logoutUser,
  clearState,
  returnedHome,
  closeModal,
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
