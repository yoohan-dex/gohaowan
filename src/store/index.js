import Vue from 'vue';
import Vuex from 'vuex';
import activity from './modules/activity';
import information from './modules/information';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    activity,
    information,
  },
});

export default store;
