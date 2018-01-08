<template>
<div>
  <div class="nav-bar">
    <div :class="[{ active: nav === 0 }, 'item']" @click="handleNavSelected(0)">
      <p>活动</p>
    </div>
    <div :class="[{ active: nav === 1 }, 'item']" @click="handleNavSelected(1)">
      <p>发现</p>
    </div>
  </div>
  
  <div class="tab">
    <div class="tab-container" v-if="nav === 0" :style="{display: nav === 0 ? 'block' : 'none'}">

      <div class="search-bar">
        <div class="search-area" @click="handleSearch">
          <img class="icon" src="../assets/search.svg" alt="">
          <p>去哪玩/玩什么</p>
        </div>
      </div>
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="(item, i) in list" :key="i">
          <activity :item="item">
            </activity>
        </li>
      </ul>

    </div>
    <div class="tab-container" v-else>

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

    </div>
    
  </div>
</div>

  
</template>

<script>
import { mapState } from 'vuex';
import Activity from '../components/Activity';
import Information from '../components/Information';

import './index.scss';

// const item = {
//   indicator: 1,
//   title: '天空之城无畏冲锋之旅',
//   location: '深圳福田区曼哈购物广场',
//   price: 288,
//   like: 158,
// };
export default {
  name: 'HelloWorld',
  components: { Activity, Information },
  data() {
    return {
      loading: false,
      height: 0,
    };
  },
  created() {
    const width = window.innerWidth;
    const rate = 9 / 16;
    this.height = width * rate;
  },
  computed: {
    ...mapState({
      list: state =>
        state.activity.list.filter(v => v.id !== 1 && v.id !== 18144330753225),
      scroll: state => state.activity.scroll,
      infoList: state => state.information.list,
      top: state => state.information.top,
      nav: state => state.global.nav,
    }),
  },
  mounted() {
    this.infoLoadMore();
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
    handleSearch() {
      this.$store.dispatch('getUserInfo');

      // this.$router.push({
      //   name: 'Search-view',
      // });
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
  padding: 0 100px;
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
    min-height: 600px;
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
        line-clamp: 1;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .sub-title {
      }
    }
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
</style>
