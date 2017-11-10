'use strict';
module.exports = function(sequelize, DataTypes) {
  var attribute = function() {
    return {
      type: DataTypes.ENUM('Success', 'Warning', 'Failure'),
      validate: {
        isIn: [['Success', 'Warning', 'Failure']]
      }
    }
  }

  var Score = sequelize.define('Score', {
    lot: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
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
      as: 'user',
      onDelete: 'CASCADE',
    })

    Score.hasOne(models.ActionPlan, {
      foreignKey: 'scoreId',
      as: 'actionPlan',
    })
  }

  return Score;
};
