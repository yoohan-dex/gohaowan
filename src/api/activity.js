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

export default {
  getActivityDetail,
  getActivityList,
  getSearchHistory,
  search,
};
