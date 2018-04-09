import { Indicator } from 'mint-ui';
import api from '../../api/hot';

const hotModule = {
  state: {
    list: [],
    page: 0,
    searchList: [],
    searchPage: 1,
    activeTag: '',
    activeKeyword: '',
    keyword: '',
    pending: false,
    my: [],
    myPage: 0,
    myId: '',
  },
  mutations: {
    setHotList(state, list) {
      state.list.push(...list);
      state.pending = false;
    },
    hotPageInc(state) {
      state.pending = true;
      state.page += 1;
    },
    setMyId(state, id) {
      state.myId = id;
    },
    hotMyPageInc(state) {
      state.pending = true;
      state.myPage += 1;
    },
    setMyHotList(state, list) {
      state.my.push(...list);
      state.pending = false;
    },
    resetHotList(state, list) {
      state.page = 1;
      state.list = list;
    },
    resetMyHotList(state, list) {
      state.myPage = 1;
      state.my = list;
    },
    setHotKeyword(state, keyword) {
      state.keyword = keyword;
    },
    setHotActiveTag(state, tag) {
      state.activeTag = tag;
    },
    setHotActiveKeyword(state, keyword) {
      state.activeKeyword = keyword;
    },
    resetHotSearch(state) {
      state.searchList = [];
      state.keyword = '';
    },
    setHotActiveId(state, id) {
      state.activeId = id;
    },
    searchHotPageIncrement(state, list) {
      state.searchPage += 1;
      state.searchList.push(...list);
    },
    searchHotGet(state, list) {
      state.searchList = list;
      state.searchPage = 2;
    },
    resetMyHot(state) {
      state.myPage = 0;
      state.my = [];
    },
  },
  actions: {
    async getHotSearchNextList({ commit, state }) {
      if (state.activeTag) {
        const res = await api.searchByTag(state.activeTag)(state.searchPage);
        commit('searchHotPageIncrement', res.data);
      } else {
        const res = await api.search(state.activeKeyword)(state.searchPage);
        commit('searchHotPageIncrement', res.data);
      }
    },

    async getHotSearchList({ commit, state }, { type }) {
      if (type === 'tag') {
        const res = await api.searchByTag(state.activeTag)(1);
        commit('searchHotGet', res.data);
      } else {
        commit('setHotActiveTag', '');
        const res = await api.search(state.activeKeyword)(1);
        commit('searchHotGet', res.data);
      }
    },
    async getHotList({ commit, state }) {
      if (!state.pending) {
        commit('hotPageInc');
        const res = await api.list(state.page);
        commit('setHotList', res.data);
      }
    },
    async getMyHotList({ commit, state }, { id }) {
      if (!state.pending) {
        commit('hotMyPageInc');
        commit('setMyId', id);
        const res = await api.getOtherList(id)(state.myPage);
        commit('setMyHotList', res.data);
      }
    },
    async reloadList({ commit }) {
      const res = await api.list(1);
      commit('resetHotList', res.data);
    },
    async reloadMyList({ commit, state }) {
      const res = await api.getOtherList(state.myId)(1);
      commit('resetMyHotList', res.data);
    },
    async deleteHot({ commit, dispatch }, { id }) {
      Indicator.open();
      const res = await api.del(id);
      Indicator.close();
      if (res.code === 0) {
        dispatch('reloadMyList');
        dispatch('reloadList');
      }
    },
  },
};

export default hotModule;
