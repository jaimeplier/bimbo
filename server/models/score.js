'use strict';
module.exports = function(sequelize, DataTypes) {
  var atttribute = {
    type: DataTypes.ENUM('Success', 'Warning', 'Failure'),
    validate: {
      isIn: [['Success', 'Warning', 'Failure']]
    }
  }

  var Score = sequelize.define('Score', {
    lot: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    label: atttribute,
    airTightness: atttribute,
    packaging: atttribute,
    size: atttribute,
    cleanliness: atttribute,
    promotions: atttribute,
    product: atttribute,
    color: atttribute,
    scent: atttribute,
    taste: atttribute,
    edibility: atttribute,
    harmlessness: atttribute,
    weight: atttribute,
    symmetry: atttribute,
    slicing: atttribute,
    crust: atttribute,
    crumbSize: atttribute,
    crumbColor: atttribute,
    crumbConsistency: atttribute,
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
