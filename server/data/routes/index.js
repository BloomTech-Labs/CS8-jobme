const employerRouter = require('../users/employer/employerRoutes');
const seekerRouter = require('../users/seeker/seekerRoutes');
const billingRouter = require('../billing/routes/billingRoutes');
const jobRouter = require('../jobs/jobRoutes');
const messageRouter = require('../messages/messageRoutes');
const tokenRouter = require('../system/token');

module.exports = {
  employerRouter,
  seekerRouter,
  billingRouter,
  jobRouter,
  messageRouter,
  tokenRouter
}