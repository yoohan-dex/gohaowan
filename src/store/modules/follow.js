// import moment from 'moment';
// import wx from 'weixin-js-sdk';
import api from '../../api/follow';

const followType = {
  activity: 'setActivityFollow',
  store: 'setStoreFollow',
  user: 'setUserFollow',
};
const unfollowType = {
  activity: 'setActivityUnfollow',
  store: 'setStoreUnfollow',
  user: 'setUserUnfollow',
};
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
      console.log('state', state);
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
      const res = await api[type](state.page[type], state.pageSize);
      let list;
      if (type !== 'user') {
        list = res.data.map(v => ({
          ...v,
          id: v.relation_id,
        }));
      } else {
        list = res.data;
      }
      commit('followPageIncrement', { type, list });
    },
    async follow({ commit, state, dispatch }, { id, type, cb }) {
      const res = await api.follow(id, type);
      if (res.code === 0) {
        commit(followType[type], id);
        if (cb) {
          cb();
        }
      }
    },
    async unfollow({ commit, state, dispatch }, { id, type, cb }) {
      const res = await api.unfollow(id, type);
      if (res.code === 0) {
        commit(unfollowType[type], id);
        if (cb) {
          cb();
        }
      }
    },
  },
};

export default activityModule;
