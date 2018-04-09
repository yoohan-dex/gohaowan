const storeModule = {
  state: {
    page: 1,
    list: [],
    activeId: '',
    active: {},
    top: {},
    nav: 'looking',
  },
  mutations: {
    // infoPageIncrement(state, list) {
    //   state.page += 1;
    //   state.list.push(...list);
    // },
    setActiveUser(state, item) {
      state.active = item;
    },
    setActiveUserId(state, id) {
      state.activeId = id;
    },
    // setTop(state, item) {
    //   state.top = item;
    // },
    // setInfoActiveId(state, id) {
    //   state.activeId = id;
    // },
    setUserFollow(state, id) {
      // state.list.forEach((v) => {
      //   if (v.id === id) {
      //     v.is_follow = true;
      //     v.follow_count += 1;
      //   }
      // });
      if (state.active.id === id) {
        state.active.is_follow = true;
        state.active.follow_count += 1;
      }
    },
    setUserUnfollow(state, id) {
      // state.list.forEach((v) => {
      //   if (v.id === id) {
      //     v.is_follow = false;
      //     v.follow_count -= 1;
      //   }
      // });
      if (state.active.id === id && state.active.is_follow) {
        state.active.is_follow = false;
        state.active.follow_count -= 1;
      }
    },
    setUserNav(state, nav) {
      state.nav = nav;
    },
  },
  actions: {
    // async getInformationList({ commit, state }) {
    //   const res = await api.get(state.page);
    //   const list = res.data.map(v => ({
    //     ...v,
    //     add_time: moment(v.add_time * 1000).format('YYYY-MM-DD HH:MM'),
    //   }));
    //   if (state.page === 1) {
    //     commit('setTop', list[0]);
    //   }
    //   commit('infoPageIncrement', list.slice(1));
    // },
    // async getStoreDetail({ commit }, { id }) {
    //   commit('setActiveStoreId', id);
    //   const res = await api.getDetail(id);
    //   const item = res.data;
    //   item.add_time = moment(item.add_time * 1000).format('YYYY-MM-DD HH:MM');
    //   item.images = item.head_images;
    //   commit('setActiveStore', item);
    // },
  },
};

export default storeModule;
