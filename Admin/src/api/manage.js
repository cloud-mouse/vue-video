import request from '@/utils/request'

export const rolesApi = {
  // 路由表
  authorityList(params) {
    return request({
      url: '/admin-api/permission',
      method: 'get',
      params
    })
  },
  /**
   * 添加角色
   * @param {} data
   */
  addRole(data) {
    return request({
      url: '/admin-api/role',
      method: 'post',
      data
    })
  },
  /**
   * 添加角色
   * @param {} data
   */
  editRole(data) {
    return request({
      url: '/admin-api/role',
      method: 'patch',
      data
    })
  },

  /**
   * 角色列表
   * @param {} params
   */
  roleList(params) {
    return request({
      url: '/admin-api/role',
      method: 'get',
      params
    })
  },
  /**
   * 角色详情
   * @param {_id} params
   */
  roleDetail(params) {
    return request({
      url: '/admin-api/role',
      method: 'get',
      params
    })
  },
  /**
   * 删除角色
   * @param {_id} data
   */
  delRole(params) {
    return request({
      url: '/admin-api/role',
      method: 'delete',
      params
    })
  }

}

// 管理员管理接口
export const adminApi = {
  // 获取管理员列表
  getAdminList(params) {
    return request({
      url: '/admin-api/admin',
      method: 'get',
      params
    })
  },
  /**
   * 添加管理员
   *
   * @param {*} data
   */
  addAdmin(data) {
    return request({
      url: '/admin-api/admin',
      method: 'post',
      data
    })
  },
  /**
   * 删除管理员
   * @param {*} params
   */
  delAdmin(params) {
    return request({
      url: '/admin-api/admin',
      method: 'get',
      params
    })
  },
  /**
   * 编辑管理员
   *
   * @param {*} data
   */
  editAdmin(data) {
    return request({
      url: '/admin-api/admin',
      method: 'patch',
      data
    })
  }
}

export const permissionApi = {
  // 获取管理员列表
  getList(params) {
    return request({
      url: '/admin-api/permission',
      method: 'get',
      params
    })
  },
  // 新增
  addItem(data) {
    return request({
      url: '/admin-api/permission',
      method: 'post',
      data
    })
  },
  // 修改
  updateItem(data) {
    return request({
      url: '/admin-api/permission',
      method: 'patch',
      data
    })
  },
  // 删除
  deleteItem(params) {
    return request({
      url: '/admin-api/permission',
      method: 'delete',
      params
    })
  }
}
