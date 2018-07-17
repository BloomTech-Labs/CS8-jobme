// node modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

// local files
const employerRouter = require('./data/users/employer/employerRoutes');
// const Employer = require('./server/users/employer/employerModel');


const port = process.env.PORT || 5000;
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// routes begin
server.use(express.static(path.join(__dirname, 'client/build')));
server.use('/api/employers', employerRouter);
server
  .get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });
// routes end

module.exports = server;
