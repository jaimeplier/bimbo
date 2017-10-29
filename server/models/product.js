'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    productCode: DataTypes.STRING,
    bimboID: DataTypes.STRING
  }, {paranoid: true});

  Product.associate = function(models) {
    Product.belongsToMany(models.Factory, {
      as: 'factories',
      through: 'FactoryProduct',
    })

    Product.hasMany(models.ActionPlan, {
      foreignKey: 'productId',
      as: 'actionPlans',
    })
    Product.hasMany(models.Score, {
      foreignKey: 'productId',
      as: 'scores',
    })
  }

  return Product;
};
