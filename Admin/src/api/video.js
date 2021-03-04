import request from '@/utils/request'

export const videoClassApi = {
  // 获取列表
  getList(params) {
    return request({
      url: '/admin-api/movieClass',
      method: 'get',
      params
    })
  },
  // 新增
  addItem(data) {
    return request({
      url: '/admin-api/movieClass',
      method: 'post',
      data
    })
  },
  // 修改
  updateItem(data) {
    return request({
      url: '/admin-api/movieClass',
      method: 'patch',
      data
    })
  },
  // 删除
  deleteItem(params) {
    return request({
      url: '/admin-api/movieClass',
      method: 'delete',
      params
    })
  }
}
