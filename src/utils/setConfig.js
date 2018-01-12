import api from '../api/wx';

const jsApiList = ['chooseWXPay'];
const debug = true;
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
