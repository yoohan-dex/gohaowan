<template>
  <router-link :to="{name: 'Information-detail', params: {id: item.id}}">
    <div class="info">
      <div class="img" :style="{backgroundImage: `url(${item.cover_image ? item.cover_image : ''})`}"></div>
      <div class="text">
        <div class="title">
          <p>{{item.title}}</p>
        </div>
        <div class="footer">
          <div class="time">
            {{item.add_time}}
          </div>
          <img src="../assets/arrow2.svg" alt="">
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'information',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>
<style lang="scss" scoped>
.info {
  width: 100%;
  height: 150px;
  display: flex;
  padding: 15px 15px 15px 10px;
  border-bottom: 1px solid #e3e3e3;
  background: white;
  .img {
    width: 45%;
    height: 100%;
    background-position: center;
    background-size: cover;
  }
  .text {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;
  }
  .title {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    height: 80px;
    overflow: hidden;
    p {
      display: inline-block;
      margin: 0;
      font-size: 18px;
      font-weight: bold;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;

    img {
      width: 13px;
      height: 13px;
      margin-top: 1px;
    }
  }
  .time {
    color: #666;
    font-size: 13px;
  }
}
</style>


