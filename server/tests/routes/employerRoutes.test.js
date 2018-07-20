const fs = require('fs');

const dummyData = JSON.parse(fs.readFileSync('dummydata.json'));
Seeker.create(dummyData);