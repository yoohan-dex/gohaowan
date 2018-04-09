<template>
  <div class="container">
    <div class="top" :style="{height,}">
      <img src="" alt="">
      <div class="text">
        <div class="title">打字咯</div>
        <div class="sub-title">副标题</div>
      </div>
    </div>    

  </div>  
</template>
<script>
export default {
  name: 'information-list',
  data() {
    return {
      height: '',
    };
  },
  created() {
    const width = window.innerWidth;
    const rate = 9 / 16;
    this.height = width * rate;
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .top {
    position: relative;
    width: 100%;
    .text {
      position: absolute;
      bottom: 0;

      .title {
        color: #ffffff;
      }
    }
  }
}
</style>


