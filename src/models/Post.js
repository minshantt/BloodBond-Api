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
      tags: DataTypes.STRING,
    },
    { underscored: true }
  );

  return Post;
};
