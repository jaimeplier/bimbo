'use strict';
module.exports = function(sequelize, DataTypes) {
  var SupportMessage = sequelize.define('SupportMessage', {
    subject: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SupportMessage;
};
