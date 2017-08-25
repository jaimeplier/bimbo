'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId',
        }
      },
      factoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Factories',
          key: 'id',
          as: 'factoryId',
        }
      },
      lot: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expirationLable: {
        type: Sequelize.STRING
      },
      packaging: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      symmetry: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      crumb: {
        type: Sequelize.STRING
      },
      crumbColor: {
        type: Sequelize.STRING
      },
      taste: {
        type: Sequelize.STRING
      },
      scent: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      totalScore: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Scores');
  }
};
