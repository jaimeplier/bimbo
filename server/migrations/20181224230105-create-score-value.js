
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('ScoreValues', {
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
      attributeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ProductAttributes',
          key: 'id',
          as: 'attributeId',
        },
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('ScoreValues');
  },
};
