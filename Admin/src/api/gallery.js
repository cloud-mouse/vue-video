import request from '@/utils/request'

export const galleryApi = {
  // 路由表
  getList(params) {
    return request({
      url: '/admin-api/gallery',
      method: 'get',
      params
    })
  },
  addItem(data) {
    return request({
      url: '/admin-api/gallery',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  },
  deleteImg(params) {
    return request({
      url: '/admin-api/gallery',
      method: 'delete',
      params
    })
  },
  editItem(data) {
    return request({
      url: '/admin-api/gallery',
      method: 'patch',
      data
    })
  }
}

export const galleryClassApi = {
  // 路由表
  getGalleryClass(params) {
    return request({
      url: '/admin-api/gallery/class',
      method: 'get',
      params
    })
  },
  deleteItem(params) {
    return request({
      url: '/admin-api/gallery/class',
      method: 'delete',
      params
    })
  },
  addItem(data) {
    return request({
      url: '/admin-api/gallery/class',
      method: 'post',
      data
    })
  },
  editItem(data) {
    return request({
      url: '/admin-api/gallery/class',
      method: 'patch',
      data
    })
  }
}
