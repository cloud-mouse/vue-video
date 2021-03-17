// import Cookies from 'js-cookie'

const TokenKey = 'movie-token'
const UserKey = 'movie-user-id'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getUserId() {
  return localStorage.getItem(UserKey)
}

export function setUserId(id) {
  return localStorage.setItem(UserKey, id)
}

export function removeUserId() {
  return localStorage.removeItem(UserKey)
}
