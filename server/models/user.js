'use strict';

var bcrypt = require('bcrypt');

function hashPassword(user, options) {
  if(!user.changed('password') || !user.password) return;
  console.log('hashing password...'); // Test this won't run on every update (basically the .changed() method works)
  return bcrypt.hash(user.password, 12).then(function(hash) {
    return user.password = hash;
  })
}

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
      },
      set(e) {
        this.setDataValue('email', e.toLowerCase());
      },
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

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
