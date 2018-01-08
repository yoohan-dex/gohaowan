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
        location.assign('http://112.74.25.233:8004/app/login/wx-code');
      } else {
      }
    },
  },
};

export default globalModule;
