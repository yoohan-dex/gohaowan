import request from '../utils/request';

const get = id =>
  request({
    url: '/app/user/other-detail',
    method: 'get',
    params: {
      user_id: id,
    },
  });
const edit = data =>
  request({
    url: '/app/user/edit',
    method: 'post',
    data,
  });

const activityJoined = id => page =>
  request({
    url: '/app/activity/join-list',
    method: 'get',
    params: {
      activity_id: id,
      page,
    },
  });
const storeJoined = id => page =>
  request({
    url: '/app/store/join-list',
    method: 'get',
    params: {
      store_id: id,
      page,
    },
  });
const tobehot = data =>
  request({
    url: '/app/hot-user/apply',
    method: 'post',
    data,
  });
export default {
  get,
  edit,
  joined: {
    activity: activityJoined,
    store: storeJoined,
  },
  tobehot,
};
