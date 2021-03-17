import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: '/web-api/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
