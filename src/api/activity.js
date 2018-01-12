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
    url: '/app/activity/detail',
    method: 'get',
    params: {
      id,
    },
  });

const getSearchHistory = () =>
  request({
    url: '/app/search/search-history',
    method: 'get',
  });

const search = (text, page) =>
  request({
    url: '/app/search/search',
    method: 'get',
    params: {
      keyword: text,
      page,
    },
  });

const action = (id, form) =>
  request({
    url: '/app/activity/join',
    method: 'post',
    data: {
      activity_id: id,
      join_form: form,
    },
  });
const pay = id =>
  request({
    url: '/app/order/pay',
    method: 'get',
    params: {
      id,
    },
  });
export default {
  getActivityDetail,
  getActivityList,
  getSearchHistory,
  search,
  action,
  pay,
};
