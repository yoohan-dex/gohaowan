<template>
  <router-link :to="{name: 'Information-detail', params: {id: item.id}}">
    <div class="info">
      <div class="img" :style="{backgroundImage: `url(${item.cover_image ? item.cover_image : ''})`}"></div>
      <div class="text">
        <div class="title">
          {{item.title}}
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
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;
  }
  .title {
    color: #333;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .footer {
    display: flex;
    justify-content: space-between;

    img {
      width: 15px;
      height: 15px;
    }
  }
  .time {
    color: #666;
    font-size: 13px;
  }
}
</style>


