<template>
  <div class="wrap">

    <img src="../assets/ok.svg" alt="">
    <p>请耐心等待管理员审核</p>
    <small>有问题请咨询高冷的猴赛雷，但不一定会得到他的回复</small>
  </div>
</template>
<script>
export default {
  name: 'submit-success',
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 50px 30px 0;
  background: #f2f2f2;
  text-align: center;
  img {
    width: 40%;
    margin-bottom: 50px;
  }
}
</style>

