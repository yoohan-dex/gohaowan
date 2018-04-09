<template>
  <div class="users-container">
    <div class="top-nav">
    {{type === 'activity' ? '已报名的玩家' : '玩过的玩家'}}
  </div>
    <p>{{list.length}} {{limit > 0 ? '/' + limit : ''}}</p>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(item, i) in list" :key="i">
        <div class="user-container">
          <div class="user" @click="handleClick(item.id)">
            <img :src="item.headimgurl" alt="">
            <div class="name">{{item.nickname}}</div>
          </div>
          <div class="time">{{item.time}}</div>
        </div>
      </li>
    </ul>
    
  </div>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import User from '../components/user';
import api from '../api/user';

export default {
  components: { User },
  data() {
    return {
      page: 0,
      list: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.length = this.$route.params.length;
    this.limit = this.$route.params.limit;
  },
  computed: {
    ...mapState({
      type: state => state.detail.type,
    }),
  },
  methods: {
    async loadMore() {
      moment.lang('zh-cn');
      this.page += 1;
      const res = await api.joined[this.type](this.id)(this.page);
      const list = res.data.map(v => ({
        ...v,
        time: moment(v.join_time * 1000).fromNow(),
      }));
      this.list.push(...list);
    },
    handleClick(id) {
      this.$router.push({
        name: 'User-detail',
        params: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.users-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f2f2f2;

  p {
    margin: 0;
    text-indent: 15px;
    line-height: 2;
  }
}
.user-container {
  width: 100%;
  height: 70px;
  padding: 0 15px;
  background: white;
  border-top: 2px solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .user {
    height: 100%;
    width: 70%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .name {
      font-size: 20px;
      color: #333;
    }
  }
}
</style>


