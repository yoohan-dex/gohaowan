<template>
<div class="wrap">
  <div class="message-item">
    <div class="item-title">活动信息</div>
    <div class="item-box">
      <div class="title">{{item.title}}</div>
      <div class="location">{{item.address}}</div>
      <div class="time">{{item.start_time}} - {{item.end_time}}</div>
    </div>

    <div class="item-title">订单信息</div>
    <div class="item-box">
      <div v-for="(obj, i) in item.join_form" :key="i" class="message">
        {{obj.name}}: {{obj.value}}
      </div>
    </div>
  </div>
  <mt-checklist
    v-model="read"
    :options="['请阅读并同意《活动协议》']">
  </mt-checklist>
  <div class="total">
    合计: <span>{{item.join_fee}}元</span>
  </div>
  <button @click="handleAction">
    提交
  </button>
</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      read: [],
    };
  },
  name: 'confirm-item',
  computed: {
    ...mapState({
      item: state => state.activity.active,
    }),
  },
  methods: {
    handleAction() {
      this.$store.dispatch('action', { router: this.$router });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #f2f2f2;
}
* {
  color: #666;
}
.mint-cell {
  background-color: #f2f2f2;
}
.message-item {
  margin: 15px 0;
  width: 100%;
  .item-title {
    margin-top: 5px;
    display: block;
    padding: 0 15px 5px;
  }
  .item-box {
    background: white;
    padding: 17px 15px;

    .title {
      color: #333;
      font-weight: bold;
    }

    .message:nth-child(1) {
      color: #333;
      font-weight: bold;
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
.total {
  color: #666666;
  font-size: 16px;
  text-align: right;
  padding: 17px 15px;
  span {
    font-size: 24px;
    color: #d4504b;
  }
}
</style>

