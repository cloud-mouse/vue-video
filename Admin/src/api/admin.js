import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin-api/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/admin-api/admin/info',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/admin-api/admin/logOut',
    method: 'post'
  })
}

export function checkLogin() {
  return request({
    url: '/admin-api/admin/checkLogin',
    method: 'get'
  })
}

// 获取验证码
export function getCaptcha(params) {
  return request({
    url: '/admin-api/admin/getCaptcha',
    method: 'get',
    params
  })
}

// 修改密码
export function changePsd(data) {
  return request({
    url: '/admin-api/admin/changePsd',
    method: 'post',
    data
  })
}
