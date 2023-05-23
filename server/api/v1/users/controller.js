const { promiseController } = require('../../utils');
const service = require('./service');

const get = promiseController(async (req) => {
  const user = await service.get(req.params.id);
  return user;
});

const list = promiseController(async (req) => {
  const { page, filter, ...otherQuery } = req.query;
  const users = await service.list({
    ...page,
    ...filter,
    ...otherQuery,
  });
  return users;
});

const create = promiseController(async (req) => {
  const user = await service.create(req.body);
  return user;
});

const deleteUser = promiseController(async (req) => {
  const user = await service.delete(req.params.id);
  return user;
});

const update = promiseController(async (req) => {
  const user = await service.update({ ...req.body, id: req.params.id });
  return user;
});

module.exports = {
  get,
  list,
  create,
  delete: deleteUser,
  update,
};
