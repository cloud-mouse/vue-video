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
      data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
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

// 影视管理接口
export const videoApi = {
  // 获取影视列表
  getList(params) {
    return request({
      url: '/admin-api/movie',
      method: 'get',
      params
    })
  },
  /**
   * 添加影视
   *
   * @param {*} data
   */
  addItem(data) {
    return request({
      url: '/admin-api/movie',
      method: 'post',
      data
    })
  },
  /**
   * 删除影视
   * @param {*} params
   */
  deleteItem(params) {
    return request({
      url: '/admin-api/movie',
      method: 'delete',
      params
    })
  },
  /**
   * 编辑影视
   *
   * @param {*} data
   */
  updateItem(data) {
    return request({
      url: '/admin-api/movie',
      method: 'patch',
      data
    })
  }
}

// 剧集管理接口
export const videoEpisodesApi = {
  // 获取剧集列表
  getList(params) {
    return request({
      url: '/admin-api/movieEpisodes',
      method: 'get',
      params
    })
  },
  /**
   * 添加剧集
   *
   * @param {*} data
   */
  addItem(data) {
    return request({
      url: '/admin-api/movieEpisodes',
      method: 'post',
      data
    })
  },
  /**
   * 删除剧集
   * @param {*} params
   */
  deleteItem(params) {
    return request({
      url: '/admin-api/movieEpisodes',
      method: 'delete',
      params
    })
  },
  /**
   * 编辑剧集
   *
   * @param {*} data
   */
  updateItem(data) {
    return request({
      url: '/admin-api/movieEpisodes',
      method: 'patch',
      data
    })
  }
}
