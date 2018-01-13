// import moment from 'moment';
// import wx from 'weixin-js-sdk';
import api from '../../api/follow';

const activityModule = {
  state: {
    nav: 'user',
    page: {
      activity: 1,
      store: 1,
      user: 1,
    },
    pageSize: 6,
    list: {
      activity: [],
      store: [],
      user: [],
    },
    active: {
      activity: {},
      store: {},
      user: {},
    },
  },
  getters: {},
  mutations: {
    followPageIncrement(state, { type, list }) {
      state.page[type] += 1;
      state.list[type].push(...list);
    },

    setActive(state, { type, item }) {
      state.active[type] = item;
    },
    setActiveId(state, id) {
      state.activeId = id;
    },
    setFollowNav(state, nav) {
      state.nav = nav;
    },
  },
  actions: {
    async getFollowList({ commit, state }, type) {
      const res = api[type](state.page[type], state.pageSize);
      commit('followPageIncrement', { type, list: res.data });
    },
    async follow({ commit, state, dispatch }, { id, type }) {
      const res = await api.follow(id, type);
      if (res.code === 0) {
        commit('setActivityFollow', id);
      }
    },
    async unfollow({ commit, state, dispatch }, { id, type }) {
      console.log('unfollow');
      const res = await api.unfollow(id, type);
      if (res.code === 0) {
        commit('setActivityUnfollow', id);
      }
    },
  },
};

export default activityModule;
