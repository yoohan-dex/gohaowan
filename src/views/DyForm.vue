<template>
  <div class="wrap">
    <div class="form">
      <div class="item" v-for="(item, key) in form" :key="key">
        <label for="">{{item.name}}</label>
        <input :type="key === 1 ?'number' : 'text'" v-model="item.value">
      </div>
    </div>
    <button @click="handleAction">
      提交
    </button>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { MessageBox } from 'mint-ui';

export default {
  name: 'dy-form',

  computed: {
    ...mapState({
      form: state => state.activity.active.join_form,
    }),
  },
  methods: {
    handleAction() {
      let ok = true;
      this.form.forEach((v, i) => {
        if (!v.value) {
          MessageBox({
            title: '错误',
            message: '请补充完所有报名信息',
          });
          ok = false;
        }
        if (i === 1 && v.value.length < 11) {
          MessageBox({
            title: '错误',
            message: '请填写正确的手机号',
          });
          ok = false;
        }
      });
      if (ok) {
        this.$store.commit('setForm', this.form);
        this.$router.push({
          name: 'Confirm-item',
        });
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


