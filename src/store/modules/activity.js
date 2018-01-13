import moment from 'moment';
import wx from 'weixin-js-sdk';
import api from '../../api/activity';

const activityModule = {
  state: {
    page: 1,
    pageSize: 6,
    list: [],
    activeId: '',
    active: {},
    scroll: 0,
    searchPage: 2,
    searchList: [],
    keyword: '',
    activeKeyword: '',
  },
  getters: {},
  mutations: {
    setScroll(state, num) {
      state.scroll = num;
    },
    pageIncrement(state, list) {
      state.page += 1;
      state.list.push(...list);
    },
    searchPageIncrement(state, list) {
      state.searchPage += 1;
      state.searchList.push(...list);
    },
    searchGet(state, list) {
      state.searchList = list;
      state.searchPage = 2;
    },
    selectActivity(state, activity) {
      state.activeActivity = activity;
    },
    setActive(state, item) {
      state.active = item;
    },
    setActiveId(state, id) {
      state.activeId = id;
    },
    setForm(state, form) {
      state.active.join_form = form;
    },
    setKeyword(state, keyword) {
      state.keyword = keyword;
    },
    setActiveKeyword(state, keyword) {
      state.activeKeyword = keyword;
    },
    setActivityFollow(state, id) {
      state.list.forEach((v) => {
        if (v.id === id) {
          v.is_follow = true;
          v.follow_count += 1;
        }
      });

      if (state.active.id === id) {
        state.active.is_follow = true;
        state.active.follow_count += 1;
      }
    },
    setActivityUnfollow(state, id) {
      state.list.forEach((v) => {
        if (v.id === id) {
          v.is_follow = false;
          v.follow_count -= 1;
        }
      });
      if (state.active.id === id) {
        state.active.is_follow = false;
        state.active.follow_count -= 1;
      }
    },
  },
  actions: {
    async getList({ commit, state }) {
      const res = await api.getActivityList(state.page, state.pageSize);
      commit('pageIncrement', res.data);
    },
    async getSearchNextList({ commit, state }) {
      const res = await api.search(state.activeKeyword, state.searchPage);
      commit('searchPageIncrement', res.data);
    },
    async getSearchList({ commit, state }) {
      const res = await api.search(state.keyword, 1);
      commit('searchGet', res.data);
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
      console.log(state.active);
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
            const { timestamp, nonceStr, signType, paySign } = response.data;
            wx.chooseWXPay({
              debug: true,
              timestamp,
              nonceStr,
              signType,
              paySign,
              package: response.data.package,
              success() {
                alert('支付成功');
              },
              fail(error) {
                alert('支付失败', error);
              },
            });
          }
        }
      }
    },
  },
};

export default activityModule;
