const api = require('../api');

module.exports = (app) => {
  app.use('/api', api());
  app.use('*', (req, res) => {
    res.status(404).json({
      error: {
        code: 404,
        message: 'Not found',
      },
    });
  });
};
