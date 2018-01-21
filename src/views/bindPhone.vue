<template>
<div class="bind-container">
  <p class="title">首次加入请绑定手机号</p>
  <p class="tip">忘记密码或账号有异常，可以通过手机号寻回账号</p>
  <input type="number" class="phone" placeholder="输入您的手机号码" v-model="phone">
  <div class="options">
    <input type="number" class="valid" v-model="valid">
    <button class="send" @click="sendSms">{{text}}</button>
  </div>
  <button class="next" :disabled="disabled" @click="handleSubmit">下一步</button>
</div>
</template>
<script>
import api from '../api/wx';
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      phone: '',
      count: 60,
      text: '发送验证码',
      valid: '',
    };
  },
  computed: {
    disabled() {
      return !this.phone || !this.valid;
    },
  },
  mounted() {
    if (this.$store.state.global.phone) {
      this.$router.replace({ name: 'User-infomation' });
    }
  },
  methods: {
    async sendSms() {
      if (this.phone.length === 11) {
        await api.validCode(this.phone);
        this.timer = setInterval(() => {
          if (this.count > 0) {
            this.count = this.count - 1;
            this.text = `已发送 ${this.count}s`;
          } else {
            clearInterval(this.timer);
            this.count = 60;
            this.text = '发送验证码';
          }
        }, 1000);
      } else {
        MessageBox.alert('请填正确的手机号码');
      }
    },
    async handleSubmit() {
      const res = await api.bindPhone({ phone: this.phone, code: this.valid });
      if (res.code === 0) {
        this.$store.commit('setStore', this.phone);
        this.$router.replace({ name: 'User-infomation' });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bind-container {
  input,
  button {
    outline: none;
  }
  text-align: center;
  padding: 50px 53px;
  .title {
    font-weight: bold;
    color: #333;
    font-size: 17px;
  }
  .tip {
    color: #666;
    font-size: 13px;
  }
  .phone {
    border: 0;
    border-bottom: 1px solid #f2f2f2;
    padding: 5px 0;
    width: 100%;
  }
  .options {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    input,
    button {
      width: 38%;
      height: 38px;
      border-radius: 5px;
      border: 0;
    }
    input {
      background: #f2f2f2;
      padding: 0 10px;
    }
    button {
      background: #d1d4db;
      color: #999;
      font-size: 13px;
    }
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
}
</style>


