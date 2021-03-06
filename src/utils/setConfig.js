import wx from 'weixin-js-sdk';
import api from '../api/wx';

const jsApiList = [
  'chooseWXPay',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'getLocation',
  'getLocalImgData',
  'scanQRCode',
];
const debug = false;
export default async () => {
  const res = await api.getConfig();
  if (res.code === 0) {
    const { appId, timestamp, nonceStr, signature } = res.data;
    wx.config({
      debug,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList,
    });
  }
};
