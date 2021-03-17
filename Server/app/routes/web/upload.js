var express = require('express');
var router = express.Router();
const multer = require('multer')
const { ENV_CONFIG } = require('../../../config')

const checkWebToken = require('../../middleware/checkWebToken')

var uploadPath = './public/uploads/avatar/'
// 图片上传
let upload = multer({
  storage: multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cb) {
      var temp = file.originalname.split('.');
      var fileType = temp[temp.length - 1];
      var lastName = '.' + fileType;
      // 构建图片名
      var fileName = req.user_id + lastName;
      cb(null, fileName);
    }
  })
})

// 图片上传到服务器
router.post('/', checkWebToken, upload.single('file'), async (req, res, next) => {
  // 文件路径
  var imageSrc = `${ENV_CONFIG.URL}/${req.file.path}`
  try {
    let result = {
      name: req.file.filename,
      filename: req.file.filename,
      path: imageSrc,
      path_src: req.file.path,
      type: req.file.mimetype,
    }
    res.send({
      code: 200,
      data: result,
      msg: '上传成功'
    })
  } catch (error) {
    res.send({
      code: 422,
      path: error,
      msg: '上传失败'
    })
  }
})

module.exports = router;
