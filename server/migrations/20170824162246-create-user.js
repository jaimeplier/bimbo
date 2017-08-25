'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        unique: true,
        type: Sequelize.STRING
      },
      access: {
        allowNull: false,
        type: Sequelize.ENUM('Master', 'Admin', 'Employee')
      },
      accessPin: {
        type: Sequelize.INTEGER(6).ZEROFILL
      },
      picture: {
        type: Sequelize.STRING
      },
      resetToken: {
        type: Sequelize.STRING
      },
      factoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Factories',
          key: 'id',
          as: 'factoryId',
        }
      },
      password: {
        type: Sequelize.STRING
      },
      lastActivity: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
