
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    successCase: {
      type: DataTypes.INTEGER,
    },
    warningCase: {
      type: DataTypes.INTEGER,
    },
    failureCase: {
      type: DataTypes.INTEGER,
    },
  }, { paranoid: true });

  ProductAttribute.associate = (models) => {
    ProductAttribute.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
    ProductAttribute.hasMany(models.ScoreValue, {
      foreignKey: 'attributeId',
      as: 'scoreValues',
    });
  };

  return ProductAttribute;
};

