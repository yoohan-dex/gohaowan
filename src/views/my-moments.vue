<template>
  <div class="background">

    <people-list v-if="list.length > 0" :list="list" :loadMore="loadMore" edit></people-list>
    <p class="tips" v-else>你还没有发布动态</p>
  </div>  
</template>

<script>
import { mapState } from 'vuex';
import PeopleList from '../components/People-list';

export default {
  components: { PeopleList },
  name: 'my-moment',
  computed: {
    ...mapState({
      list: state => state.hot.my,
      user: state => state.global.user,
    }),
  },

  mounted() {
    this.$store.dispatch('getMyHotList', { id: this.user.id });
  },

  destroyed() {
    this.$store.commit('resetMyHot');
  },
  methods: {
    loadMore() {},
  },
};
</script>
<style lang="scss" scoped>
.background {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background: #f2f2f2;
}
.tips {
  text-align: center;
}
</style>


