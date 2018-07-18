// node modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

// local files
const employerRouter = require('./data/users/employer/employerRoutes');
// const Employer = require('./server/users/employer/employerModel');

const corsOptions = {
  origin: ('https://jobmebro.herokuapp.com', 'http://localhost:3000'),
  credentials: true,
  methods: ['GET', 'PUT', 'POST'],
};

const server = express();

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());
server.use(passport.initialize());
server.use(passport.session());
server.options('*', cors());
// routes begin
server.use(express.static(path.join(__dirname, 'client/build')));
server.use('/api/employers', employerRouter);
server
  .get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });
// routes end

module.exports = server;
