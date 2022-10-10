const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

const upload = require('../middlewares/upload'); //middleware multer ใช้อัพรูป

router.post('/create', upload.single('postImgUrl'), postController.create); //อันกลางคือ middleware
//ตรงกลาง เอาไว้อ่าน มัลติฟอร์ม หรือว่า multer // image คือ key ที่ส่งไป

router.get('/getpost', postController.getPost); //เปลี่ยนตาม method ตามหน้าที่มัน
//getPost หยิบของทั้งหมดเพื่อโชว์  ไม่ทำ Pagination ทำหน้าเดียว จะต้องรู้ว่า post ทั้งหมดมีกี่อัน

router.get('/getpost', postController.getPost); //เปลี่ยนตาม method ตามหน้าที่มัน

router.get('/:id/getpostbyId', postController.getPostbyId); // ใส่ไอดี ตาม

router.delete('/deletepost', postController.deletePost); //delte post

router.put('/editpost', postController.editPost);
module.exports = router;
