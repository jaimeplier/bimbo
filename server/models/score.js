
module.exports = (sequelize, DataTypes) => {
  const attribute = () => ({
    type: DataTypes.ENUM('Success', 'Warning', 'Failure'),
    validate: {
      isIn: [['Success', 'Warning', 'Failure']],
    },
  });

  const Score = sequelize.define('Score', {
    lot: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    label: attribute(),
    airTightness: attribute(),
    packaging: attribute(),
    size: attribute(),
    cleanliness: attribute(),
    promotions: attribute(),
    product: attribute(),
    color: attribute(),
    scent: attribute(),
    taste: attribute(),
    edibility: attribute(),
    harmlessness: attribute(),
    weight: attribute(),
    symmetry: attribute(),
    slicing: attribute(),
    crust: attribute(),
    crumbSize: attribute(),
    crumbColor: attribute(),
    crumbConsistency: attribute(),
    note: DataTypes.STRING,
    totalScore: DataTypes.INTEGER,
  }, { paranoid: true });

  Score.associate = (models) => {
    Score.belongsToMany(models.Factory, {
      through: 'FactoryProduct',
      foreignKey: 'factoryId',
      as: 'factories',
    });
    Score.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
    Score.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });

    Score.hasOne(models.ActionPlan, {
      foreignKey: 'scoreId',
      as: 'actionPlan',
    });
  };

  return Score;
};
