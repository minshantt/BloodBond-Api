const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        '' +
        Math.round(Math.random() * 1000000000) +
        '.' +
        file.mimetype.split('/')[1]
    );
  },
});

module.exports = multer({ storage });

//ยิงจากหน้าบ้าน มี req ที่ หลาย type ถ้ามีรูป คือ multi part -form data

//xx ww form ธรรมดา
