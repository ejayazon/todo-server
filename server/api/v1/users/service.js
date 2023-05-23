const { User, sequelize } = require(`${__serverRoot}/models`);
const { buildWhere, buildOrder } = require('../../utils/queries');
const _validQueryFields = ['id', 'email'];
const orderTypes = {
  id: 'STRING',
  firstName: 'STRING',
  lastName: 'STRING',
  email: 'STRING',
  createdAt: 'TIMESTAMP',
  updatedAt: 'TIMESTAMP',
};

const getByPk = async (id, options = {}) => {
  const user = await User.findByPk(id, options);
  if (!user) {
    const error = new Error('User does not exists');
    error.name = 'User does not exists';
    error.status = 404;
    throw error;
  }
  return user;
};

const list = async (query, options = {}) => {
  const { limit = '10', offset = '0', ...otherQuery } = query;
  const where = buildWhere(_validQueryFields, otherQuery);
  const order = query.order || ['email'];
  const orderQuery = sequelize.literal(buildOrder({}, order, orderTypes));

  const users = await User.findAndCountAll(
    { where, order: orderQuery, limit, offset },
    options
  );

  return users;
};

const create = async (query, options = {}) => {
  const user = await User.create(query, options);
  return user;
};

const deleteUser = async (id, options = {}) => {
  return sequelize.transaction(async (transaction) => {
    const _opts = { transaction, ...options };
    const user = await getByPk(id, _opts);
    await user.destroy({ force: true, ..._opts });
    return { id };
  });
};

const update = async (query, options = {}) => {
  return sequelize.transaction(async (transaction) => {
    const { id, ...otherQuery } = query;
    const _opts = { transaction, ...options };
    const user = await getByPk(id, _opts);
    return user.update(otherQuery, _opts);
  });
};

module.exports = {
  get: getByPk,
  create,
  delete: deleteUser,
  list,
  update,
};
