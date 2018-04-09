<template>
  <div class="background">
    <div class="card">
      <div class="card-head" :style="{ height: height + 'px', width: width + 'px', backgroundImage: `url(${item.cover_image}), linear-gradient(to right, rgba(253, 218, 6, .5), rgba(0, 0, 0, 0))`}">
        <div class="text-box">
          <p>{{item.title}}</p>
        </div>
      </div>
      <div class="card-content" :style="{paddingTop: (height - 30) + 'px'}">
        <p>{{item.address}}</p>
        <p>{{item.time}}</p>
        <div class="order">
          <p>订单信息</p>
          <p>姓名：<span>{{item.name}}</span></p>
          <p>手机号码：<span>{{item.phone}}</span></p>
          <p>微信昵称：<span>{{item.nickname}}</span></p>
        </div>
        <div class="verify" v-if="item.status === 1">
          <p>验票二维码</p>
          <img :src="item.qrcode" alt="">
        </div>
        <div class="verify" v-else-if="item.status === 3">
          <p>已验票</p>
          <img src="../assets/checkTicket.png" alt="">
        </div>
        <div class="verify" v-else-if="item.status === 4">
          <p>已失效</p>
        </div>
      </div>
    </div>
    <div class="gotoIndex" @click="gotoIndex">
      <p>回到首页</p>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import api from '../api/activity';
import ApiMgr from '../api/mgr';

export default {
  name: 'ticket-detail',
  data() {
    return {
      item: {},
    };
  },
  computed: {
    height() {
      return (window.innerWidth * 0.9 - 30) * (9 / 16); // eslint-disable-line
    },
    width() {
      return window.innerWidth * 0.9 - 30; // eslint-disable-line
    },
  },
  mounted() {
    this.handleData();
  },
  methods: {
    async handleData() {
      let res;
      const { id, type } = this.$route.params;

      if (parseInt(type, 10) === 1) {
        res = await ApiMgr.getOrder(id);
      } else {
        res = await api.getOrderDetail(id);
      }
      this.item = res.data;
      this.item.time = moment(this.item.start_time * 1000).format(
        'YYYY-MM-DD HH:MM',
      );
    },
    gotoIndex() {
      this.$router.replace({
        name: 'Index',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 40px 0;
  background-image: linear-gradient(
    to bottom,
    #fdda06,
    #fece00,
    #ffc100,
    #feb500,
    #fda906
  );
}
.card {
  position: relative;
  width: 90%;
  margin-left: 5%;
  background: white;
  border-radius: 20px;
  padding: 15px;
}
.card-head {
  position: absolute;
  top: -30px;
  background-size: contain;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(20, 20, 20, 0.3);
  background-image: linear-gradient(
    to right,
    rgba(253, 218, 6, 0.5),
    rgba(0, 0, 0, 0)
  );
  background-blend-mode: saturation;
}
.text-box {
  position: relative;
  width: 100%;
  height: 100%;
  p {
    position: absolute;
    width: 100%;
    bottom: 0px;
    text-align: center;
    color: white;
    font-weight: bold;
  }
}
.card-content {
  text-align: center;
  p {
    margin: 0;
    font-size: 14px;
  }
  span {
    font-weight: bold;
  }
}
.order {
  margin-top: 30px;
}

.verify {
  p {
    margin: 10px 0;
  }
  img {
    width: 33%;
  }
}

.gotoIndex {
  text-align: center;
}
</style>


