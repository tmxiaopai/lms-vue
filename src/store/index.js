import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user";
import menu from "./modules/menu";
import app from "./modules/app";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: user,
    menu: menu,
    app: app
  }
})
