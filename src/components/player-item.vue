<template>
  <div class="item">
    <div class="head">
      <img :src="item.headimgurl" alt="">
    </div>
    <div class="message">
      <p>{{item.name}}</p>
      <p>{{item.phone}}</p>
    </div>
    <div class="status">
      {{parseStatus()}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'player-item',
  props: {
    item: Object,
  },
  methods: {
    parseStatus() {
      switch (this.item.status) {
        case 0:
          return '待支付';
        case 1:
          return '未到位';
        case 3:
          return '已签到';
        case 2:
        case 4:
        default:
          return '';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 3px 5px;
  background: white;
  border-bottom: 1px solid #f2f2f2;
}
.head {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin: 5%;
    width: 90%;
  }
}
.message {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 0;
  }
}
.status {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


