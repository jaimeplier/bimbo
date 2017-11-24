

module.exports = {
  up(queryInterface, Sequelize) {
    const atttribute = {
      type: Sequelize.ENUM('Success', 'Warning', 'Failure'),
    };

    return queryInterface.createTable('Scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
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
      lot: {
        allowNull: false,
        type: Sequelize.STRING,
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
      note: {
        type: Sequelize.STRING,
      },
      totalScore: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('Scores');
  },
};
