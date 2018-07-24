const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const server = require('../../server/server');

server.use(express.static(path.join(__dirname, 'client/build')));
server
  .get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });


mongoose
  .connect('mongodb://localhost:27017/local')
  .then(() => {
    console.log('\n=== Connected to MongoDB ===\n');
  })
  .catch(err => console.log('database conection failed', err));


const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server/app/index is running ${port}`);
