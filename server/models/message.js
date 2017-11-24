
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  }, { paranoid: true });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'to',
      onDelete: 'CASCADE',
    });
    Message.belongsTo(models.User, {
      foreignKey: 'from',
      onDelete: 'CASCADE',
    });
  };

  return Message;
};
