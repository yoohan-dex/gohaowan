<template>
  <div class="container">
    <!-- <detail-title :item="item"></detail-title> -->
    <div class="title-container">
      <img :src="item.cover_image" alt="">
      <div class="text">
        <p>{{item.title}}</p>
        <p class="time">{{item.add_time}}</p>
      </div>
    </div>
    <detail-content :data="item" :member="false"></detail-content>
    <comment :item="item" :list="comments" :loadMore="loadMore" :reload="reload" :options="options"></comment>
    <!-- <div class="bottom-btn">
      <div class="price">
        {{item.join_fee}}/人
      </div>
      <router-link :to="{name: 'Activity-action'}" class="apply">
        立即报名
      </router-link>
    </div>   -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import DetailTitle from '../components/DetailTitle';
import DetailContent from '../components/DetailContent';
import Comment from '../components/Comment';

export default {
  name: 'information-detail',
  data() {
    return {
      options: {
        type: 'information',
      },
      page: 1,
    };
  },
  computed: {
    ...mapState({
      item: state => state.information.active,
      comments: state => state.comments.list.information,
    }),
  },
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch('getInformationDetail', { id });
  },
  destroyed() {
    this.$store.commit('resetActiveId');
  },
  components: { DetailTitle, DetailContent, Comment },
  methods: {
    loadMore() {
      const id = this.$route.params.id;

      this.$store.dispatch('getCommentsList', {
        type: 'information',
        id,
        page: this.page,
      });
      this.page += 1;
    },
    reload() {
      const id = this.$route.params.id;
      this.page = 1;

      this.$store.dispatch('regetCommentsList', {
        type: 'information',
        id,
        page: this.page,
      });
    },
  },
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

.title-container {
  background: white;
  margin-bottom: 10px;
  width: 100%;
  img {
    width: 100%;
  }
  .text {
    width: 100%;
    padding: 10px 15px;

    p {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    .time {
      font-weight: initial;
      font-size: 13px;
      color: #666;
      text-align: right;
    }
  }
}
.space {
  width: 100%;
  height: 50px;
}
</style>


