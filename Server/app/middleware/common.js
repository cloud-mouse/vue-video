
const multer = require('multer')
var uploadPath = './public/uploads/' + new Date().toISOString().slice(0, 10).replace(/-/g, '')
// 图片上传
let upload = multer({
  storage: multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cb) {
      var temp = file.originalname.split('.');
      var fileType = temp[temp.length - 1];
      var lastName = '.' + fileType;
      // 构建图片名
      var fileName = Date.now() + lastName;
      cb(null, fileName);
    }
  })
})

module.exports = {
  upload
}
