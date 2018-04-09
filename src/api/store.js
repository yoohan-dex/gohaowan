import request from '../utils/request';

const getDetail = id =>
  request({
    url: '/app/store/detail',
    method: 'get',
    params: {
      id,
    },
  });

export default {
  getDetail,
};
