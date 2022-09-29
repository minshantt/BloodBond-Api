module.exports = (sequelize, DataTypes) => {
  const HashtagPost = sequelize.define(
    'HashtagPost',
    {
      postId: DataTypes.STRING,
      hashtagId: DataTypes.STRING,
    },
    { underscored: true }
  );

  return HashtagPost;
};
