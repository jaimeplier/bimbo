'use strict';
module.exports = function(sequelize, DataTypes) {
  var SupportMessage = sequelize.define('SupportMessage', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    }
  }, {paranoid: true});

  SupportMessage.associate = function(models) {
    SupportMessage.belongsTo(models.User, {
      foreignKey: 'from',
      onDelete: 'CASCADE',
    })
  }

  return SupportMessage;
};
