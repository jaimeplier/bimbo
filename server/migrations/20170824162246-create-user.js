
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
      },
      access: {
        allowNull: false,
        type: Sequelize.ENUM('Master', 'Admin', 'Employee'),
      },
      accessPin: {
        type: Sequelize.INTEGER(6).ZEROFILL,
        unique: true,
      },
      picture: {
        type: Sequelize.STRING(400),
      },
      resetToken: {
        type: Sequelize.STRING,
        unique: true,
      },
      factoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Factories',
          key: 'id',
          as: 'factoryId',
        },
      },
      language: {
        type: Sequelize.ENUM('en', 'es'),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
      },
      lastActivity: {
        type: Sequelize.DATE,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    return queryInterface.dropTable('Users');
  },
};
