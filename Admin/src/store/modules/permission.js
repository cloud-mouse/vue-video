import { constantRoutes } from '@/router' // 静态路由
import { asyncRouter } from '@/router/asyncRouter' // 动态路由

const permission = {
  state: {
    routers: constantRoutes,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRoutes.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        const userPermission = data
        let accessedRouters = []
        // 先拿到全部的路由
        // 根据角色权限，动态生成新路由
        // 返回一级
        accessedRouters = asyncRouter.filter(item => {
          getChildren(item, userPermission)
          return userPermission.indexOf(item.name) > -1
        })
        // accessedRouters = asyncRouter
        accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTERS', accessedRouters)
        //  reject();
        resolve()
      })
    }

  }
}

const getChildren = (item, userPermission) => {
  if (item.children) {
    item.children = item.children.filter(child => {
      getChildren(child, userPermission)
      return userPermission.indexOf(child.name) > -1
    })
  }
}

export default permission
