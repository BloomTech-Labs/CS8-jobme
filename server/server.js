// node modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const morgan = require('morgan');
const strategies = require('./data/strategies');
const Seeker = require('./data/users/seeker/seekerModel');
const Employer = require('./data/users/employer/employerModel');

const {
  employerRouter,
  seekerRouter,
  billingRouter,
  jobRouter,
  messageRouter,
  tokenRouter
} = require('./data/routes');

const {userExist} = require('./data/apiTools');

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

try{
  if(process.NODE_ENV !== 'production') 
    require('./debug')(server, Seeker, Employer);
}
catch(err){
   console.log(err);
}


// routes begin
server.use('/api/token', tokenRouter);
server.use('/api/employers', employerRouter);
server.use('/api/jobseekers', seekerRouter);
server.use('/api/billing', billingRouter);
server.use('/api/jobs', jobRouter);
server.use('/api/messages', messageRouter);
server.post('/api/exist', userExist);
// routes end

module.exports = server;
