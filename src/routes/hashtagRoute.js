const express = require('express');

const hashtagController = require('../controllers/hashtagController');

const router = express.Router();

const upload = require('../middlewares/upload'); //middleware multer ใช้อัพรูป

router.get('/gethashtag', hashtagController.getHashtag);

module.exports = router;
