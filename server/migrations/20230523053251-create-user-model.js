const User = require(`${__serverRoot}/models/user`);
const { addTimestampDefinition } = require('./utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Users',
      addTimestampDefinition(Sequelize, User.getDefinition(Sequelize, 'create'))
    );
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('Users');
  },
};
