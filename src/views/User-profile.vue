<template>
  <div class="profile-container">
    <div class="top-nav">
    个人资料
  </div>
  <div class="items">
    <div class="item" @click="handleChange">
      <div class="category">
        昵称
      </div>
      <div class="value">
      {{nickname}}
        <img src="../assets/arrow2.svg" alt="">
      </div>
    </div>
    <div class="item" @click="handleHead">
      <div class="category">
        头像
      </div>
      <div class="value">
      <img class="head" :src="head" alt="">
      <img src="../assets/arrow2.svg" alt="">
      </div>
    </div>
    <div class="item">
      <div>选择您的性别</div>
      <div class="sex">
      <div class="option" @click="handleSex(1)">
        <img v-show="sex=== 1" src="../assets/selected.svg" alt="">
        <img v-show="sex=== 2" src="../assets/unselected.svg" alt="">
        男
      </div>
      <div class="option" @click="handleSex(2)">
        <img v-show="sex===2" src="../assets/selected.svg" alt="">
        <img v-show="sex===1" src="../assets/unselected.svg" alt="">
        女
      </div>
    </div>
    </div>
  </div>
  <div class="button-container">
    <button class="next" @click="handleSubmit">保存</button>
  </div>

  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import wx from 'weixin-js-sdk';
import { mapState } from 'vuex';
import apiwx from '../api/wx';
import api from '../api/user';

export default {
  data() {
    return {
      nickname: '',
      sex: 1,
      head: '',
      localId: '',
      headimgurl: '',
      headChange: false,
    };
  },
  mounted() {
    this.ini();
  },
  computed: {
    ...mapState({
      user: state => state.global.user,
    }),
  },
  methods: {
    ini() {
      this.sex = this.user.sex;
      this.nickname = this.user.nickname;
      this.head = this.user.headimgurl;
    },
    handleSex(sex) {
      this.sex = sex;
    },
    async handleSubmit() {
      const user = {
        nickname: this.nickname,
        sex: this.sex,
        headimgurl: this.headimgurl,
      };
      if (user.nickname.length < 3 || user.nickname.length > 20) {
        MessageBox.alert('昵称长度需要为3-20');
      } else {
        const res = await api.edit(user);
        if (res.code === 0) {
          this.$store.dispatch('getUserInfo');
          MessageBox.alert('修改成功');
        }
      }
    },
    handleChange() {
      MessageBox.prompt('修改昵称', '请输入新昵称').then(
        ({ value, action }) => {
          if (value && action === 'confirm') {
            this.nickname = value;
          }
        },
      );
    },
    uploadHead() {
      wx.uploadImage({
        localId: this.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: async res => {
          const serverId = res.serverId; // 返回图片的服务器端ID
          const response = await apiwx.uploadImage(serverId);
          this.headimgurl = response.data;
        },
      });
    },
    handleHead() {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          this.localId = localIds[0];
          if (window.whatdevice.isiOS) {
            wx.getLocalImgData({
              localId: this.localId,
              success: response => {
                this.head = response.localData;
              },
            });
          } else {
            this.head = this.localId;
          }
          this.headChange = true;
          this.uploadHead();
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.sex {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.option {
  width: 50%;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
}
.items {
  width: 100%;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px;
    border-bottom: 2px solid #f2f2f2;
    .value > img {
      width: 15px;
      height: 15px;
    }
    .value > .head {
      width: 100px;
      height: 100px;
    }
  }
}
.button-container {
  display: flex;
  justify-content: center;
}
.next {
  width: 250px;
  background: #fdda06;
  border: 0;
  border: 10px;
  height: 45px;
  margin-top: 100px;
  color: #666;
}
.next[disabled] {
  color: white;
  background: #f2f2f2;
}
</style>


