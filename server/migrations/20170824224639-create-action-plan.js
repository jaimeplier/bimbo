
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('ActionPlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      scoreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Scores',
          key: 'id',
          as: 'scoreId',
        },
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'createdBy',
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId',
        },
      },
      factoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Factories',
          key: 'id',
          as: 'factoryId',
        },
      },
      cause: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      correction: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      completedAt: {
        type: Sequelize.DATE,
      },
      completedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'completedBy',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('ActionPlans');
  },
};
