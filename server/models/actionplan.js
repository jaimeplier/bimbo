
module.exports = (sequelize, DataTypes) => {
  const ActionPlan = sequelize.define('ActionPlan', {
    cause: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    correction: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    completedAt: DataTypes.DATE,
  }, { paranoid: true });

  ActionPlan.associate = (models) => {
    ActionPlan.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'createdUser',
      onDelete: 'CASCADE',
    });
    ActionPlan.belongsTo(models.User, {
      foreignKey: 'completedBy',
      as: 'completedUser',
    });
    ActionPlan.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
      onDelete: 'CASCADE',
    });
    ActionPlan.belongsTo(models.Factory, {
      foreignKey: 'factoryId',
      onDelete: 'CASCADE',
    });
    ActionPlan.belongsTo(models.Score, {
      foreignKey: 'scoreId',
      as: 'score',
      onDelete: 'CASCADE',
    });
  };

  return ActionPlan;
};
