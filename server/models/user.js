'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    access: {
      type: DataTypes.ENUM('Master', 'Admin', 'Employee'),
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    accessPin: {
      DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      }
    },
    picture: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      }
    },
    resetToken: DataTypes.STRING,
    password: DataTypes.STRING,
    lastActivity: DataTypes.DATE,
  }, {paranoid: true});

  User.associate = function(models) {
    User.belongsTo(models.Factory, {
      foreignKey: 'factoryId',
      onDelete: 'CASCADE',
    })
  }

  return User;
};
