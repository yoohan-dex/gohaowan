<template>
  <div class="container">
    <detail-title :item="item"></detail-title>
    <detail-content :data="item"></detail-content>
    <comment></comment>
    <div class="space"></div>
    <div class="bottom-btn">
      <div class="price">
        {{item.join_fee}}/人
      </div>
      <router-link :to="{name: 'Activity-action'}" class="apply">
        立即报名
      </router-link>
    </div>  
  </div>
</template>
<script>
import { mapState } from 'vuex';
import DetailTitle from '../components/DetailTitle';
import DetailContent from '../components/DetailContent';
import Comment from '../components/Comment';

export default {
  name: 'activity-detail',
  computed: {
    ...mapState({
      item: state => state.activity.active,
    }),
  },
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch('getDetail', { id });
  },
  components: { DetailTitle, DetailContent, Comment },
};
</script>
<style lang="scss" scoped>
.container {
  background: #f2f2f2;
}
.bottom-btn {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  background: #fdda06;
  padding: 5px 0;
  > * {
    color: black;
    text-decoration: none;
    display: flex;
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .price {
    border-right: 1px solid #bda306;
    margin-left: 0.5px;
  }
}
.space {
  width: 100%;
  height: 50px;
}
</style>


