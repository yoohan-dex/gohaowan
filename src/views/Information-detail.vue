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
    <detail-content v-if="ready" :data="item" :member="false"></detail-content>
    <comment v-if="ready" :item="item" :list="comments" :loadMore="loadMore" :reload="reload" :options="options" :handleComment="handleComment"></comment>
    <!-- <div class="bottom-btn">
      <div class="price">
        {{item.join_fee}}/人
      </div>
      <router-link :to="{name: 'Activity-action'}" class="apply">
        立即报名
      </router-link>
    </div>   -->
    <div :class="['sidebar-shadow', {'sidebar-shadow-show': commenting}]"></div>
    <div class="comment-layer" v-show="commenting">
      <div class="comment-input-box">
        <div class="title">写评论</div>
        <input type="text" v-model="commentValue">
        <div class="footer">
          <div class="cancel" @click="finishComment">取消</div>
          <div class="confirm" @click="handleCommentSubmit">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import wx from 'weixin-js-sdk';

import DetailTitle from '../components/DetailTitle';
import DetailContent from '../components/DetailContent';
import Comment from '../components/Comment';
import CommentApi from '../api/comments';

export default {
  name: 'information-detail',
  data() {
    return {
      options: {
        type: 'information',
      },
      page: 1,
      commenting: false,
      commentValue: '',
      type: 'information',
    };
  },
  computed: {
    ...mapState({
      item: state => state.information.active,
      comments: state => state.comments.list.information,
    }),
    ready() {
      return this.item;
    },
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.$store.dispatch('getInformationDetail', { id });
  },
  updated() {
    this.handleShare();
  },
  mounted() {
    this.loadMore();
    wx.ready(() => this.handleShare());
  },
  destroyed() {
    this.$store.commit('resetActiveId');
  },
  components: { DetailTitle, DetailContent, Comment },
  methods: {
    loadMore() {
      const id = this.$route.params.id;

      this.$store.dispatch('getCommentsList', {
        type: this.type,
        id,
        page: this.page,
      });
      this.page += 1;
    },
    reload() {
      const id = this.$route.params.id;
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
      // setTimeout(() => this.$refs.comment.focus(), 200);
    },
    finishComment() {
      this.commenting = false;
    },
    async handleCommentSubmit() {
      await CommentApi.comment(this.type)(this.id)(this.commentValue);
      this.commenting = false;
      this.reload();
    },
    handleShare() {
      wx.onMenuShareTimeline({
        title: this.item.title, // 分享标题
        link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://ghw.work2pix.top' + this.item.cover_image, // 分享图标
      });
      wx.onMenuShareAppMessage({
        title: this.item.title, // 分享标题
        desc: this.item.share_text,
        link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://ghw.work2pix.top' + this.item.cover_image, //
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


