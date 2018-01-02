<template>
<div>
  <div class="nav-bar">
    <div :class="[{ active: selected === 0 }, 'item']" @click="handleNavSelected(0)">
      <p>活动</p>
    </div>
    <div :class="[{ active: selected === 1 }, 'item']" @click="handleNavSelected(1)">
      <p>发现</p>
    </div>
  </div>
  
<mt-tab-container v-model="selected">
  <mt-tab-container-item :id="0">
    <div class="search-bar">
      <div class="search-area">
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
  </mt-tab-container-item>
  <mt-tab-container-item :id="1">
  </mt-tab-container-item>
  <mt-tab-container-item id="3">
  </mt-tab-container-item>
</mt-tab-container>
</div>

  
</template>

<script>
import { mapState } from 'vuex';
import Activity from '../components/Activity';
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
  components: { Activity },
  data() {
    return {
      loading: false,
      msg: 'Welcome to Your Vue.js App',
      selected: 0,
    };
  },
  computed: {
    ...mapState({
      list: state =>
        state.activity.list.filter(v => v.id !== 1 && v.id !== 18144330753225),
      scroll: state => state.activity.scroll,
    }),
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
      this.selected = id;
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

.mint-tab-container {
  margin-top: 44px;
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
