<template>
  <div class="container">
    <div class="search-bar">
      <div class="search-area">
        <input type="search" :value="keyword" @input="handleChange" @keyup.enter="handleSearchItem(keyword)">
        <img v-show="keyword" class="icon" src="../assets/close.svg" @click="handleClose">
      </div>
      <div class="cancel" @click="cancel">
        取消
      </div>
    </div>
    <div class="content" v-if="ini">
      <div class="search-block" v-if="history.length > 0">
        <div class="type" >
          历史搜索
        </div>
        <div class="bubble-block">
          <div class="bubble"  v-for="(item, i) in history" :key="i" @click="handleSearchItem(item.keywords)">
            {{item.keywords}}
          </div>
        </div>
      </div>

      <div class="search-block">
        <div class="type">
          活动标签
        </div>
        <div class="bubble-block">
          <div class="bubble bubble-light">
            打棒球
          </div>
        </div>
      </div>
    </div>

    <div class="search-result" v-if="!ini">
      <ul v-if="list.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="(item, i) in list" :key="i">
          <activity :item="item">
            </activity>
        </li>
      </ul>
      <div class="alert" v-else>
        没有搜索到
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex';
import Activity from '../components/Activity';
import api from '../api/activity';

export default {
  name: 'search-view',
  components: { Activity },
  data() {
    return {
      history: [],
      ini: true,
    };
  },
  computed: {
    ...mapState({
      list: state =>
        state.activity.searchList.filter(
          v => v.id !== 1 && v.id !== 18144330753225,
        ),
      keyword: state => state.activity.keyword,
    }),
  },
  async mounted() {
    const res = await api.getSearchHistory();
    this.history = res.data;
  },
  updated() {
    this.$nextTick(() => {
      if (this.list.length > 0) {
        this.ini = false;
      }
    });
  },
  methods: {
    async handleSearchItem(keyword) {
      this.$store.commit('setActiveKeyword', keyword);
      this.$store.dispatch('getSearchList');
      this.ini = false;
    },
    cancel() {
      this.$router.back();
    },
    handleChange(e) {
      this.$store.commit('setKeyword', e.target.value);
    },
    handleClose() {
      this.ini = true;
      this.$store.commit('setKeyword', '');
    },
    loadMore() {
      this.$store.dispatch('getSearchNextList');
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f2f2f2;
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
    background: #f2f2f2;

    p {
      display: inline-block;
      color: #c5c5c5;
      margin-left: 5px;
    }
    input {
      width: 100%;
      border: 0;
      outline: none;
    }
  }
  .cancel {
    font-size: 18px;
    width: 20%;
    text-align: center;
  }
}

.content {
  width: 100%;
  padding: 15px;
  .bubble-block {
    padding: 15px 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .bubble {
      flex-shrink: 0;
      font-size: 15px;
      display: block;
      padding: 5px 15px;
      border-radius: 15px;
      background: #e0e0e0;
      color: #333;
      margin-right: 13px;
      margin-bottom: 13px;
    }
    .bubble-light {
      background: #f1e8b4;
      color: #af7b18;
    }
  }
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

