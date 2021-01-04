import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { CURRENT_STEP, SET_MENU_LIST } from '@/store/mutation-types'
import { STEPS } from '@/config/constant'
import storage from 'store'
import router from '@/router'
import { getRouterNameByStep } from '@/utils/util'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/*
* 根据当前步骤来设置菜单项的disabled属性
* */
function rebuildMenuList (menuList, currentStep) {
  menuList.forEach(menu => {
    const tempStep = getRouterNameByStep(currentStep)
    menu.disabled = true

    menu.children.every(subMenu => {
      if (subMenu.name === tempStep) {
        menu.disabled = false
        return false
      }
      return true
    })
  })

  return menuList
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    menuList: [],
    [CURRENT_STEP]: ''
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      // state.routers = constantRouterMap.concat(routers)
    },
    [SET_MENU_LIST]: (state, payload) => {
      const storageStep = storage.get(CURRENT_STEP)
      const currentStep = payload.currentStep || storageStep || STEPS[0]
      state.currentStep = currentStep
      state.menuList = rebuildMenuList(payload.list, currentStep)
      storage.set(CURRENT_STEP, currentStep)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)

        const routes = accessedRouters.find(item => item.path === '/')
        const menuList = (routes && routes.children) || []
        commit(SET_MENU_LIST, {
          list: menuList
        })
        resolve()
      })
    },
    prevStep ({ commit, state }) {
      let currentStep = state.currentStep
      const index = STEPS.indexOf(currentStep)
      if (index > 0) {
        currentStep = STEPS[index - 1]
        commit(SET_MENU_LIST, {
          list: state.menuList,
          currentStep: currentStep
        })
        router.push({ name: getRouterNameByStep(currentStep) })
      }
    },
    nextStep ({ commit, state }) {
      let currentStep = state.currentStep
      const index = STEPS.indexOf(currentStep)
      if (index < STEPS.length - 1) {
        currentStep = STEPS[index + 1]
        commit(SET_MENU_LIST, {
          list: state.menuList,
          currentStep: currentStep
        })
        router.push({ name: getRouterNameByStep(currentStep) })
      }
    }
  }
}

export default permission
