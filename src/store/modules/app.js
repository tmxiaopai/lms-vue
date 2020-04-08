export default {
  state: {
    collapse: false,//导航栏收缩状态
    menuRouteLoaded: false//菜单是否加载
  },
  getters: {
    collapse(state) {
      return state.collapse
    }
  },
  mutations: {
    onCollapse(state) {
      state.collapse = !state.collapse
    },
    menuRouteLoaded(state, menuRouteLoaded){
      state.menuRouteLoaded = menuRouteLoaded
    }
  }
}

