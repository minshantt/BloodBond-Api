const User = require('./User');

module.exports = (sequelize, DataTypes) => {
  const HashtagPost = sequelize.define(
    'HashtagPost',
    {
      postId: DataTypes.STRING,
      hashtagId: DataTypes.STRING,
    },
    { underscored: true }
  );

  HashtagPost.associate = (db) => {
    //รับเส้น 1 to many Post
    HashtagPost.belongsTo(db.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'CASCADE', //ต้องอันนี้ถูกไหม
      onUpdate: 'RESTRICT',
    });

    HashtagPost.hasMany(db.Hashtag, {
      //โยงเส้น many to many อันนี้ถูกไหมอ่าน Doc มีแค่ 4 ตัว
      foreignKey: {
        name: hashtagPostId, //ตั้งแบบนี้ได้ไหม
        allowNull: false,
      },
      onDelete: 'CASCADE',
      ouUpdate: 'RESTRICT',
    });
  };

  return HashtagPost;
};
