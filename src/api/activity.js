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
const getTags = () =>
  request({
    url: '/app/activity-tag/list',
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

const searchByTag = tagId => page =>
  request({
    url: '/app/search/search-tag',
    method: 'get',
    params: {
      page,
      tag_id: tagId,
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
// const comment = (id, type, content) => {
//   const numtype = type === 'activity' ? 1 : type === 'store' ? 2 : 3;
//   return request({
//     url: '/app/comment/comment',
//     method: 'post',
//     data: {
//       relation_id: id,
//       type: numtype,
//       content,
//     },
//   });
// };
const getComm = (id, page) =>
  request({
    url: '/app/comment/activity-list',
    method: 'get',
    params: {
      id,
      page,
    },
  });
const getMy = page =>
  request({
    url: '/app/activity/my-list',
    method: 'get',
    params: {
      page,
    },
  });
const getOrder = page =>
  request({
    url: '/app/order/list',
    method: 'get',
    params: {
      page,
    },
  });

const getOtherList = id => page =>
  request({
    url: '/app/activity/other-list',
    method: 'get',
    params: {
      user_id: id,
      page,
    },
  });

const getMoment = id => page =>
  request({
    url: '/app/user/dynamic',
    method: 'get',
    params: {
      user_id: id,
      page,
    },
  });

const getOrderDetail = id =>
  request({
    url: '/app/order/order-info',
    method: 'get',
    params: {
      id,
    },
  });

export default {
  getActivityDetail,
  getActivityList,
  getSearchHistory,
  getTags,
  search,
  searchByTag,
  action,
  pay,
  // comment,
  getComm,
  getMy,
  getOrder,
  getOrderDetail,
  getOtherList,
  getMoment,
};
