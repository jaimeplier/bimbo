'use strict';
module.exports = function(sequelize, DataTypes) {
  var Scores = sequelize.define('Scores', {
    batch: DataTypes.STRING,
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Scores;
};