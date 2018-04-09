<template>
<div class="ticket-container">
  <div class="top-nav">
    我的订单
  </div>
  
  <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <li v-for="(item, i) in list" :key="i">
      
  <div class="ticket" @click="handleDetail(item.id)">
    <img v-show="item.status === 0 || item.status === 1 || item.status === 3" src="../assets/ticket.png" alt="">
    <img v-show="item.status === 2 || item.status === 4 " src="../assets/ticket-dead.png" alt="">
    <div class="ticket-message">
      <div class="left">
        <div class="title">{{item.title}}</div>
        <p>{{item.address}}</p>
        <p>{{item.start_time}}</p>
        <p>订单编号: {{item.order_sn}}</p>
      </div>
      <div class="right">
        <div :class="['status', {'status-dead': item.status === 2 || item.status === 4 }]">
          {{item.statusText}}
        </div>
        <div :class="['price', {'price-dead': item.status === 2 || item.status === 4 }]">
          {{item.join_fee}}元
        </div>
      </div>
    </div>
  </div>
    </li>
  </ul>
</div>
  
</template>
<script>
import moment from 'moment';
import api from '../api/activity';
// eslint-disable-next-line
const parseStatus = (
  status, // eslint-disable-line no-confusing-arrow
) =>
  status === 0 // eslint-disable-line no-nested-ternary
    ? '待支付'
    : status === 1 // eslint-disable-line no-nested-ternary
      ? '已支付'
      : status === 2 ? '已取消' : status === 3 ? '已验票' : '失效'; // eslint-disable-line no-nested-ternary

export default {
  data() {
    return {
      page: 1,
      list: [],
    };
  },
  mounted() {
    this.handleData();
  },
  methods: {
    async handleData() {
      const res = await api.getOrder(this.page);
      const list = res.data.map(v => ({
        ...v,
        start_time: moment(v.start_time * 1000).format('YYYY-MM-DD'),
        statusText: parseStatus(v.status),
        // end_time: moment(v.end_time * 1000).format('YYYY-MM-DD'),
      }));
      this.list.push(...list);
    },
    loadMore() {
      this.page += 1;
      this.handleData();
    },
    handleDetail(id) {
      this.$router.push({
        name: 'Ticket-detail',
        params: {
          id,
          type: 0,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.top-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 100%;
  background: #333;
  color: white;
}
.ticket {
  position: relative;
  img {
    width: 100%;
  }
}

.ticket-message {
  position: absolute;
  top: 0;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .left {
    width: 75%;
  }
  .right {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  p {
    margin: 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .status {
    padding: 2px 5px;
    border-radius: 10px;
    border: 1px solid #533;
    font-size: 13px;
    color: #533;
  }
  .status-dead {
    color: white;
    border-color: white;
  }
  .price {
    color: red;
  }
  .price-dead {
    color: white;
  }
}
</style>
