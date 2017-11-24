

const bcrypt = require('bcrypt');

function hashPassword(user) {
  if (!user.changed('password') || !user.password) return;
  console.log('hashing password...'); // Test this won't run on every update (basically the .changed() method works)
  // eslint-disable-next-line
  return bcrypt.hash(user.password, 12).then((hash) => { user.password = hash; });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: { msg: 'invalidEmail' },
        isUnique(value, next) {
          User.find({ where: { email: value } })
            .done(u => (u ? next('Email in use') : next()));
        },
      },
      set(e) {
        this.setDataValue('email', e.toLowerCase().trim());
      },
    },
    access: {
      type: DataTypes.ENUM('Master', 'Admin', 'Employee'),
      allowNull: false,
      validate: {
        isIn: [['Master', 'Admin', 'Employee']],
      },
    },
    accessPin: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    picture: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    resetToken: DataTypes.STRING,
    language: {
      type: DataTypes.ENUM('en', 'es'),
      allowNull: false,
      validate: {
        isIn: [['en', 'es']],
      },
    },
    password: DataTypes.STRING,
    lastActivity: DataTypes.DATE,
  }, { paranoid: true });

  User.associate = (models) => {
    User.belongsTo(models.Factory, {
      foreignKey: 'factoryId',
      as: 'factory',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.ActionPlan, {
      foreignKey: 'createdBy',
      as: 'createdActionPlans',
    });
    User.hasMany(models.ActionPlan, {
      foreignKey: 'completedBy',
      as: 'completedActionPlans',
    });
    User.hasMany(models.Message, {
      foreignKey: 'to',
      as: 'sentMessages',
    });
    User.hasMany(models.Message, {
      foreignKey: 'from',
      as: 'receivedMessages',
    });
    User.hasMany(models.Score, {
      foreignKey: 'userId',
      as: 'scores',
    });
    User.hasMany(models.SupportMessage, {
      foreignKey: 'from',
      as: 'sentSupportMessages',
    });
  };

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
