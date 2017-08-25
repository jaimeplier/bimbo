'use strict';
module.exports = function(sequelize, DataTypes) {
  var Factory = sequelize.define('Factory', {
    name: {
      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    latitude: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: -90, max: 90,
        notNull: true,
      },
    },
    longitude: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: -180, max: 180,
        notNull: true,
      },
    },
    organization: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    }
  }, {paranoid: true});

  return Factory;
};
