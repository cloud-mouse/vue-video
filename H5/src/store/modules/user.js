import { login, register, getInfo } from '@/api/user'
import { getToken, removeToken, setToken, setUserId, removeUserId } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    userInfo: {},
    token: getToken()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_LOGIN_TOKEN: (state, status) => {
    state.token = status
  }
}

const actions = {
  // 用户登录
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { account, password } = data
      login({ account, password }).then(response => {
        const { token, user_id } = response.data
        setToken(token)
        commit('SET_LOGIN_TOKEN', token)
        setUserId(user_id)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户注册
  register({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { account, password } = data
      register({ account, password }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          location.reload()
          reject('验证失败，请重新登录！')
        }
        const { nickName, avatar } = data
        commit('SET_NAME', nickName)
        commit('SET_AVATAR', avatar)
        commit('SET_USERINFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      resetRouter()
      removeToken()
      removeUserId()
      commit('RESET_STATE')
      resolve()
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_LOGIN_TOKEN', '')
      removeToken()
      removeUserId()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

