const fs = require('fs');

const dummyData = JSON.parse(fs.readFileSync('./server/data/jobs/dummydata.json'));
Seeker.create(dummyData);