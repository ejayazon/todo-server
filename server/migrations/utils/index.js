const getTimestampDefinition = (DataTypes) => ({
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = {
  addTimestampDefinition: (DataTypes, definition) =>
    Object.assign(definition, getTimestampDefinition(DataTypes)),
};
