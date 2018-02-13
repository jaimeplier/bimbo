
module.exports = (sequelize, DataTypes) => {
  const ScoreValue = sequelize.define('ScoreValue', {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, { paranoid: true });

  ScoreValue.associate = (models) => {
    ScoreValue.belongsTo(models.Score, {
      foreignKey: 'scoreId',
      onDelete: 'CASCADE',
    });
    ScoreValue.belongsTo(models.ProductAttribute, {
      foreignKey: 'attributeId',
      onDelete: 'CASCADE',
    });
  };

  return ScoreValue;
};

