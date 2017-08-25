'use strict';
module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define('Score', {
    batch: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    expirationLable: DataTypes.STRING,
    packaging: DataTypes.STRING,
    size: DataTypes.STRING,
    symmetry: DataTypes.STRING,
    color: DataTypes.STRING,
    crumb: DataTypes.STRING,
    crumbColor: DataTypes.STRING,
    taste: DataTypes.STRING,
    scent: DataTypes.STRING,
    note: DataTypes.STRING,
    totalScore: DataTypes.INTEGER
  }, {paranoid: true});

  Score.associate = function(models) {
    Score.belongsTo(models.Factory, {
      foreignKey: 'factoryId',
      onDelete: 'CASCADE',
    })
    Score.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    })
    Score.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })

    Score.hasOne(models.ActionPlan, {
      foreignKey: 'scoreId',
      as: 'actionPlan',
    })
  }

  return Score;
};
