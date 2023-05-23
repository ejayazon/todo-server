const { User } = require(`${__serverRoot}/models`);

const get = async (id, options) => {
  const user = await User.findByPk(id, options);
  return user;
};

const create = async (query, options) => {
  const user = await User.create(query, options);
  return user;
};

module.exports = {
  get,
  create,
};
