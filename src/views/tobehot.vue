<template>
  <div class="wrap">
    <div class="form">
      <div class="item">
        <label for="">真实姓名</label>
        <input type="text" v-model="form.real_name">
      </div>
      <div class="item">
        <label for="">微信号</label>
        <input type="text" v-model="form.wx_account">
      </div>
      <div class="item">
        <label for="">昵称/艺名</label>
        <input type="text" v-model="form.stage_name">
      </div>
      <div class="item">
        <label for="">特长</label>
        <input type="text" v-model="form.speciality">
      </div>
      <div class="id-item" >
        <div class="id" @click="selectFront">
          <img v-show="!form.idcard_positive" src="../assets/ID.svg" alt="">
          <img v-show="form.idcard_positive" :src="form.idcard_positive" alt="">
          <p>身份证正面照</p>
        </div>
        <div class="id-back" @click="selectBack">
          <img v-show="!form.idcard_opposite" src="../assets/IDback.svg" alt="">
          <img v-show="form.idcard_opposite" :src="form.idcard_opposite" alt="">
          <p>身份证反面照</p>
        </div>
      </div>
    </div>
    <button @click="handleAction">
      提交
    </button>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import apiwx from '../api/wx';
import api from '../api/user';
// import { MessageBox } from 'mint-ui';
// import api from '../api/mgr';

export default {
  name: 'mgr-login',

  data() {
    return {
      form: {
        real_name: '',
        wx_account: '',
        speciality: '',
        stage_name: '',
        idcard_positive: '',
        idcard_opposite: '',
      },
      isReady: false,
    };
  },
  updated() {
    this.checkReady();
  },
  methods: {
    uploadImage(func) {
      const setImage = func.bind(this);
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: async res1 => {
              const serverId = res1.serverId; // 返回图片的服务器端ID
              const response = await apiwx.uploadImage(serverId);
              setImage(response.data);
              this.checkReady();
            },
          });
        },
      });
    },
    selectFront() {
      this.uploadImage(image => {
        this.form.idcard_positive = image;
      });
    },
    selectBack() {
      this.uploadImage(image => {
        this.form.idcard_opposite = image;
      });
    },
    checkReady() {
      let isReady = true;
      Object.keys(this.form).forEach(v => {
        if (!this.form[v]) {
          isReady = false;
        }
      });
      if (isReady) {
        this.isReady = true;
      }
    },
    async handleAction() {
      if (this.isReady) {
        try {
          await api.tobehot(this.form);
          this.$router.replace({
            name: 'Submit-success',
          });
        } finally {
          // ...
        }
      } else {
        alert('请填上所有信息'); // eslint-disable-line no-alert
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: absolute;
  width: 100%;
  padding: 50px 30px 0;
  background: #f2f2f2;
}
.form {
  display: block;
  width: 100%;

  .item {
    display: block;
    margin-bottom: 10px;
    label {
      display: block;
      color: #666;
      margin-bottom: 3px;
    }
    input {
      display: block;
      width: 100%;
      border: 0;
      padding: 10px 5px;
      background: white;
      border-radius: 5px;
      outline-style: none;
    }
  }
}
.id-item {
  background: white;
  padding: 15px 12px;
  margin-top: 15px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  & :nth-child(1) {
    margin-right: 20px;
  }
  img {
    width: 100%;
  }
  p {
    text-align: center;
    color: #666;
  }
}
button {
  width: 80%;
  margin: 50px 10%;
  background: #fdda06;
  padding: 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
}
</style>


