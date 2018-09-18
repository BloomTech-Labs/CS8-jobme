/* eslint global-require: 0 */
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const server = require('./server/server');

const dbuser = process.env.DBUSER || configDBUSER;
const dbpass = process.env.DBPASS || configDBPASS;

mongoose
  .connect(`mongodb://${dbuser}:${dbpass}@ds239681.mlab.com:39681/jobme`)
  .then(() => {
    console.log('\n=== Connected to MongoDB ===\n');
  })
  .catch(err => console.log('database conection failed', err));


const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server/app/index is running ${port}`);
