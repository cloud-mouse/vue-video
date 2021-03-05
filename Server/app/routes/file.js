// 文件上传接口
var express = require('express');
var router = express.Router();
const multer = require('multer')
const fs = require("fs")
const unzipper = require("unzipper")
const checkToken = require('../middleware/checkToken')

// 文件上传 暂存位置
let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/dist');
    },
    filename: function (req, file, cb) {
      var changedName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
      cb(null, changedName);
    }
  })
})

// 将压缩包上传到指定目录
router.post('/uploadFile',checkToken, upload.single('file'), async(req, res, next)=> {
  let filename = './public/uploads/dist/' + req.file.filename  // 拿到文件暂存目录
  try {
    // 开始解压
    fs.createReadStream(filename).on("error",(err) => {
      res.send({
        code: 400,
        meg: "上传失败",
        data: err
      })
    }).on("close",() => {
      // 上传成功  删除暂存目录下的文件
      fs.unlinkSync(filename);
    }).pipe(unzipper.Extract({path: "./views/" + req.body.file_name}));  // 解压到指定目录
  } catch(e) {
    res.send({
      code: 400,
      meg: "上传失败",
      data: e
    })
  }
  res.send({
    code: 200,
    meg: "上传成功"
  })
})

module.exports = router;
