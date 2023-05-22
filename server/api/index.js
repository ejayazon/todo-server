const express = require('express');
const router = new express.Router();
const v1 = require('./v1');

module.exports = () => {
  router.use('/v1', v1());
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
