const express = require('express');
const path = require('path');

const server = express();
server.use(express.static(path.join(__dirname, 'client/build')));
server.use()
// routes start

// routes end
server.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname  }/client/build/index.html`));
});

const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server/app/index is running ${port}`);
