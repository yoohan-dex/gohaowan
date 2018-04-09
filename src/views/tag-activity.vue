<template>
  <div class="my-container">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="(item, i) in list" :key="i">
            <activity :item="item">
              </activity>
          </li>
        </ul>
  </div>
  
</template>
<script>
// import moment from 'moment';
import { mapState } from 'vuex';
// import api from '../api/activity';
import Activity from '../components/Activity';

export default {
  name: 'tag-activity',
  components: { Activity },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState({
      list: state => state.activity.searchList,
    }),
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.handleSearchByTagItem(this.id);
  },
  methods: {
    loadMore() {
      this.$store.dispatch('getSearchNextList');
    },
    async handleSearchByTagItem(id) {
      this.$store.commit('setActiveTag', id);
      this.$store.dispatch('getSearchList', { type: 'tag' });
    },
  },
};
</script>
<style lang="scss" scoped>
.my-container {
  position: absolute;
  background: #f2f2f2;
  width: 100%;
  height: 100%;
  > p {
    text-align: center;
  }
  li {
  }
}
</style>


