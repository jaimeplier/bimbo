
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    productCode: DataTypes.STRING,
    bimboID: DataTypes.STRING,
  }, { paranoid: true });

  Product.associate = (models) => {
    Product.belongsToMany(models.Factory, {
      through: 'FactoryProduct',
      foreignKey: 'productId',
      as: 'factories',
    });

    Product.hasMany(models.ActionPlan, {
      foreignKey: 'productId',
      as: 'actionPlans',
    });
    Product.hasMany(models.Score, {
      foreignKey: 'productId',
      as: 'scores',
    });
    Product.hasMany(models.ProductAttribute, {
      foreignKey: 'productId',
      as: 'productAttributes',
    });
  };

  return Product;
};
