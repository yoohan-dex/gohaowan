import api from '../../api/wx';

const globalModule = {
  state: {
    nav: 0,
    user: '',
  },
  mutations: {
    setNav(state, nav) {
      state.nav = nav;
    },
  },
  actions: {
    async getUserInfo() {
      const res = await api.getInfo();
      if (res.code === 10030) {
        // setTimeout(
        // () => location.assign('http://ghw.work2pix.top/app/login/wx-code'),
        // 10000,
        // );
      } else {
      }
    },
  },
};

export default globalModule;
