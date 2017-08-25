'use strict';
module.exports = function(sequelize, DataTypes) {
  var SupportMessages = sequelize.define('SupportMessages', {
    subject: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SupportMessages;
};