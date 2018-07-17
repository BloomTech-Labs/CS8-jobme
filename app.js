const mongoose = require('mongoose');
const fs = require('fs');
const configDBUSER = require('./config').dbuser;
const configDBPASS = require('./config').dbpass;
const server = require('./server/server');


mongoose
  .connect(`mongodb://${configDBUSER}:${configDBPASS}@ds239681.mlab.com:39681/jobme`)
  .then(() => {
    // const employer = new Employer({
    //   companyName: 'Lambda School',
    //   description: 'School of Computer Science',
    // });
    // employer.save();

    console.log('\n=== Connected to MongoDB ===\n');
  })
  .catch(err => console.log('database conection failed', err));


// grab dummy data and hash passwords using same bcrypt config


const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server/app/index is running ${port}`);
