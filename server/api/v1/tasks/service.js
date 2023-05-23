const { Task, sequelize } = require(`${__serverRoot}/models`);
const { buildWhere, buildOrder } = require('../../utils/queries');
const _validQueryFields = ['id', 'name', 'description', 'status', 'priority'];
const orderTypes = {
  id: 'STRING',
  name: 'STRING',
  description: 'STRING',
  priority: 'ENUM',
  status: 'ENUM',
  createdAt: 'TIMESTAMP',
  updatedAt: 'TIMESTAMP',
};

const getByPk = async (id, options = {}) => {
  const task = await Task.findByPk(id, options);
  if (!task) {
    const error = new Error('Task does not exists');
    error.name = 'Task does not exists';
    error.status = 404;
    throw error;
  }
  return task;
};

const list = async (query, options = {}) => {
  const { limit = '10', offset = '0', ...otherQuery } = query;
  const where = buildWhere(_validQueryFields, otherQuery);
  const order = query.order || ['name'];
  const orderQuery = sequelize.literal(buildOrder({}, order, orderTypes));

  const tasks = await Task.findAndCountAll(
    { where, order: orderQuery, limit, offset },
    options
  );

  return tasks;
};

const create = async (query, options = {}) => {
  const task = await Task.create(query, options);
  return task;
};

const deleteTask = async (id, options = {}) => {
  return sequelize.transaction(async (transaction) => {
    const _opts = { transaction, ...options };
    const task = await getByPk(id, _opts);
    await task.destroy({ force: true, ..._opts });
    return { id };
  });
};

const update = async (query, options = {}) => {
  return sequelize.transaction(async (transaction) => {
    const { id, ...otherQuery } = query;
    const _opts = { transaction, ...options };
    const task = await getByPk(id, _opts);
    return task.update(otherQuery, _opts);
  });
};

module.exports = {
  get: getByPk,
  create,
  delete: deleteTask,
  list,
  update,
};
