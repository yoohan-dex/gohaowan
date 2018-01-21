<template>
  <div class="container" v-if="item">
    <detail-title :item="item" :handleFollow="handleFollow"></detail-title>
    <detail-content :data="item"></detail-content>
    <comment :item="item" :list="comments" :loadMore="loadMore" :handleComment="handleComment"></comment>
    <div v-show="item.can_join_online === 1 && !commenting">
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
    <div class="comment-input" v-show="commenting">
      <input @blur="finishComment" ref="comment" type="text" v-model="commentValue">
      <button @click="handleCommentSubmit" >发送</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import DetailTitle from '../components/DetailTitle';
import DetailContent from '../components/DetailContent';
import Comment from '../components/Comment';
import CommentApi from '../api/comments';

export default {
  name: 'activity-detail',
  data() {
    return {
      page: 1,
      commenting: false,
      commentValue: '',
      type: 'activity',
    };
  },
  computed: {
    ...mapState({
      item: state => state.activity.active,
      comments: state => state.comments.list.activity,
    }),
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.$store.dispatch('getDetail', { id });
    this.$store.commit('setDetailType', 'activity');
    // this.$store.dispatch('getCommentsList', {type: 'activity', id, page: this.page });
    // this.page += 1;
  },
  mounted() {
    this.loadMore();
  },
  components: { DetailTitle, DetailContent, Comment },
  destroyed() {
    this.$store.commit('resetActiveId');
  },
  methods: {
    handleFollow(id, type, follow) {
      if (follow) {
        this.$store.dispatch('unfollow', { id, type });
      } else {
        this.$store.dispatch('follow', { id, type });
      }
    },
    loadMore() {
      const id = this.id;

      this.$store.dispatch('getCommentsList', {
        type: this.type,
        id,
        page: this.page,
      });
      this.page += 1;
    },
    reload() {
      const id = this.id;
      this.page = 1;

      this.$store.dispatch('regetCommentsList', {
        type: this.type,
        id,
        page: this.page,
      });
      this.page += 1;
    },
    handleComment() {
      this.commenting = true;
      setTimeout(() => this.$refs.comment.focus(), 200);
    },
    finishComment() {
      this.commenting = false;
    },
    async handleCommentSubmit() {
      await CommentApi.comment(this.type)(this.id)(this.commentValue);
      this.commenting = false;
      this.reload();
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
.space {
  width: 100%;
  height: 50px;
}
</style>


