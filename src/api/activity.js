import request from '../utils/request';

const getActivityList = (page, pageSize) =>
  request({
    url: '/app/activity/list',
    method: 'GET',
    params: {
      page,
      pageSize,
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
export default {
  getActivityDetail,
  getActivityList,
};
