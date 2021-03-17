import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/web-api/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/web-api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/web-api/user/info',
    method: 'get',
    params
  })
}

export function updateUser(data) {
  return request({
    url: '/web-api/user/info',
    method: 'patch',
    data
  })
}

export function aboutUs(params) {
  return request({
    url: '/aboutUs',
    method: 'get',
    params
  })
}
