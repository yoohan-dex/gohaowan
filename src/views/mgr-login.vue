<template>
  <div class="wrap">
    <div class="form">
      <div class="item">
        <label for="">商户账号</label>
        <input type="text" v-model="form.phone">
      </div>
      <div class="item">
        <label for="">密码</label>
        <input type="password" v-model="form.password">
      </div>
    </div>
    <button @click="handleAction">
      登录
    </button>
  </div>
</template>
<script>
import api from '../api/mgr';

export default {
  name: 'mgr-login',

  data() {
    return {
      form: {
        phone: '',
        password: '',
      },
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    async checkAuth() {
      const res = await api.getActivities(this.page, this.keyword);
      if (res.code === 0) {
        this.toNext();
      }
    },
    toNext() {
      this.$router.replace({ name: 'Mgr-activites' });
    },
    async handleAction() {
      const res = await api.login(this.form);
      if (res.code === 0) {
        this.toNext();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: absolute;
  height: 100%;
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


