import request from '../utils/request';

function getInfo() {
  return request({
    url: '/app/login/user-info',
    method: 'get',
  });
}

export default {
  getInfo,
};
