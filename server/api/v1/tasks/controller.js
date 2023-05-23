const { promiseController } = require('../../utils');
const {
  entityFormatter,
  entitiesFormatter,
} = require('../../utils/apiFormatters');
const service = require('./service');

const get = promiseController(async (req) => {
  const task = await service.get(req.params.id);
  return entityFormatter(task);
});

const list = promiseController(async (req) => {
  const { page, filter, ...otherQuery } = req.query;
  const tasks = await service.list({
    ...page,
    ...filter,
    ...otherQuery,
  });
  return entitiesFormatter(tasks, req.query);
});

const create = promiseController(async (req) => {
  const task = await service.create(req.body);
  return entityFormatter(task);
});

const deleteTask = promiseController(async (req) => {
  const task = await service.delete(req.params.id);
  return entityFormatter(task);
});

const update = promiseController(async (req) => {
  const task = await service.update({ ...req.body, id: req.params.id });
  return entityFormatter(task);
});

module.exports = {
  get,
  list,
  create,
  delete: deleteTask,
  update,
};
