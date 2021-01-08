import Vuex from 'vuex';
import Vue from 'vue';
import boats from './modules/boats';
import auth from './modules/auth';
import rentals from './modules/rentals';
import settings from './modules/settings';
import ports from './modules/ports';

// Load Vuex
Vue.use(Vuex);
Vue.config.devtools = true;

// Create store
export default new Vuex.Store({
  modules: {
    boats,
    auth,
    rentals,
    ports,
    settings
  }
});