import Vuex from 'vuex';
import Vue from 'vue';
import boats from './modules/boats';
import auth from './modules/auth';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    boats,
    auth,
  }
});