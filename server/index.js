const express = require('express');
const app = express();
const port = 3000;
require('./globals');

if (__env !== 'test') {
  app.listen(port, () => {
    console.log(`
Running on ${__env} environment
Access URL: http://localhost:${port}
Press Ctrl + C to stop
    `);
  });
}
