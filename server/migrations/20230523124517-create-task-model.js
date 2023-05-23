const Task = require(`${__serverRoot}/models/task`);
const { addTimestampDefinition } = require('./utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Tasks',
      addTimestampDefinition(Sequelize, Task.getDefinition(Sequelize, 'create'))
    );
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('Tasks');
  },
};
