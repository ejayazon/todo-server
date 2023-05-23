const Sequelize = require('sequelize');

const getDefinition = (DataTypes) => {
  return {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 1,
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 1,
      },
    },
    createdBy: {
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
  const User = sequelize.define('User', getDefinition(DataTypes), {
    paranoid: true,
  });
  User.prototype.toAPIJSON = function () {
    const plainUser = this.get({ plain: true });
    const {} = plainUser;
    const { id, ...userDetails } = plainUser;
    const plain = {
      id,
      type: 'user',
      attributes: userDetails,
    };

    return plain;
  };
  return User;
};

module.exports.getDefinition = getDefinition;
module.exports.tableName = 'Users';
