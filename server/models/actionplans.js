'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActionPlans = sequelize.define('ActionPlans', {
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
  return ActionPlans;
};