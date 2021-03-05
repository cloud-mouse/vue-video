import request from '@/utils/request'

export const adsenseApi = {
  /**
   * 获取首页广告位列表
   * @param {* }
   */
  getList(params) {
    return request({
      url: '/admin-api/slider',
      method: 'get',
      params
    })
  },
  /**
   * 添加首页广告位
   * @param {*image_path sort link }
   */
  addItem(data) {
    return request({
      url: '/admin-api/slider',
      method: 'post',
      data
    })
  },
  /**
   * 编辑首页广告位
   * @param {* id image_path sort link }
   */
  updateItem(data) {
    return request({
      url: '/admin-api/slider',
      method: 'patch',
      data
    })
  },
  /**
   * 删除首页广告位
   * @param {*id }
   */
  deleteItem(params) {
    return request({
      url: '/admin-api/slider',
      method: 'delete',
      params
    })
  }
}

export const settingApi = {
  /**
   * 获取设置
   * @param {*} params
   */
  getSetting(params) {
    return request({
      url: '/system/getSetting',
      methods: 'get',
      params
    })
  },
  /**
   * 编辑设置
   * @param {*key value} data
   */
  editSetting(data) {
    return request({
      url: '/system/editSetting',
      method: 'post',
      data
    })
  },
  /**
   * 获取微信配置
   * @param {*} params
   */
  getWxConfig(params) {
    return request({
      url: '/system/getWxConfig',
      methods: 'get',
      params
    })
  },
  /**
   * 保存微信设置
   * @param {*key value} data
   */
  saveWxConfig(data) {
    return request({
      url: '/system/saveWxConfig',
      method: 'post',
      data
    })
  },
  /**
   * 获取店铺配置
   * @param {*} params
   */
  getShopConfig(params) {
    return request({
      url: '/system/getShopConfig',
      methods: 'get',
      params
    })
  },
  /**
   * 保存店铺设置
   * @param {*key value} data
   */
  saveShopConfig(data) {
    return request({
      url: '/system/saveShopConfig',
      method: 'post',
      data
    })
  }

}
