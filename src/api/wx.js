import request from '../utils/request';

function getInfo() {
  return request({
    url: '/app/login/user-info',
    method: 'get',
  });
}

function validCode(phone) {
  return request({
    url: '/app/login/code',
    method: 'get',
    params: {
      phone,
      test: 0,
    },
  });
}
function updateInfo(data) {
  return request({
    url: '/app/user/edit',
    method: 'post',
    data,
  });
}
function bindPhone(data) {
  // phone code
  return request({
    url: '/app/login/reg-phone',
    method: 'post',
    data,
  });
}

function getTag() {
  return request({
    url: '/app/user/tags',
    method: 'get',
  });
}
function setTag(data) {
  return request({
    url: '/app/user/select-tags',
    method: 'post',
    data,
  });
}

function getConfig() {
  return request({
    url: '/app/wx/js-config',
    method: 'get',
  });
}

const uploadImage = id =>
  request({
    url: '/app/wx/get-image',
    method: 'get',
    params: {
      serverId: id,
    },
  });

export default {
  getInfo,
  getTag,
  setTag,
  validCode,
  updateInfo,
  bindPhone,
  getConfig,
  uploadImage,
};
