const mongoose = require('../db/mongodb')

const PermissionSchema = new mongoose.Schema({
  // 名称
  name:{
    type: String,
    unique: true,
    required: true
  },
  // 父id 0表示顶级
  pid: {
    type: String,
    default: '0'
  },
  // 图标
  icon: {
    type: String,
  },
  // 路由
  path: {
    type: String
  },
  // 路由名称
  path_name: {
    type: String
  },
  // 路由组件
  component: {
    type: String
  },
  // 激活的路由菜单
  activeMenu: {
    type: String
  },
  // 是否隐藏，默认显示
  hidden: {
    type: String,
    default: '1'
  },
  // 是否总是显示，模式不  主菜单为是
  alwaysShow: {
    type: String,
    defailt: '0'
  },
  // 排序
  sort: {
    type: String
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Permission', PermissionSchema)
