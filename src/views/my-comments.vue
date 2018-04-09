<template>
  <div class="my-container">
    <div class="top-nav">
    我评论的
  </div>
    <p v-show="list.length < 1">你暂时没有评论</p>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(item, i) in list" :key="i">
        <comment-item :item="item" :to="to">

        </comment-item>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import CommentItem from '../components/Comment-item';

const parseNumType = num => // eslint-disable-line no-confusing-arrow
  num === 1 ? 'activity' : num === 2 ? 'store' : 'information'; // eslint-disable-line no-nested-ternary

export default {
  name: 'my-comments',
  components: {
    CommentItem,
  },
  computed: {
    ...mapState({
      list: state => state.comments.my,
    }),
  },

  methods: {
    loadMore() {
      this.$store.dispatch('getMyComments');
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
.my-container {
  position: absolute;
  background: #f2f2f2;
  width: 100%;
  height: 100%;
  padding: 0 0 15px 0;
  > p {
    text-align: center;
  }
  li {
    margin-bottom: 10px;
  }
}
</style>

