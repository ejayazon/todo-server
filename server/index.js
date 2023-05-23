const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json())

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
