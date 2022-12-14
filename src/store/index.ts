import { createStore, Store } from 'vuex'

// moduls
import nav from './modules/nav'

const store: Store<{}> = createStore({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: { nav }
});

export default store