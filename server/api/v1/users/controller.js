const { promiseController } = require('../../utils');
const {
  entityFormatter,
  entitiesFormatter,
} = require('../../utils/apiFormatters');
const service = require('./service');

const get = promiseController(async (req) => {
  const user = await service.get(req.params.id);
  return entityFormatter(user);
});

const list = promiseController(async (req) => {
  const { page, filter, ...otherQuery } = req.query;
  const users = await service.list({
    ...page,
    ...filter,
    ...otherQuery,
  });
  return entitiesFormatter(users, req.query);
});

const create = promiseController(async (req) => {
  const user = await service.create(req.body);
  return entityFormatter(user);
});

const deleteUser = promiseController(async (req) => {
  const user = await service.delete(req.params.id);
  return entityFormatter(user);
});

const update = promiseController(async (req) => {
  const user = await service.update({ ...req.body, id: req.params.id });
  return entityFormatter(user);
});

module.exports = {
  get,
  list,
  create,
  delete: deleteUser,
  update,
};
