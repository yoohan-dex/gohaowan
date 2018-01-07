<template>
  <div class="container">

    <div class="member-list" v-if="member">
      <div class="left">
        已报名 11/30
      </div>
      <div class="right">
        <div class="avatar-list">
          <img src="../assets/avatar.png" alt="" class="avatar">
          <img src="../assets/avatar.png" alt="" class="avatar">
          <img src="../assets/avatar.png" alt="" class="avatar">
          <img src="../assets/avatar.png" alt="" class="avatar">
          <img src="../assets/avatar.png" alt="" class="avatar">
        </div>
        <img class="member-arrow" src="../assets/arrow2.svg" alt="">
      </div>
    </div>

    <div class="content richtext" v-html="data.content">
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail-content',
  props: {
    data: {
      type: Object,
    },
    member: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background: white;
}
.member-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 15px;
  .left {
    font-size: 14px;
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-list {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
.member-arrow {
  width: 15px;
  height: auto;
}
.content {
  display: block;
  p {
    display: inline-block;
    width: 100%;
  }
  padding: 13px 15px;
  * {
    color: #333333;
  }
  img,
  .wscnph {
    position: relative;
    width: 100%;
    height: auto;
  }
}
</style>

