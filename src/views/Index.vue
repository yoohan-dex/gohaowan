<template>
<div>
  <div class="menu">
    <img :src="user.headimgurl" alt="" @click="handleOpen">
  </div>
  <div class="nav-bar">
    <div :class="[{ active: nav === 2 }, 'item']" @click="handleNavSelected(2)">
      <p>红人</p>
    </div>
    <div :class="[{ active: nav === 0 }, 'item']" @click="handleNavSelected(0)">
      <p>活动</p>
    </div>
    <div :class="[{ active: nav === 1 }, 'item']" @click="handleNavSelected(1)">
      <p>发现</p>
    </div>
  </div>
  
  <div class="tab">
    <div class="tab-container" v-if="nav === 0" key="activity">

      <div class="search-bar">
        <div class="search-area" @click="handleSearch">
          <img class="icon" src="../assets/search.svg" alt="">
          <p>去哪玩/玩什么</p>
        </div>
      </div>
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="(item, i) in list" :key="i">
          <activity :item="item" :handleFollow="handleFollow">
            </activity>
        </li>
      </ul>

    </div>



    <div class="tab-container" v-else-if="nav === 1" key="discover">

      <div class="information-container" @click="toInfoDetail">
        <div class="top" :style="{height}">
          <img :src="top.cover_image" alt="">
          <div class="text">
            <div class="title">{{top.title}}</div>
            <div class="sub-title">{{top.sub}}</div>
          </div>
        </div>
      </div>  

      <ul v-infinite-scroll="infoLoadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="(item, i) in infoList" :key="i">
          <information :item="item">
            </information>
        </li>
      </ul>

  </div>  

  <div class="tab-container" v-else-if="nav === 2" key="people">

      <div class="search-bar">
        <div class="search-area" @click="handleMomentSearch">
          <img class="icon" src="../assets/search.svg" alt="">
          <p>搜索红人</p>
        </div>
      </div>
      <people-list :list="hot" :loadMore="hotLoadMore"></people-list>
      <div class="camera-button" v-show="user.is_hot" @click="to('Moment')">
        <img src="../assets/camera.svg" alt="">
      </div>
    </div>

    </div>
    <div :class="['sidebar-shadow', {'sidebar-shadow-show': open}]" @click="handleOpen"></div>
    <div :class="['sidebar', {'sidebar-show': open}]">
      <div class="sidebar-header">
        <div class="left" @click="handleHead">
          <div class="img" :style="{backgroundImage: `url(${user.headimgurl})`}"></div>
          <div class="name">{{user.nickname}}</div>
        </div>
        <div class="right" @click="to('Profile')">
          <img src="../assets/arrow2.svg" alt="">
        </div>
      </div>
      <div class="sidebar-content">
        <div class="item" @click="to('Ticket')">
          <img src="../assets/order.png" alt="">
          我的订单
        </div>
        <div class="item" @click="to('My-activity')">
          <img src="../assets/join.png" alt="" style="width: 27px">
          参与过的
        </div>
        <div class="item" @click="to('My-comments')">
          <img src="../assets/comm.png" alt="">
          我评论的
        </div>
        <div class="item" @click="to('Follow')">
          <img src="../assets/heart.png" alt="" style="width: 26px;">
          我关注的
        </div>
        <div class="item item-last" v-show="!user.is_hot" @click="to('Tobehot')">
          <img src="../assets/fire.png" alt="">
          成为红人
        </div>
        <div class="item item-last" v-show="user.is_hot" @click="to('My-moment')">
          <img src="../assets/fire.png" alt="">
          我发布的
        </div>
      </div>
      <!-- <p class="mgr" @click="to('Mgr-login')">活动管理</p> -->
    </div>
    <!-- <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible"
     >

    </mt-actionsheet> -->
  </div>

  
</template>

<script>
import { mapState } from 'vuex';
import Activity from '../components/Activity';
import Information from '../components/Information';
import PeopleList from '../components/People-list';
// import { Actionsheet } from 'mint-ui';

import './index.scss';

export default {
  name: 'Index',
  components: { Activity, Information, PeopleList },
  data() {
    return {
      loading: false,
      height: 0,
      open: false,
      // actions: [{
      //   name: '上传视频',

      // }]
    };
  },
  created() {
    const width = window.innerWidth;
    const rate = 9 / 16;
    this.height = width * rate;
  },
  computed: {
    ...mapState({
      hot: state => state.hot.list,
      list: state => state.activity.list,
      scroll: state => state.activity.scroll,
      infoList: state => state.information.list,
      top: state => state.information.top,
      nav: state => state.global.nav,
      user: state => state.global.user,
    }),
  },
  mounted() {
    this.infoLoadMore();
    this.$store.commit('initSearchList');
  },
  // mounted() {
  //   setTimeout(() => window.scroll(0, this.scroll), 200);
  // },
  // beforeDestroy() {
  //   const scroll = window.scrollY;
  //   this.$store.commit('setScroll', scroll);
  //   console.log(scroll);
  // },
  methods: {
    handleNavSelected(id) {
      this.$store.commit('setNav', id);
    },
    handleOpen() {
      this.open = !this.open;
    },
    handleSearch() {
      this.$router.push({
        name: 'Search-view',
      });
    },
    handleMomentSearch() {
      this.$router.push({
        name: 'Moment-search-view',
      });
    },
    infoLoadMore() {
      this.$store.dispatch('getInformationList');
    },
    toInfoDetail() {
      this.$router.push({
        name: 'Information-detail',
        params: { id: this.top.id },
      });
    },
    handleFollow(id, type, follow) {
      if (follow) {
        this.$store.dispatch('unfollow', { id, type });
      } else {
        this.$store.dispatch('follow', { id, type });
      }
    },
    handleHead() {
      this.$router.push({
        name: 'User-detail',
        params: {
          id: this.user.id,
        },
      });
    },
    loadMore() {
      this.$store.dispatch('getList');
      // this.list.forEach(element => {
      //   console.log(element.id);
      // });
      // this.loading = true;
      // setTimeout(() => {
      //   this.list.push(item);
      //   this.loading = false;
      // }, 1000);
    },
    hotLoadMore() {
      this.$store.dispatch('getHotList');
    },
    to(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  background: #333333;
  width: 100%;
  height: 44px;
  padding: 0 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 19px;
    padding: 0 5px;
    p {
      color: #999999;
    }
  }
  .item.active {
    p {
      color: #fdda06;
    }
    border-bottom: 2px solid #fdda06;
  }
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  width: 100%;
  height: 44px;
  padding-left: 15px;

  .search-area {
    display: flex;
    align-items: center;
    width: 80%;
    height: 31px;
    padding: 0 15px;
    border-radius: 30px;
    background: #e5e5e5;

    p {
      display: inline-block;
      color: #c5c5c5;
      margin-left: 5px;
    }
  }
}

.tab {
  width: 100%;
  height: 100%;

  .tab-container {
    display: block;
    width: 100%;
    min-height: calc(100% + 10px);
    padding-top: 44px;
    background: #f2f2f2;
  }
}

.information-container {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  .top {
    position: relative;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
    .text {
      position: absolute;
      width: 100%;
      bottom: 0;
      color: #ffffff;
      padding: 15px;
      .title,
      .sub-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: box;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .title {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}

.camera-button {
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 45px;
  height: 45px;

  img {
    width: 100%;
  }
}

h1,
h2 {
  font-weight: normal;
}
ul {
  margin-top: 0;
  margin-bottom: 0;
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  width: 100%;
}
a {
  color: white;
}
.menu {
  position: fixed;
  z-index: 10;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
}
.sidebar,
.sidebar-shadow {
  z-index: 20;
  position: fixed;
  top: 0;
  width: 75%;
  height: 100%;
  background: white;
  transition: transform 0.3s;
  transform: translate(-100%);
}
.sidebar-shadow {
  z-index: 15;
  width: 100%;
  background: #777;
  opacity: 0;
  transition: opacity 0.3s;
}
.sidebar-shadow-show {
  transform: translate(0);
  opacity: 0.5;
}
.sidebar-show {
  transform: translate(0);
}

.sidebar-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 80%;
    padding: 20px 0 0 20px;
    .img {
      border-radius: 50%;
      width: 79px;
      height: 79px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .name {
      font-size: 25px;
      font-weight: bold;
      margin-top: 8px;
    }
  }
  .right {
    width: 20%;
    display: flex;
    padding-right: 15px;

    justify-content: flex-end;
    img {
      width: 15px;
    }
  }
}

.sidebar-content {
  width: 100%;
  margin-top: 30px;
  .item {
    display: flex;
    align-items: center;
    padding: 15px 0 15px 30px;
    align-items: center;
    font-size: 17px;
    color: #333;
    border-bottom: 2px solid #e3e3e3;

    img {
      width: 25px;
      margin-right: 15px;
    }
  }
  .item-last {
    border-bottom: 0;
    img {
      width: 23px;
    }
  }
}
.mgr {
  position: absolute;
  bottom: 0;
  text-indent: 20px;
}
</style>
