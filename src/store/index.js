import Vuex from 'vuex';
import Vue from 'vue';
import boats from './modules/boats';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    boats
  }
});