module.exports = (err, req, res, next) => {
  console.log(err);

  //ถ้าวาลิเดทเอเร้อ ส่ง 400 แทน 500  //ถ้า unique ซ้ำส่ง 400
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    err.statusCode = 400;
    err.message = err.errors[0].message; //ดึงค่า array index 0 จาก error ma = validation error item message
  }
  res.status(err.statusCode || 500).json({ message: err.message });
};
