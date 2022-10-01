//yes
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      surName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      nationality: {
        type: DataTypes.ENUM(
          'Asian',
          'American Indian',
          'Alaska Native',
          'African American',
          'Black',
          'White',
          'Native Hawaiian',
          'Pacific Islander'
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      ethnicity: {
        type: DataTypes.ENUM(
          'Asian',
          'American Indian',
          'Alaska Native',
          'African American',
          'Black',
          'White',
          'Native Hawaiian',
          'Pacific Islander'
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM(
          'Married',
          'Widowed',
          'Separated',
          'Divorced',
          'Single'
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneNum: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      profileImg: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  User.associate = (db) => {
    User.hasmany(db.Post, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    });
  };
  return User;
};
