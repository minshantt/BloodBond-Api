const AppError = require('../utils/appError');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private', {
    expiresIn: process.env.JWT_EXPIRES || '1d',
  });

exports.register = async (req, res, next) => {
  try {
    const {
      password,
      confirmPassword,
      firstName,
      lastName,
      birthDate,
      nationId,
      address,
      nationality,
      ethnicity,
      bloodType,
      phoneNum,
      email,
      confirmEmail,
      gender,
      weight,
      status,
    } = req.body;

    if (!email) {
      throw new AppError('email is required', 400);
    }
    if (!password) {
      throw new AppError('password is required', 400);
    }
    //ถ้าพาสเวิร์ดไม่เหมือนกัน
    if (password !== confirmPassword) {
      throw new AppError('password did not match', 400);
    }
    if (email !== confirmEmail) {
      throw new AppError('email did not match', 400);
    }
    //ใช้ Lib Validator Js (npm i validator)

    const isEmail = validator.isEmail(email + '');
    const isPhoneNum = validator.isMobilePhone(phoneNum + '');
    //เขียนแบบนี้ได้ไหม ถ้าไม่ใช่อีเมช์ (command validator) จะขึ้น Invalid Email
    if (!isEmail) {
      throw new AppError('invalid email', 400);
    }
    if (!isPhoneNum) {
      throw new AppError('invalid phone number', 400);
    }

    //ใช้ Lib bcrypt js  ในการ Hash Password  และใช้ Jwt  สร้าง Token (npmi bcryptjs jsonwebtoken)
    const hashedPassword = await bcrypt.hash(password, 12); //<< 12 is ???

    //import ข้อมูล User อ้างอิงจาก Models folders
    const user = await User.create({
      password: hashedPassword,
      firstName,
      lastName,
      birthDate,
      nationId,
      address,
      nationality,
      ethnicity,
      bloodType,
      phoneNum: isPhoneNum ? phoneNum : null,
      email: isEmail ? email : null, //เขียนแบบนี้ได้ไหม
      gender,
      weight,
      status,

      //เขียนเสร็จ ก็จะได้ Token แล้วก็ต้องส่ง Token ออกไป
    });
    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    const isCorrect = await bcrypt.compare(password, user.password);
    // console.log(user);
    // console.log(isCorrect);
    if (!isCorrect) {
      throw new AppError('email or password is Invalid', 400);
    }
    const token = genToken({ id: user.id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
