import api from '../../api/wx';

const globalModule = {
  state: {
    nav: 0,
    user: '',
    phone: '',
    name: '',
    sex: 0,
    followNav: 0,
  },
  mutations: {
    setNav(state, nav) {
      state.nav = nav;
    },
    setPhone(state, phone) {
      state.phone = phone;
    },
    setInformation(state, { name, sex }) {
      state.name = name;
      state.sex = sex;
    },
    setUserMessage(state, { nickname, sex }) {
      state.name = nickname;
      state.sex = sex;
      state.user.nickname = nickname;
      state.user.sex = sex;
    },
    setUser(state, user) {
      state.user = user;
      state.phone = user.phone;
      state.sex = user.sex;
      state.name = user.nickname;
    },
  },
  actions: {
    async getUserInfo({ commit }, $router) {
      const res = await api.getInfo();
      const isAdmin = location.href.split('#')[1].indexOf('mgr-') !== -1;
      if (res.code === 10030) {
        if (window.whatdevice && window.whatdevice.isWechat && !isAdmin) {
          location.replace(
            `${
              process.env.BASE_API ? process.env.BASE_API : ''
            }/app/login/wx-code?url=${encodeURIComponent(location.href)}`,
          );
        } else { //
        }
      } else if (res.code === 10031) {
        // commit('setUser', res2.data);
        // const res2 = await api.getInfo();
        $router.replace({ name: 'Bind-phone' });
      } else {
        commit('setUser', res.data);
        if ($router.goIndex) {
          $router.$router.replace({ name: 'Index' });
        }
      }
    },
    // async getValid({state}) {
    //   await api.validCode(state.phone)
    // }
  },
};

export default globalModule;
