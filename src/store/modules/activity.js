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
    comments: [],
    commentPage: 1,
    activeTag: '',
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
    resetSearch(state) {
      state.searchList = [];
      state.keyword = '';
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
    setActiveTag(state, tag) {
      state.activeTag = tag;
    },
    setActiveKeyword(state, keyword) {
      state.activeKeyword = keyword;
    },
    setComments(state, list) {
      state.comments.push(...list);
      state.commentPage += 1;
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
        if (v.id === id && v.is_follow) {
          v.follow_count -= 1;
          v.is_follow = false;
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
      if (state.activeTag) {
        const res = await api.searchByTag(state.activeTag)(state.searchPage);
        commit('searchPageIncrement', res.data);
      } else {
        const res = await api.search(state.activeKeyword, state.searchPage);
        commit('searchPageIncrement', res.data);
      }
    },

    async getSearchList({ commit, state }, { type }) {
      if (type === 'tag') {
        const res = await api.searchByTag(state.activeTag)(1);
        commit('searchGet', res.data);
      } else {
        commit('setActiveTag', '');
        const res = await api.search(state.activeKeyword, 1);
        commit('searchGet', res.data);
      }
    },
    // async getCommentsList({ commit, state }) {
    //   const res = await api.getComm(state.activeId, state.commentPage);
    //   const list = res.data.map(v => ({
    //     ...v,
    //     create_time: moment(v.create_time * 1000).format('YYYY-MM-DD HH:MM'),
    //   }));
    //   commit('setComments', list);
    // },
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
      item.join_form = item.join_form ? JSON.parse(item.join_form) : [];
      commit('setActive', item);
    },
    async action({ commit, state }, { router }) {
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
            const { timeStamp, nonceStr, signType, paySign } = response.data;
            wx.chooseWXPay({
              debug: true,
              timestamp: timeStamp,
              nonceStr,
              signType,
              paySign,
              package: response.data.package,
              success() {
                router.go(-3);
                setTimeout(() => {
                  router.push({
                    name: 'Ticket-detail',
                    params: { id: res.data.id },
                  });
                }, 20);
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
