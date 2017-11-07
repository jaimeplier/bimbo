'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActionPlan = sequelize.define('ActionPlan', {
    cause: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    correction: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    completedAt: DataTypes.DATE
  }, {paranoid: true});

  ActionPlan.associate = function(models) {
    ActionPlan.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'createdUser',
      onDelete: 'CASCADE',
    })
    ActionPlan.belongsTo(models.User, {
      foreignKey: 'completedBy',
      as: 'completedUser'
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
      as: 'score',
      onDelete: 'CASCADE',
    })
  }

  return ActionPlan;
};
