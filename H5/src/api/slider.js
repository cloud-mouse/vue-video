import request from '@/utils/request'

export const sliderApi = {
  getList(params) {
    return request({
      url: '/web-api/slider',
      method: 'get',
      params
    })
  }
}
