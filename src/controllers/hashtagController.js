const { Hashtag } = require('../models');

const AppError = require('../utils/appError');

//ส่ง hashtag กลับไปหน้าบ้าน
exports.getHashtag = async (req, res, next) => {
  try {
    const hashtags = await Hashtag.findAll();
    console.log(hashtags, hashtags.length);
    res.status(200).json({ hashtags, total: hashtags.length }); //key value of obj, (obj total.hashtag.le)
  } catch (err) {
    next(err);
  }
};
