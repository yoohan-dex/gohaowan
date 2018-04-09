<template>
  <div class="container">
    <div class="search-bar">
      <div class="search-area">
        <form action="" @submit.prevent="handleSearchItem(keyword)">
          <input type="search" :value="keyword" @input="handleChange" >
        </form>
        <img v-show="keyword" class="icon" src="../assets/close.svg" @click="handleClose">
      </div>
      <div class="cancel" @click="cancel">
        取消
      </div>
    </div>
    <div class="content" v-if="ini">
      

      <div class="search-block">
        <div class="type">
          动态标签
        </div>
        <div class="bubble-block">
          <div class="bubble bubble-light" v-for="(item, i) in tags" :key="i" @click="handleSearchByTagItem(item.id)">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>

    <div class="search-result" v-if="!ini">
      <people-list v-if="list.length > 0" :list="list" :loadMore="loadMore"></people-list>
      <div class="alert" v-else>
        没有搜索到
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex';
import PeopleList from '../components/People-list';
import api from '../api/activity';

export default {
  name: 'moment-search-view',
  components: { PeopleList },
  data() {
    return {
      history: [],
      tags: [],
      ini: true,
    };
  },

  computed: {
    ...mapState({
      list: state => state.hot.searchList,
      keyword: state => state.hot.keyword,
    }),
  },
  async mounted() {
    // const res = await api.getSearchHistory();
    const tagRes = await api.getTags();
    // this.history = res.data;
    this.tags = tagRes.data;
  },
  updated() {
    this.$nextTick(() => {
      if (this.list && this.list.length > 0) {
        this.ini = false;
      }
    });
  },
  methods: {
    async handleSearchItem(keyword) {
      this.$store.commit('setHotActiveKeyword', keyword);
      this.$store.dispatch('getHotSearchList', { type: 'keyword' });
      this.ini = false;
    },
    async handleSearchByTagItem(id) {
      this.$store.commit('setHotActiveTag', id);
      this.$store.dispatch('getHotSearchList', { type: 'tag' });
      this.ini = false;
    },
    cancel() {
      this.$store.commit('resetHotSearch');
      this.ini = true;
    },
    handleChange(e) {
      this.$store.commit('setHotKeyword', e.target.value);
    },
    handleClose() {
      this.ini = true;
      this.$store.commit('setHotKeyword', '');
    },
    loadMore() {
      this.$store.dispatch('getHotSearchNextList');
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
    form {
      width: 100%;
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
.alert {
  text-align: center;
}
</style>

