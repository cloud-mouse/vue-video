import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin-api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/admin-api/user/info',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/admin-api/user/logOut',
    method: 'post'
  })
}

export function checkLogin() {
  return request({
    url: '/admin-api/user/checkLogin',
    method: 'get'
  })
}

// 获取验证码
export function getCaptcha(params) {
  return request({
    url: '/admin-api/user/getCaptcha',
    method: 'get',
    params
  })
}

// 修改密码
export function changePsd(data) {
  return request({
    url: '/admin-api/user/changePsd',
    method: 'post',
    data
  })
}
