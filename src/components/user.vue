<template>
  <div class="user-container">
    <div class="user" @click="handleClick">
      <img :src="item.headimgurl" alt="">
      <div class="name">{{item.nickname}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'user-item',
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: 'User-detail',
        params: {
          id: this.item.id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.user-container {
  width: 100%;
  height: 70px;
  padding-left: 15px;
  background: white;
  border-top: 2px solid #f2f2f2;
  display: flex;
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


