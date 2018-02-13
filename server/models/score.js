
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    lot: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
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
    Score.hasMany(models.ScoreValue, {
      foreignKey: 'scoreId',
      as: 'scoreValues',
    });
  };

  return Score;
};
