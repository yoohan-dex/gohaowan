<template>
  <div class="user-container">
    <img src="" alt="">
    <div class="name"></div>
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
};
</script>
<style lang="scss" scoped>
.user-container {
  width: 100%;
  height: 70px;
  padding-left: 15px;
  border-top: 2px solid #e3e3e3;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .name {
    font-size: 20px;
    color: #333;
  }
}
</style>


