const express = require('express');
const path = require('path');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const cors = require('cors');
const helmet = require('helmet');
const employerRouter = require('./server/users/employer/employerRoutes');

const configDBUSER = require('./config').dbuser;
const configDBPASS = require('./config').dbpass;

const Employer = require('./server/users/employer/employerModel');

const server = express();

// const MONGO_URL = 'mongodb://databaseuser:lambdaschool1@ds239681.mlab.com:39681/jobme';

// mongoose.connect(
// MONGO_URL,
// {},
// (err, db) => {
//   if (err) {
//     return console.log(err);
//   }
mongoose
  .connect(`mongodb://${configDBUSER}:${configDBPASS}@ds239681.mlab.com:39681/jobme`)
  .then(() => {
    const employer = new Employer({
      companyName: 'Lambda School',
      description: 'School of Computer Science',
    });
    employer.save();
    console.log('\n=== Connected to MongoDB ===\n');
  })
  .catch(err => console.log('database conection failed', err));

// Do something with db here, like inserting a record
//     db.collection('employer').insertOne(
//       {
//         companyName: 'Lambda School',
//         description: 'School of Computer Science',
//       },
//       (err, res) => {
//         if (err) {
//           db.close();
//           return console.log(err);
//         }
//         // Success
//         db.close();
//       },
//     );
//   },
// );

// Logger
const logger = (req, res, next) => {
  console.log('d-(OvO")z looks correct to me', req.body);

  next();
};


server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger);


server.use(express.static(path.join(__dirname, 'client/build')));

server.use('/api/employers', employerRouter);
// TODO: add jpbseekers
// routes start
server // routes end
  .get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });

const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server/app/index is running ${port}`);
