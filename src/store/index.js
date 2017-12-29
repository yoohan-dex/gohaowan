import Vue from 'vue';
import Vuex from 'vuex';
import activity from './modules/activity';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    activity,
  },
});

export default store;
