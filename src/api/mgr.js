import request from '../utils/request';

const login = data =>
  request({
    url: '/store/login/login',
    method: 'post',
    data,
  });
const getInfo = () =>
  request({
    url: '/store/store/detail',
    method: 'get',
  });
const getActivities = (page, title) =>
  request({
    url: '/store/activity/list-outline',
    method: 'get',
    params: {
      page,
      title,
    },
  });
const getActivityDetail = id =>
  request({
    url: '/store/activity/detail',
    method: 'get',
    params: {
      id,
    },
  });
const getPlayers = (page, id) =>
  request({
    url: '/store/activity/join-list',
    method: 'get',
    params: {
      page,
      id,
    },
  });
const verify = str =>
  request({
    url: '/store/activity/verify-order',
    method: 'get',
    params: {
      order_sn: str,
    },
  });
const getOrder = str =>
  request({
    url: '/store/order/order-info',
    method: 'get',
    params: {
      order_sn: str,
    },
  });
const outlet = id =>
  request({
    url: '/store/activity/activity-outline',
    method: 'get',
    params: {
      id,
    },
  });
const logout = () =>
  request({
    url: '/store/login/logout',
    method: 'get',
  });
export default {
  outlet,
  login,
  getInfo,
  getActivities,
  getActivityDetail,
  getPlayers,
  verify,
  getOrder,
  logout,
};
