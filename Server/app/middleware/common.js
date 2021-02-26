var formidable = require('formidable')
var { loadjson } = require('../utils')
// 上传js文件api
const upload_file = async (req, res, next)=>{
  var form = new formidable.IncomingForm()
  form.encoding = 'utf-8' // 编码
  await form.parse(req, async (err, fields, files) => {
    let data = await loadjson(files.file.path)
    if(data) {
      req.result = {
        id: fields.id,
        data: data
      } 
      next()
    }
    if(err) {
      res.json({ code: 400, message: err,})
    }
  })
}
module.exports = {
  upload_file
}
