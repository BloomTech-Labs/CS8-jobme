// node modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const morgan = require('morgan');
const strategies = require('./data/strategies');
const Seeker = require('./data/users/seeker/seekerModel');
const Employer = require('./data/users/employer/employerModel');

// local files
const employerRouter = require('./data/users/employer/employerRoutes');
const seekerRouter = require('./data/users/seeker/seekerRoutes');
const billingRouter = require('./data/billing/routes/billingRoutes');
const jobRouter = require('./data/jobs/jobRoutes');
const messageRouter = require('./data/messages/messageRoutes');
const {userExist, decode, sign} = require('./data/users/apiTools');
// const Employer = require('./server/users/employer/employerModel');

const server = express();

const originUrl = process.env.NODE_ENV === 'production'
  ? 'https://www.rcruit.app' : 'http://localhost:3000';

const corsOptions = {
  origin: (originUrl),
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
server.use(morgan('combined'));
server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());
server.use(passport.initialize());
server.use(passport.session());

strategies();

const verifyUser = async (auth) => {
  return await Seeker.findById(auth.id)
  .then((seeker) => {
    if(!seeker || seeker.password !== auth.password) 
      return Promise.reject();
    return "Found Seeker";
  })
  .catch(async() => { 
    return await Employer.findById(auth.id)
    .then((employer) => {
      if(!employer || employer.password !== auth.password) 
        return Promise.reject();
      return "found Employer";
    })
    .catch(() => {
      return "Not Found";
    })
  });
}

server.get('/test', async (req, res) => {
  if(!req.headers.authorization) return res.send("UNAUTHORIZED");
  const tokenIn = req.headers.authorization.split('Bearer ').reverse()[0];
  let user = decode(tokenIn);

 //user.exp = Date.now() - 10000;
  user.token_settings = {
    infinite: true,
    secureInactive: false,

  }
  const infinite = user.token_settings.infinite;
  const secureInactive = user.token_settings.secureInactive;
   //Check User

  // TestForStale
  const isStale = Date.now() > user.exp;
  user.hash = "$2b$13$Zc3EjkXjEjnTqL/jT/g.4.sSyMtYPgDC/3tvbMTYHKmcPKcQYrlvu";
  const status = await verifyUser({id: user.sub, password: user.hash});
  console.log(await status);
  if(await status === "Not Found") return status;
  let refresh = false;
  if(infinite && !secureInactive) refresh = true;
  if(infinite && secureInactive && !isStale) refresh = true;
  if(infinite && secureInactive && isStale) refresh = false; // require pass
  if(!infinite && secureInactive && isStale) refresh = false; // Log Out
  if(!infinite && secureInactive && !isStale) refresh = true;
  if(!infinite && !secureInactive && !isStale) refresh = true;
  let newToken, newTokenOpen; 
  if(refresh){
    newTokenOpen = Object.assign({},user);
    newTokenOpen.exp = Date.now();
    newTokenOpen.token_settings = undefined;
    newToken = sign({newTokenOpen});
  }
  
  
  res.json({
    user,
    isStale,
    refresh,
    tokenIn,
    tokenOut: refresh ? newToken : "UNAUTHORIZED",
    newTokenOpen
  });
});

// routes begin
server.use('/api/employers', employerRouter);
server.use('/api/jobseekers', seekerRouter);
server.use('/api/billing', billingRouter);
server.use('/api/jobs', jobRouter);
server.use('/api/messages', messageRouter);
server.post('/api/exist', userExist);
// routes end

module.exports = server;
