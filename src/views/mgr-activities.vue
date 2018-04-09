<template>
  <div class="wrap">
    <div class="top-nav top-bar">
      <div class="space" @click="logout">退出登录</div>
      <p class="title">活动管理</p>
      <div class="search" @click="handleSearch">搜索</div>
    </div>
    <ul v-infinite-scroll="activityMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" key="activity">
      <li v-for="(item, i) in activities" :key="i">
        <card :item="item" link="Mgr-validator">
        </card>
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment';
import { MessageBox } from 'mint-ui';
import Card from '../components/mgr-card';
import api from '../api/mgr';

export default {
  name: 'mgr-login',
  components: { Card },
  data() {
    return {
      page: 1,
      activities: [],
      keyword: '',
      pending: false,
    };
  },
  mounted() {
    this.handleAction();
  },
  methods: {
    async handleAction() {
      if (!this.pending) {
        this.pending = true;
        const res = await api.getActivities(this.page, this.keyword);
        this.page = this.page + 1;
        this.activities.push(
          ...res.data.list.map(v => ({
            ...v,
            time: moment(v.end_time * 1000).format('YYYY-MM-DD'),
          })),
        );
        this.pending = false;
      }
    },
    activityMore() {
      this.handleAction();
    },
    async logout() {
      await api.logout();
      this.$router.replace({ name: 'Mgr-login' });
    },
    handleSearch() {
      MessageBox.prompt('请输入活动名称', '搜索').then(({ value }) => {
        this.keyword = value;
        this.page = 1;
        this.handleAction();
      });
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

  ul {
    padding: 20px;
  }
}
.top-bar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  p {
    color: white;
    width: 60%;
    text-align: center;
  }
  .space {
  }
  .icon {
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


