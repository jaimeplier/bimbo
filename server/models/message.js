'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
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
    },
  }, {paranoid: true});

  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      foreignKey: 'to',
      onDelete: 'CASCADE',
    })
    Message.belongsTo(models.User, {
      foreignKey: 'from',
      onDelete: 'CASCADE',
    })
  }

  return Message;
};
