require('../globals');
const { sequelize } = require(`${__serverRoot}/secrets/development`);

const development = {
  ...sequelize,
};
const local = {
  ...sequelize,
};

module.exports = {
  development: { ...development },
  local: { ...development },
};
