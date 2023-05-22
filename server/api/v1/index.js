const express = require('express');
const router = new express.Router();
// const tasks = require('./tasks');
const users = require('./users');

module.exports = () => {
  // router.use('/tasks', tasks());
  router.use('/users', users);

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
