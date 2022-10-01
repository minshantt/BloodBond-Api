module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      topic: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      context: DataTypes.STRING,
      postImgUrl: DataTypes.STRING,
    },
    { underscored: true }
  );

  Post.associate = (db) => {
    Post.belongsTo(db.User, {
      foreignKey: {},
    });
  };

  return Post;
};
