import request from '@/utils/request'

export const member = {
  userList(params) {
    return request({
      url: '/admin-api/member/',
      method: 'get',
      params
    })
  }
}
