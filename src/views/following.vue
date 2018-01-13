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
      <div class="tab-container" v-if="nav === 'user'" :style="{display: nav === 0 ? 'block' : 'none'}">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="(item, i) in list" :key="i">
            <user-item :item="item">
              </user-item>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import UserItem from '../components/user';

export default {
  data() {
    return {
      list: [],
    };
  },
  components: { UserItem },
  computed: {
    ...mapState({
      nav: state => state.follow.nav,
    }),
  },
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
</style>


