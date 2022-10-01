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
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    });

    Post.hasMany(db.HashtagPost, {
      foreginKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    });
  };

  return Post;
};
