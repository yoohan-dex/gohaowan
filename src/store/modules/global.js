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
    setUserNameAndSex(state, { nickname, sex }) {
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
      if (res.code === 10030) {
        location.assign('http://ghw.work2pix.top/app/login/wx-code');
      } else if (res.code === 10031) {
        $router.replace({ name: 'Bind-phone' });
      } else {
        console.log('user', res.data);
        commit('setUser', res.data);
      }
    },
    // async getValid({state}) {
    //   await api.validCode(state.phone)
    // }
  },
};

export default globalModule;
