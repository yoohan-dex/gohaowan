import request from '../utils/request';

const parseType = type => // eslint-disable-line no-confusing-arrow
  type === 'activity' // eslint-disable-line no-nested-ternary
    ? 1
    : type === 'store' ? 2 : type === 'information' ? 3 : 4; // eslint-disable-line no-nested-ternary

const get = type => id => page =>
  request({
    url: '/app/comment/comment-list',
    method: 'get',
    params: {
      type: parseType(type),
      id,
      page,
    },
  });
const comment = type => id => content =>
  request({
    url: '/app/comment/comment',
    method: 'post',
    params: {
      type: parseType(type),
      relation_id: id,
      content,
    },
  });
const upvote = id =>
  request({
    url: '/app/comment/upvote',
    method: 'get',
    params: {
      id,
    },
  });
const getMy = page =>
  request({
    url: '/app/comment/my-list',
    method: 'get',
    params: {
      page,
    },
  });
const getOther = id => page =>
  request({
    url: '/app/comment/other-list',
    method: 'get',
    params: {
      user_id: id,
      page,
    },
  });
export default {
  get,
  comment,
  upvote,
  getMy,
  getOther,
};
