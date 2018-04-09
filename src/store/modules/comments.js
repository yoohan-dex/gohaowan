import moment from 'moment';
import api from '../../api/comments';

const commentsModule = {
  state: {
    list: {
      activity: [],
      store: [],
      information: [],
      moment: [],
    },
    activeId: '',
    page: {},
    my: [],
    myPage: 0,
  },
  mutations: {
    setComments(state, { type, list }) {
      state.list[type].push(...list);
    },
    resetComments(state, { type, list }) {
      state.list[type] = list;
    },
    setCommentId(state, id) {
      state.activeId = id;
    },
    resetActiveId(state) {
      state.activeId = '';
    },
    setUpvote(state, { type, id }) {
      if (state.list[type]) {
        state.list[type].forEach(v => {
          if (v.id === id) {
            v.upvote += 1;
          }
        });
      }
    },
    setMyComment(state, list) {
      state.my.push(...list);
    },
    setCommentsPage(state, page) {
      state.myPage = page;
    },
  },
  actions: {
    async getCommentsList({ commit, state }, { type, id, page }) {
      const activeId = state.activeId;
      commit('setCommentId', id);
      const res = await api.get(type)(id)(page);
      const list = res.data.map(v => ({
        ...v,
        create_time: moment(v.create_time * 1000).format('YYYY-MM-DD HH:MM'),
      }));
      if (id !== activeId) {
        commit('resetComments', { list, type });
      } else {
        commit('setComments', { list, type });
      }
    },
    async regetCommentsList({ commit, state }, { type, id, page }) {
      commit('setCommentId', id);
      const res = await api.get(type)(id)(page);
      const list = res.data.map(v => ({
        ...v,
        create_time: moment(v.create_time * 1000).format('YYYY-MM-DD HH:MM'),
      }));
      commit('resetComments', { list, type });
    },
    async upvote({ commit, state }, { id, type }) {
      return new Promise(async (resolve, reject) => {
        const res = await api.upvote(id);
        if (res.code === 0) {
          commit('setUpvote', { id, type });
          resolve();
        } else {
          reject(res.message);
        }
      });
    },
    async getMyComments({ commit, state }) {
      commit('setCommentsPage', state.myPage + 1);
      const res = await api.getMy(state.myPage);
      const list = res.data.map(v => ({
        ...v,
        time: moment(v.create_time * 1000).format('YYYY-MM-DD HH:MM'),
        sourceTime: moment(v.relation_time * 1000).format('YYYY-MM-DD HH:MM'),
      }));
      commit('setMyComment', list);
    },
  },
};

export default commentsModule;
