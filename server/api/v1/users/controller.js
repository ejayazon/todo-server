const { promiseController } = require('../../utils');
const service = require('./service');

const get = promiseController(async (req) => {
  const user = await service.get(req.params.id);
  return user;
});

module.exports = {
  get,
};
