<template>
<div class="gray">
  <div class="user-title-container" v-if="!user.is_hot" :style="{height: height + 'px'}">
    <div class="top">
      <div class="like" @click="handleFollow(user.id, 'user', user.isFollow)">
        <img v-if="user.isFollow" src="../assets/liked.svg" alt="">
        <img v-else src="../assets/like.svg" alt="">
        <p v-if="user.isFollow" class="followit">已关注</p>
        <p v-else>关注</p>
      </div>
    </div>
    <div class="user">
      <div class="user-head-img" :style="{backgroundImage: `url(${user.headimgurl})`}">
        
      </div>
      <!-- <img :src="user.headimgurl" alt=""> -->
      {{user.nickname}}
    </div>
    <div class="buttons">
      <div class="follow" @click="goto('Follower-list')">
        关注: {{user.follow_number}}
      </div>
      <div class="follower" @click="goto('Fans-list')">
        粉丝: {{user.fans_number}}
      </div>
    </div>
  </div>

  <div class="hot-title-container" v-else-if="user.is_hot">
    <div class="top-container">
      <div class="left">
        <div class="user">
          <img src="../assets/hot-head.png" alt="">
          <div class="user-head-img head" :style="{backgroundImage: `url(${user.headimgurl})`}"></div>
          <p>{{user.nickname}}</p>
        </div>
      </div>
      <div class="right">
        <div class="like" :style="{backgroundColor: user.isFollow ? '#dadde2' : ''}" @click="handleFollow(user.id, 'user', user.isFollow)">
          <img v-if="user.isFollow" src="../assets/gray-liked.svg" alt="">
          <img v-else src="../assets/liked.svg" alt="">
          <p v-if="user.isFollow" class="followit">已关注</p>
          <p v-else>关注</p>
        </div>
        <p>{{user.upvote_number}} 获赞</p>
        <p @click="goto('Fans-list')">{{user.fans_number}} 粉丝</p>
        <p @click="goto('Follower-list')">{{user.follow_number}} 关注</p>
        <small>{{user.personal_sign ? user.personal_sign : '红人暂时还没想到他的个性签名'}}</small>
      </div>
    </div>
    
    <div class="tags">
      <div v-for="(item, i) in user.tag_list" :key="i" class="tag">
        <div class="content">
          {{item.name}}
        </div>
      </div>
    </div>
    
  </div>


    <div class="tabs" v-if="!user.is_hot">
      <div :class="['item', {'item-active': nav === 'looking'}]" @click="setNav('looking')">{{sex}}的动态</div>
      <div :class="['item', {'item-active': nav === 'activity'}]" @click="setNav('activity')">{{sex}}参与过</div>
      <div :class="['item', {'item-active': nav === 'comments'}]" @click="setNav('comments')">{{sex}}的评论</div>
    </div>

    <div class="tabs tabs-2" v-else-if="user.is_hot">
      <div :class="['item', {'item-active': nav === 'moment'}]" @click="setNav('moment')">{{sex}}的记录</div>
      <div :class="['item', {'item-active': nav === 'looking'}]" @click="setNav('looking')">{{sex}}的动态</div>
    </div>
    
    <div class="tab">
      <div class="tab-container" v-if="nav === 'looking'" key="looking">
        <p v-show="looking.length < 1">暂时没有动态</p>
        
        <ul v-infinite-scroll="lookingMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" key="looking">
          <li v-for="(item, i) in looking" :key="i">
            <p class="message">报名了活动<span style="color: #369;">{{item.name}}</span></p>
            <card :item="item">
              </card>
          </li>
        </ul>
      </div>
      <div class="tab-container" v-else-if="nav === 'activity'" key="activity">
        <p v-show="activity.length < 1">暂时没有参与</p>
        <ul v-infinite-scroll="activityMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" key="activity">
          <li v-for="(item, i) in activity" :key="i">
            <p class="message">参与了活动<span style="color: #369;">{{item.name}}</span></p>
            <card :item="item">
              </card>
          </li>
        </ul>
      </div>
      <div class="tab-container comment-container" v-else-if="nav === 'comments'" key="comments">
        <p v-show="comments.length < 1">暂时没有评论</p>
          <ul v-infinite-scroll="commentMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" key="comments">
            <li v-for="(item, i) in comments" :key="i">
              <comment-item :item="item" :to="to">

              </comment-item>
            </li>
          </ul>
      </div>

      <div class="tab-container  comment-container" v-else-if="nav === 'moment'" key="moment">
        <p v-show="moments.length < 1">暂时没有记录</p>
        <people-list :list="moments" :loadMore="hotLoadMore"></people-list>
      </div>

    </div>

</div>
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
import Activity from '../components/Activity';
import api from '../api/user';
import api2 from '../api/activity';
import commentApi from '../api/comments';
import momentApi from '../api/hot';
import Card from '../components/card';
import CommentItem from '../components/Comment-item';
import PeopleList from '../components/People-list';

// eslint-disable-next-line
const parseNumType = (
  num, // eslint-disable-line no-confusing-arrow
) => (num === 1 ? 'activity' : num === 2 ? 'store' : 'information'); // eslint-disable-line

export default {
  components: { Card, Activity, CommentItem, PeopleList },
  mounted() {
    const rate = window.innerWidth / 16;
    this.height = rate * 9.5;
    const id = this.$route.params.id;
    this.id = id;
    this.handleIn();
    scroll(0, 0);
  },
  data() {
    return {
      user: {},
      sex: '',
      height: '',
      looking: [],
      page: {
        comments: 0,
        activity: 0,
        looking: 0,
        moments: 0,
      },
      comments: [],
      activity: [],
      moments: [],
    };
  },
  computed: {
    ...mapState({
      nav: state => state.user.nav,
    }),
  },

  methods: {
    iniNav() {
      if (this.user.is_hot) {
        this.setNav('moment');
      } else {
        this.setNav('looking');
      }
    },
    async handleIn() {
      const id = this.$route.params.id;
      this.id = id;
      const res = await api.get(id);
      this.user = res.data;
      this.sex = res.data.sex === 1 ? '他' : '她';
      this.iniNav();
      if (this.nav === 'moment') {
        this.hotLoadMore();
      }
    },
    async handleLooking() {
      this.page.looking += 1;
      const res = await api2.getMoment(this.id)(this.page.looking);

      /**
       * id,
       * name,
       * location,
       * link
       */
      const looking = res.data.map(v => ({
        ...v,
        name: v.title,
        id: v.id,
        location: v.address,
        link: 'Activity-detail',
        time: moment(v.start_time * 1000).format('YYYY-MM-DD'),
      }));
      this.looking.push(...looking);
    },
    async handleActivity() {
      this.page.activity += 1;
      const res = await api2.getOtherList(this.id)(this.page.activity);

      const activity = res.data.map(v => ({
        ...v,
        name: v.title,
        id: v.id,
        location: v.address,
        link: 'Activity-detail',
        time: moment(v.start_time * 1000).format('YYYY-MM-DD'),
      }));
      this.activity.push(...activity);
    },
    async handleComment() {
      this.page.comments += 1;
      const res = await commentApi.getOther(this.id)(this.page.comments);
      this.comments.push(
        ...res.data.map(v => ({
          ...v,
          time: moment(v.create_time * 1000).format('YYYY-MM-DD'),
          sourceTime: moment(v.relation_time * 1000).format('YYYY-MM-DD'),
        })),
      );
    },
    async handleMoment() {
      this.page.moments += 1;
      const res = await momentApi.getOtherList(this.id)(this.page.moments);
      this.moments.push(...res.data);
    },
    handleFollow(id, type, follow) {
      const cb = () => this.handleIn();
      if (follow) {
        this.$store.dispatch('unfollow', { id, type, cb });
      } else {
        this.$store.dispatch('follow', { id, type, cb });
      }
    },
    commentMore() {
      this.handleComment();
    },
    activityMore() {
      this.handleActivity();
    },
    lookingMore() {
      this.handleLooking();
    },
    setNav(nav) {
      this.$store.commit('setUserNav', nav);
    },
    loadMore() {},
    hotLoadMore() {
      this.handleMoment();
    },
    goto(name) {
      this.$router.push({
        name,
        params: { id: this.id },
      });
    },
    to(id, numType) {
      const type = parseNumType(numType);

      if (type === 'activity') {
        this.$router.push({
          name: 'Activity-detail',
          params: {
            id,
          },
        });
      } else if (type === 'store') {
        this.$router.push({
          name: 'Store-detail',
          params: {
            id,
          },
        });
      } else if (type === 'information') {
        this.$router.push({
          name: 'Information-detail',
          params: {
            id,
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.user-head-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
}
.user-title-container {
  width: 100%;
  position: relative;
  background: url('../assets/user-title.png');
  background-size: cover;
  background-repeat: no-repeat;
  .top {
    top: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      width: 18px;
      margin-bottom: 2px;
    }
    .like {
      color: white;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      margin: 10px 8px 0 0;
      p {
        display: inline;
        color: #ff5d57;
      }
      .followit {
        color: white;
      }
    }
  }
  .user {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    img {
      width: 25%;
      border-radius: 50%;
    }
    color: white;
    font-size: 22px;
    font-weight: bold;
  }
  .buttons {
    display: flex;
    padding: 5px 25%;
    justify-content: space-between;

    .follow,
    .follower {
      font-size: 13px;
      padding: 3px 10px;
      border: 2px solid white;
      border-radius: 20px;
      color: white;
    }
    .follower {
      background: #ff5d57;
      border-color: #ff5d57;
    }
  }
}
.tabs {
  width: 100%;
  display: flex;
  padding: 5px 45px;
  justify-content: space-between;
  background: white;

  .item {
    color: #999;
  }
  .item-active {
    color: #333;
    border-bottom: 2px solid #fdda06;
  }
}
.tabs-2 {
  padding: 10px 65px 5px;
  border-top: 1px solid #f2f2f2;
}
.tab {
  width: 100%;

  .tab-container {
    display: block;
    width: 100%;
    background: #f2f2f2;
    padding: 15px;
    > p {
      text-align: center;
    }
    li {
      margin-bottom: 10px;
    }
    .message {
      margin: 0;
      font-size: 13px;
    }
  }
  .comment-container {
    padding: 15px 0;
  }
}
.gray {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f2f2f2;
}

.hot-title-container {
  width: 100%;
  position: relative;
  padding: 10px 15px;
  background: white;
  .top-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 50%;
      padding-top: 5px;
      .user {
        position: relative;
        width: 100%;
        padding-top: 10px;
        img {
          width: 100%;
        }
        .head {
          position: absolute;
          width: 55%;
          height: 59.5%;
          top: 0;
          left: -5px;
          border: 3px solid #fff;
          border-radius: 50%;
        }
        p {
          width: 100%;
          position: absolute;
          font-weight: bold;
          top: 50%;
          text-align: center;
        }
      }
    }

    .right {
      p:nth-child(2) {
        margin-top: 20px;
      }
      p {
        font-weight: bold;
        margin: 3px 0;
        text-indent: 10px;
        color: #333;
        font-size: 13px;
      }
      small {
        display: block;
        margin-left: 10px;
        font-size: 12px;
        color: #666;
      }

      .like {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 2px 7px;
        background: #dd736f;
        border-radius: 14px;
        p {
          font-size: 12px;
          display: inline;
          color: white;
        }
        img {
          width: 14px;
        }
        .followit {
          color: #999;
        }
      }
    }
  }
}

.tags {
  margin-top: 5px;
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
  .tag {
    flex-shrink: 0;
    margin: 5px;
    padding: 2px;
    background-image: linear-gradient(
      to right,
      #fdc02e,
      #fab231,
      #f6a434,
      #f09638,
      #e9893b
    );
    border-radius: 14px;
    .content {
      display: block;
      color: #ffb926;
      background: white;
      padding: 2px 10px;
      border-radius: 12px;
    }
  }
}
</style>


