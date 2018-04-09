<template>
  <div class="wrap">
    <div class="top-nav top-bar">
      <img class="icon"  @click="back" src="../assets/arrow.svg" alt="">
      <p class="title">{{item.title}}</p>
      <img class="icon" @click="scan" src="../assets/scanner.svg" alt="">
    </div>
    <p class="member-number">{{member.used_number}} / {{member.joined_number}}</p>
    <ul v-infinite-scroll="playersMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" key="activity">
      <li v-for="(item, i) in players" :key="i">
        <player-item :item="item">
        </player-item>
      </li>
    </ul>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import PlayerItem from '../components/player-item';
import api from '../api/mgr';

export default {
  name: 'mgr-login',
  components: { PlayerItem },
  data() {
    return {
      page: 1,
      players: [],
      keyword: '',
      id: '',
      item: '',
      member: '',
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.handleDetail();
    this.outlet();
  },
  methods: {
    async outlet() {
      const res = await api.outlet(this.id);
      this.member = res.data;
    },
    async handleDetail() {
      const res = await api.getActivityDetail(this.id);
      this.item = res.data;
    },
    async handleAction() {
      const res = await api.getPlayers(this.page, this.id);
      this.page = this.page + 1;
      this.players.push(...res.data.list);
    },
    playersMore() {
      this.handleAction();
    },
    scan() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: async res => {
          const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          const response = await api.verify(result);
          if (response.code === 0) {
            this.$router.push({
              name: 'Ticket-detail',
              params: {
                type: 1,
                id: result,
              },
            });
          }
        },
      });
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: absolute;
  min-height: 100%;
  width: 100%;
  background: #f2f2f2;
}
.member-number {
  margin: 5px;
  text-indent: 10px;
}
.top-bar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .icon {
    width: 20px;
  }

  p {
    width: 80%;
    text-align: center;
    font-weight: normal;
    color: white;
  }
  .search {
    padding: 3px 10px;
    border-radius: 5px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  }
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


