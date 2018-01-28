import Vue from 'vue';
import Vuex from 'vuex';
import activity from './modules/activity';
import information from './modules/information';
import global from './modules/global';
import follow from './modules/follow';
import store from './modules/store';
import user from './modules/user';
import comments from './modules/comments';
import detail from './modules/detail';
import hot from './modules/hot';

Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    activity,
    information,
    global,
    follow,
    store,
    user,
    comments,
    detail,
    hot,
  },
});

export default Store;
