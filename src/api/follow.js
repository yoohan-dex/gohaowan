import request from '../utils/request';

const getUserList = (page, pageSize) =>
  request({
    url: '/app/follow/user-list',
    method: 'GET',
    params: {
      page,
      pageSize,
    },
  });
const getActivityList = (page, pageSize) =>
  request({
    url: '/app/follow/activity-list',
    method: 'GET',
    params: {
      page,
      pageSize,
    },
  });
const getStoreList = (page, pageSize) =>
  request({
    url: '/app/follow/store-list',
    method: 'GET',
    params: {
      page,
      pageSize,
    },
  });
const follow = (id, type) => {
  const numtype = type === 'user' ? 3 : type === 'store' ? 2 : 1; // eslint-disable-line no-nested-ternary
  return request({
    url: '/app/follow/follow',
    method: 'post',
    data: {
      relation_id: id,
      type: numtype,
    },
  });
};
const unfollow = (id, type) => {
  const numtype = type === 'user' ? 3 : type === 'store' ? 2 : 1; // eslint-disable-line no-nested-ternary
  return request({
    url: '/app/follow/cancel-follow',
    method: 'get',
    params: {
      relation_id: id,
      type: numtype,
    },
  });
};

const fans = id => page =>
  request({
    url: '/app/follow/fans-list',
    method: 'get',
    params: {
      user_id: id,
      page,
    },
  });

const follower = id => page =>
  request({
    url: '/app/follow/user-list',
    method: 'get',
    params: {
      user_id: id,
      page,
    },
  });

export default {
  activity: getActivityList,
  store: getStoreList,
  user: getUserList,
  follow,
  unfollow,
  fans,
  follower,
};
