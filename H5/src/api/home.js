import request from '@/utils/request'

export const indexApi = {
  getIndex(params) {
    return request({
      url: '/web-api/getIndex',
      method: 'get',
      params
    })
  }
}
