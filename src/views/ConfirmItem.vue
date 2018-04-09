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
  
  <div class="total">
    合计: <span>{{item.join_fee}}元</span>
  </div>
  <div class="check-agreement">
    <span class="check-box">
      <input type="checkbox" class="mint-checkbox-input" v-model="read">
      <span class="mint-checkbox-core" @click="handleRead"></span>
    </span>
    <span class="mint-checkbox-label">
      请阅读并同意<span class="light" @click="to('Agreement')">《活动协议》</span>
    </span>
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
  data() {
    return {
      read: true,
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
      if (this.read) {
        this.$store.dispatch('action', { router: this.$router });
      } else {
        MessageBox.alert('需要同意活动协议才可报名');
      }
    },
    handleRead() {
      this.read = !this.read;
    },
    to(name) {
      this.$router.push({ name });
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
  background: #fdda06;
  padding: 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
  margin: 0 10%;
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
.check-agreement {
  text-align: center;
  margin: 50px 0 10px;
}
.light {
  text-decoration: underline;
}
</style>

