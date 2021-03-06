import moment from 'moment';
import api from '../../api/information';

const informationModule = {
  state: {
    page: 1,
    list: [],
    activeId: '',
    active: '',
    top: '',
    pending: false,
  },
  mutations: {
    infoPageIncrement(state, list) {
      state.page += 1;
      state.list.push(...list);
    },
    setActiveInfo(state, item) {
      state.active = item;
    },
    setTop(state, item) {
      state.top = item;
    },
    setInfoActiveId(state, id) {
      state.activeId = id;
    },
    setInformationPending(state, pending) {
      state.pending = pending;
    },
  },
  actions: {
    async getInformationList({ commit, state }) {
      if (!state.pending) {
        commit('setInformationPending', true);
        try {
          const res = await api.get(state.page);
          const list = res.data.map(v => ({
            ...v,
            add_time: moment(v.add_time * 1000).format('YYYY-MM-DD HH:MM'),
          }));
          if (state.page === 1) {
            commit('setTop', list[0]);
          }
          commit('infoPageIncrement', list.slice(1));
        } finally {
          commit('setInformationPending', false);
        }
      }
    },
    async getInformationDetail({ commit, state }, { id }) {
      commit('setInfoActiveId', id);
      const res = await api.getDetail(id);
      const item = res.data;
      item.add_time = moment(item.add_time * 1000).format('YYYY-MM-DD HH:MM');
      commit('setActiveInfo', item);
    },
  },
};

export default informationModule;
