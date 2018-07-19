// node modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

// local files
const employerRouter = require('./data/users/employer/employerRoutes');
// const Employer = require('./server/users/employer/employerModel');

const server = express();

const corsOptions = {
    origin: ('http://localhost:3000'),
    credentials: true,
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());
server.use(passport.initialize());
server.use(passport.session());

// routes begin
server.use('/api/employers', employerRouter);
// routes end

module.exports = server;
