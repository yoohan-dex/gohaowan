<template>
  <div class="hot-container">
    <div class="media">
      <mt-swipe v-if="item.type === 1" :auto="0">
        <mt-swipe-item v-for="(image, i) in item.images" :key="i"> 
          <img class="swipe-image" :src="image" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <div ref="trigger" id="trigger" class="video-wrap" v-else-if="item.video_url">
        <div class="mask">
          <img v-show="!playing" src="../assets/play.svg" @click="play">
        </div>
        <video webkit-playsinline playsinline id="video" ref="video" :poster="item.cover_image" loop preload="auto">
          <source type="video/mp4" :src="item.video_url">
          你的浏览器不支持视频播放
        </video>
      </div>    </div>
    <div class="content">
      <div class="back" @click="handleBack">
        <img src="../assets/back.svg" alt="">
      </div>
      <div class="buttons">
        <div class="head" @click="handleDetail(item.user_id)">
          <div class="user-head-img headImg" :style="{backgroundImage: `url(${item.headimgurl})`}"></div>
          <img v-show="item.isFollow" @click="handleFollow(item.user_id, 'user', item.isFollow)" class="add" src="../assets/add.svg" alt="">
        </div>
        <div class="like" @click="handleUpvote">
          <img v-if="item.is_upvote" src="../assets/goal-like.svg" alt="">
          <img v-else src="../assets/white-like.svg" alt="">
          <span>{{item.upvote_number}}</span>
        </div>
        <div class="comment" @click="openLayer(1)">
          <img src="../assets/hot-comment.svg" alt="">
          <span>{{item.comment_number}}</span>
        </div>
        <div class="recommend" @click="openLayer(2)">
          <span>荐</span>
        </div>
      </div>
      <div class="bottom">
        <p>
          {{item.description}}
        </p>
      </div>
    </div>
    <div class="top-layer" v-if="layer === 2">
      <div class="close" @click="handleClose">
        <img src="../assets/close.svg" alt="">
      </div>
      <h2>推荐活动</h2>
      <div class="box">
        <div class="activity-wrap">
          <div class="activity" v-for="(item, i) in recommend" :key="i" @click="handleActivity(item.id)">
            <img :src="item.cover_image" alt="">
            <div class="text-wrap">
              <div class="activity-title">{{item.title}}</div>
              <div class="activity-time">{{item.start_time}}</div>
              <div class="activity-price">{{item.join_fee}}元/位</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-layer" v-if="layer === 1">
      <div class="close" @click="handleClose">
        <img src="../assets/close.svg" alt="">
      </div>
      <h2>全部评论</h2>
      <div class="box">
        <comment :item="item" :list="comments" :loadMore="loadMore" :reload="reload" :options="options"></comment>
      </div>
        <div class="comment-input">
          <input type="text" v-model="commentValue">
          <button @click="handleCommentSubmit" >发送</button>
        </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
import wx from 'weixin-js-sdk';

import api from '../api/hot';
import userApi from '../api/user';
import CommentApi from '../api/comments';
import Comment from '../components/Comment';
import actApi from '../api/activity';

export default {
  name: 'hot-detail',
  data() {
    return {
      options: {
        type: 'moment',
      },
      page: 1,
      item: {},
      layer: 0,
      commentValue: '',
      recommend: [],
      playing: false,
      pending: false,
      user: '',
    };
  },
  components: { Comment },

  created() {
    this.id = this.$route.params.id;
    this.type = 'moment';
  },
  mounted() {
    this.handleData();
    this.handleRecommend();
  },

  computed: {
    ...mapState({
      comments: state => state.comments.list.moment,
    }),
  },
  methods: {
    play() {
      this.$refs.video.play();
      this.playing = true;
    },
    async handleData() {
      const res = await api.get(this.id);
      this.item = res.data;
      const userRes = await userApi.get(this.item.user_id);
      this.user = userRes.data;
    },
    handleBack() {
      this.$router.replace({
        name: 'Index',
      });
    },
    handleFollow(id, type, follow) {
      const cb = () => this.handleIn();
      if (follow) {
        this.$store.dispatch('unfollow', { id, type, cb });
      } else {
        this.$store.dispatch('follow', { id, type, cb });
      }
    },
    handleActivity(id) {
      this.$router.push({
        name: 'Activity-detail',
        params: {
          id,
        },
      });
    },
    async handleRecommend() {
      const res = await actApi.recommend(this.id);
      if (res.code === 0) {
        this.recommend = res.data.map(v => ({
          ...v,
          start_time: moment(v.start_time * 1000).format('YYYY-MM-DD'),
        }));
      }
    },
    handleShare() {
      const { origin, pathname, hash } = location;
      wx.onMenuShareTimeline({
        title: this.item.description, // 分享标题
        link: `${process.env.REDIRECT_PATH}${origin}${pathname}${hash}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${process.env.IMAGE_PREFIX}${this.item.cover_image}`, // 分享图标
      });
      wx.onMenuShareAppMessage({
        title: `${this.user.nickname}的精彩动态`, // 分享标题
        link: `${process.env.REDIRECT_PATH}${origin}${pathname}${hash}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${process.env.IMAGE_PREFIX}${this.item.cover_image}`, //
        desc: this.item.description, // 分享描述
      });
    },
    async handleUpvote() {
      if (!this.pending) {
        this.pending = true;
        const res = await api.upvote(this.id);
        if (res.code === 0) {
          this.item.upvote_number += 1;
          this.item.is_upvote = 1;
        }
        this.pending = false;
      }
    },
    handleClose() {
      this.layer = 0;
    },
    openLayer(i) {
      this.layer = i;
    },
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
    handleDetail(id) {
      this.$router.push({
        name: 'User-detail',
        params: {
          id,
        },
      });
    },
    async handleCommentSubmit() {
      const res = await CommentApi.comment(this.type)(this.id)(
        this.commentValue,
      );
      this.reload();
      if (res.code === 0) {
        this.commentValue = '';
        this.item.comment_number += 1;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.hot-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
}
.media {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
}
.mask {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }
}
.video-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.back {
  position: absolute;
  top: 20px;
  left: 15px;
  img {
    width: 30px;
    height: 30px;
  }
}
.user-head-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
}
.bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 17px 14px;
  color: white;
  background: rgba(0, 0, 0, 0.3);
}
.buttons {
  position: absolute;
  top: 184px;
  right: 5px;
  width: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  > div {
    margin-top: 15px;
  }
  .head {
    width: 100%;
    height: 50px;
    position: relative;

    .headImg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .add {
      position: absolute;
      bottom: -5px;
      width: 30%;
      left: 50%;
      transform: translate(-50%);
    }
  }

  .like,
  .comment,
  .recommend {
    width: 100%;
    img {
      position: relative;
      width: 80%;
      left: 10%;
    }
    span {
      display: block;
      color: white;
      text-align: center;
    }
  }
  .recommend {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    span {
      color: black;
    }
  }
}

.top-layer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  border-radius: 10px 10px 0 0;
  background: #f2f2f2;
  padding: 10px 15px;
  overflow: hidden;
  h2 {
    text-align: center;
    margin: 10px 0 15px;
  }
  .box {
    height: calc(100% - 54px);
    width: 100%;
    overflow: scroll;
  }
  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
    img {
      width: 100%;
    }
  }
}

.mint-swipe-items-wrap > .mint-swipe-item {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.activity-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.activity {
  width: 47%;
  flex-shrink: 0;
  background: white;
  margin: 10px 0;
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 100%;
  }
  .text-wrap {
    padding: 5px 3px;
    .activity-title {
      font-size: 15px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: box;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .activity-time {
      font-size: 13px;
      color: #666;
    }
    .activity-price {
      font-size: 20px;
      color: #d4504b;
      text-align: right;
    }
  }
}
</style>


