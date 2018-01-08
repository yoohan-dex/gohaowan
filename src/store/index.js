import Vue from 'vue';
import Vuex from 'vuex';
import activity from './modules/activity';
import information from './modules/information';
import global from './modules/global';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    activity,
    information,
    global,
  },
});

export default store;
