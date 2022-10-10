const { User, Post, HashtagPost } = require('../models'); //อันนี้ import model ใน sequelize
const { post } = require('../routes/authRoutes');
const AppError = require('../utils/appError');
exports.create = async (req, res, next) => {
  try {
    const { userId, topic, context } = req.body;
    // console.log(userId);
    // console.log(topic);
    // console.log(context);
    // console.log(req.body);
    const post = await Post.create({
      userId,
      topic,
      context,
      //   postImgUrl,
    });
    res.status(200).json({ message: 'kuy' }); //ส่งกลับให้หน้าบ้านรู้ ว่าสำเร็จหรือไม่
  } catch (err) {
    next(err);
  }
};

//vvv เอาโพสทั้งหมด มาเพื่อโชว์ในหน้า จาก DB
exports.getPost = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: HashtagPost }, { model: User }], //เลือกไว้ได้เฉพาะที่โยงความ สพ พวก has to many
    });

    console.log(posts);
    res.status(200).json({ posts }); //ส่ง posts กลับไป หน้าบ้าน
  } catch (err) {
    next(err);
  }
};

exports.getPostbyId = async (req, res, next) => {
  try {
    // const post = await Post.findOne({ where: { id: req.params.id } });
    //เขียนแบบ async await
    Post.findOne({
      where: { id: req.params.id }, // เปลี่ยนบน path link เป็นเลข id ได้เลย
      attributes: ['topic', 'context', 'id'], //attributes ใช้ในการเลือกตัวใน DB ที่จะส่งไป ใส่เป็น array - string
    }).then((post) => {
      //then ก็ไม่ต้องasync await
      res.status(200).json({ post });
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;
    //ใช้ sequelize หยิบโพส จาก โพส id

    // check ว่าโพสนั้น มี user Id ตรงกับที่ส่งมาไหม ถ้าตรง ให้สั่งลบ
    //by post Id ถ้าไม่ตรง throw Error ไม่ใช่เจ้าของโพส
    const post = await Post.findOne({ userId });
    console.log(post.userId);
    console.log(userId);
    if (userId != post.userId) {
      //!= ตัวเดียวเพราะ String x Int !==
      //key = userId ,,value = post.userId
      throw new AppError('maidai not owner', 400);
    }
    res.status(200).json({ message: 'success delete' });
    await Post.destroy({
      //ทำลายโพส
      where: {
        id: postId,
      }, //key value
    });
  } catch (err) {
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const { userId, postId, topic, context } = req.body; //มาจากสิ่งที่ยิงมาหน้าบ้าน
    const post = await Post.findOne({ userId });
    if (post.userId != userId) {
      throw new AppError('mai trong', 400);
    }
    await post.update(
      { topic, context },
      {
        where: {
          id: postId, // อันแรกตาราง DB , อันสองคือ postId //obj ตัวแรกตัวที่ไปอัพเดท ตัว 2 ตำแหน่งที่อัพ
        }, //what where
      }
    ); //where ระบุที่ ID

    res.status(200).json({ message: 'successs' });
  } catch (err) {
    next(err);
  }
};
