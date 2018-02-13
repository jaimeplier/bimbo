
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  }, { paranoid: true });
  Organization.associate = (models) => {
    Organization.belongsToMany(models.Factory, {
      through: 'FactoryOrganization',
      foreignKey: 'organizationId',
      as: 'factories',
    });
  };
  return Organization;
};
