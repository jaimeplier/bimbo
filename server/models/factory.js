'use strict';
module.exports = function(sequelize, DataTypes) {
  var Factory = sequelize.define('Factory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: -90, max: 90,
        notNull: true,
      },
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: -180, max: 180,
        notNull: true,
      },
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    country: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    }
  }, {paranoid: true});

  Factory.associate = function(models) {
    Factory.hasMany(models.ActionPlan, {
      foreignKey: 'factoryId',
      as: 'actionPlans',
    })
    Factory.belongsToMany(models.Product, {
      through: 'FactoryProduct',
      foreignKey: 'productId',
      as: 'products',
    });
    Factory.hasMany(models.Score, {
      foreignKey: 'factoryId',
      as: 'scores',
    })
    Factory.hasMany(models.User, {
      foreignKey: 'factoryId',
      as: 'users',
    })
  }

  return Factory;
};
