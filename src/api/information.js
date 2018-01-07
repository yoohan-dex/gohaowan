import request from '../utils/request';

function get(page) {
  return request({
    url: '/app/information/list',
    method: 'get',
    params: {
      page,
    },
  });
}

function getDetail(id) {
  return request({
    url: '/admin/information/detail',
    method: 'get',
    params: {
      id,
    },
  });
}

export default {
  get,
};
