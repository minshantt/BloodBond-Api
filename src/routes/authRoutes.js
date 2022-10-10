const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register); //เส้นทางลิ้งของแต่ละหน้า
router.post('/login', authController.login);

module.exports = router;
