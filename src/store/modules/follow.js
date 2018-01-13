import moment from 'moment';
import wx from 'weixin-js-sdk';
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

    async getDetail({ commit }, { id }) {
      commit('setActiveId', id);
      const res = await api.getActivityDetail(id);
      const item = res.data;
      item.images = item.images.split(',');
      item.start_time = moment(item.start_time * 1000).format('YYYY-MM-DD');
      item.end_time = moment(item.end_time * 1000).format('YYYY-MM-DD');
      item.end_join_time = moment(item.end_join_time * 1000).format(
        'YYYY-MM-DD',
      );
      item.join_form = JSON.parse(item.join_form);
      commit('setActive', item);
    },
    async action({ commit, state }) {
      const { id, join_form } = state.active;
      const form = {};
      join_form.forEach((v) => {
        form[v.key] = v.value;
      });
      const res = await api.action(id, form);
      if (res.code === 0) {
        if (res.data.need_pay) {
          const response = await api.pay(res.data.id);
          if (response.code === 0) {
            console.log(response);
            const { timestamp, nonceStr, signType, signature } = response.data;
            wx.chooseWXPay({
              timestamp,
              nonceStr,
              signType,
              signature,
              package: response.data.package,
              success() {
                alert('支付成功');
              },
            });
          }
        }
      }
    },
  },
};

export default activityModule;
