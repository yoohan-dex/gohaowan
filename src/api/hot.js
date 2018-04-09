import request from '../utils/request';

const add = data =>
  request({
    url: '/app/moments/add',
    method: 'post',
    data,
  });

const list = page =>
  request({
    url: '/app/moments/list',
    method: 'get',
    params: {
      page,
    },
  });
const get = id =>
  request({
    url: '/app/moments/detail',
    method: 'get',
    params: {
      id,
    },
  });
const getOtherList = userId => page =>
  request({
    url: '/app/moments/list',
    method: 'get',
    params: {
      user_id: userId,
      page,
    },
  });
const search = keyword => page =>
  request({
    url: '/app/moments/list',
    method: 'get',
    params: {
      keyword,
      page,
    },
  });
const searchByTag = tag => page =>
  request({
    url: '/app/moments/list',
    method: 'get',
    params: {
      tag_id: tag,
      page,
    },
  });
const upvote = id =>
  request({
    url: '/app/moments/upvote',
    method: 'get',
    params: {
      id,
    },
  });
const del = id =>
  request({
    url: '/app/moments/delete',
    method: 'get',
    params: {
      id,
    },
  });
export default {
  add,
  list,
  get,
  del,
  search,
  searchByTag,
  upvote,
  getOtherList,
};
