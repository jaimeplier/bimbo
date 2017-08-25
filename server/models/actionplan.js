'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActionPlan = sequelize.define('ActionPlan', {
    cause: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    correction: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    completedAt: DataTypes.DATE
  }, {paranoid: true});

  ActionPlan.associate = function(models) {
    ActionPlan.belongsTo(models.User, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE',
    })
    ActionPlan.belongsTo(models.User, {
      foreignKey: 'completedBy',
    })
    ActionPlan.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    })
    ActionPlan.belongsTo(models.Factory, {
      foreignKey: 'factoryId',
      onDelete: 'CASCADE',
    })
    ActionPlan.belongsTo(models.Score, {
      foreignKey: 'scoreId',
      onDelete: 'CASCADE',
    })
  }

  return ActionPlan;
};
