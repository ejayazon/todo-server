const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('dev'));

require('./globals');

require('./routes')(app);

if (__env !== 'test') {
  app.listen(port, () => {
    console.log(`
Running on ${__env} environment
Access URL: http://localhost:${port}
Press Ctrl + C to stop
    `);
  });
}
