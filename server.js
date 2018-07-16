const express = require('express');
const path = require('path');
const employerRouter = require('./server/users.employer/employerRouter');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use(express.static(path.join(__dirname, 'client/build')));

server.use('/api/employers', employerRouter);
//TODO: add jpbseekers
// routes start
server.
  // routes end
  server.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });

const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server/app/index is running ${port}`);
