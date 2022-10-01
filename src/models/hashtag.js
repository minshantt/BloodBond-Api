module.exports = (sequelize, Datatypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      name: {
        type: Datatypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Hashtag.associate = (db) => {
    //รับเส้น many To many HastagPost <=> Hashtag
    Hashtag.belongsToMany(db.HashtagPost, {
      foreignKey: {
        name: 'hashtagId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    });
  };
  return Hashtag;
};
