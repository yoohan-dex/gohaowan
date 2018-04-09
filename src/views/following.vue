<template>
  <div class="follow-container">
    <div class="nav-bar">
      <div :class="[{ active: nav === 'user' }, 'item']" @click="handleNavSelected('user')">
        <p>用户</p>
      </div>
      <div :class="[{ active: nav === 'activity' }, 'item']" @click="handleNavSelected('activity')">
        <p>活动</p>
      </div>
      <div :class="[{ active: nav === 'store' }, 'item']" @click="handleNavSelected('store')">
        <p>商户</p>
      </div>
    </div>

    <div class="tab">
      <div class="tab-container" v-if="nav === 'user'" :style="{display: nav === 'user' ? 'block' : 'none'}">
        <p v-show="list.user.length < 1">还没有关注的用户</p>
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="(item, i) in list.user" :key="i">
            <user-item :item="item">
              </user-item>
          </li>
        </ul>
      </div>
      <div class="tab-container" v-else-if="nav === 'activity'" :style="{display: nav === 'activity' ? 'block' : 'none'}">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="(item, i) in list.activity" :key="i">
            <activity :item="item" :options="options">
              </activity>
          </li>
        </ul>
      </div>
      <div class="tab-container" v-else-if="nav === 'store'" :style="{display: nav === 'store' ? 'block' : 'none'}">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="(item, i) in list.store" :key="i">
            <store-following :item="item">
              </store-following>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import UserItem from '../components/user';
import Activity from '../components/Activity';
import StoreFollowing from '../components/StoreFollowing';

export default {
  data() {
    return {
      options: {
        withoutLike: true,
      },
      storeOptions: {
        withoutLike: true,
        withoutIndicator: true,
      },
    };
  },
  components: { UserItem, Activity, StoreFollowing },
  computed: {
    ...mapState({
      nav: state => state.follow.nav,
      list: state => state.follow.list,
    }),
  },
  watch: {
    nav() {
      if (this.list[this.nav].length < 1) {
        this.loadMore();
      }
    },
  },
  // created() {
  //   ['user', 'activity', 'store'].forEach(v => {
  //     this.loadMore(v);
  //   });
  // },
  methods: {
    handleNavSelected(nav) {
      this.$store.commit('setFollowNav', nav);
    },
    loadMore() {
      this.$store.dispatch('getFollowList', this.nav);
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  background: white;
  width: 100%;
  height: 44px;
  padding: 0 60px;
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
      color: #333;
    }
    border-bottom: 2px solid #fdda06;
  }
}
.tab {
  width: 100%;
  height: 100%;

  .tab-container {
    display: block;
    width: 100%;

    padding-top: 44px;
    background: #f2f2f2;
  }
}
</style>


