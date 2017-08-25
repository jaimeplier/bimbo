'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActionPlan = sequelize.define('ActionPlan', {
    cause: DataTypes.STRING,
    correction: DataTypes.STRING,
    completedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ActionPlan;
};
