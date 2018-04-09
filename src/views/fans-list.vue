<template>
  <div class="users-container">
    <p v-show="list.length < 1">没有粉丝</p>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(item, i) in list" :key="i">
        <div class="user-container">
          <div class="user" @click="handleClick(item.user_id)">
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
import User from '../components/user';
import api from '../api/follow';

export default {
  components: { User },
  data() {
    return {
      page: 1,
      list: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    async loadMore() {
      const res = await api.fans(this.id)(this.page);

      this.list.push(...res.data);
      this.page += 1;
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
  > p {
    text-align: center;
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


