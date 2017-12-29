import moment from 'moment';
import api from '../../api/activity';

const activityModule = {
  state: {
    page: 1,
    pageSize: 6,
    list: [],
    activeId: '',
    active: {},
  },
  getters: {},
  mutations: {
    pageIncrement(state, list) {
      state.page += 1;
      state.list.push(...list);
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
  },
  actions: {
    async getList({ commit, state }) {
      const res = await api.getActivityList(state.page, state.pageSize);
      commit('pageIncrement', res.data);
    },
    async getDetail({ commit }, { id }) {
      commit('setActiveId', id);
      const res = await api.getActivityDetail(id);
      const item = res.data;
      item.images = item.images.split(',');
      console.log(moment(item.start_time).format('YYYY-MM-DD'));
      item.start_time = moment(item.start_time).format('YYYY-MM-DD');
      item.end_time = moment(item.end_time).format('YYYY-MM-DD');
      item.end_join_time = moment(item.end_join_time).format('YYYY-MM-DD');
      item.join_form = JSON.parse(item.join_form);
      commit('setActive', item);
    },
  },
};

export default activityModule;
