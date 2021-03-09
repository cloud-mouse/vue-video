import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function loginDev(data) {
  return request({
    url: '/user/loginDev',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function checkLogin(data) {
  return request({
    url: '/user/checkLogin',
    method: 'post',
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
