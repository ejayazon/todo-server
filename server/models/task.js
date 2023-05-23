const Sequelize = require('sequelize');

const getDefinition = (DataTypes) => {
  return {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 5,
      },
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 10,
      },
    },
    status: {
      type: DataTypes.ENUM({
        values: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
      }),
      defaultValue: 'TO_DO',
    },
    priority: {
      type: DataTypes.ENUM({
        values: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      }),
      defaultValue: 'MEDIUM',
    },
    assignee: {
      references: {
        as: 'userId',
        key: 'id',
        model: 'Users',
      },
      type: DataTypes.UUID,
    },
    createdBy: {
      allowNull: false,
      references: {
        as: 'userId',
        key: 'id',
        model: 'Users',
      },
      type: DataTypes.UUID,
    },
    updatedBy: {
      references: {
        as: 'userId',
        key: 'id',
        model: 'Users',
      },
      type: DataTypes.UUID,
    },
  };
};

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', getDefinition(DataTypes), {
    paranoid: true,
  });
  Task.prototype.toAPIJSON = function () {
    const plainTask = this.get({ plain: true });
    const {} = plainTask;
    const { id, ...taskDetails } = plainTask;
    const plain = {
      id,
      type: 'task',
      attributes: taskDetails,
    };

    return plain;
  };
  return Task;
};

module.exports.getDefinition = getDefinition;
module.exports.tableName = 'Tasks';
