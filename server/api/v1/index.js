require('../../globals');
const express = require('express');
const router = new express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerApiV1Docs = YAML.load(
  path.join(__serverRoot, 'documentation/apiv1.yaml')
);
const tasks = require('./tasks');
const users = require('./users');

module.exports = () => {
  router.use('/tasks', tasks);
  router.use('/users', users);
  router.use('/docs', swaggerUi.serve, (req, res) => {
    swaggerUi.setup(swaggerApiV1Docs)(req, res);
  });

  router.use('*', (req, res) => {
    res.status(404).json({
      error: {
        code: 404,
        message: 'Not found',
      },
    });
  });

  return router;
};
