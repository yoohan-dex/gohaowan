<template>
  <div class="my-container">
    <p v-show="list.length < 1">你暂时没有参与的活动</p>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="(item, i) in list" :key="i">
            <card :item="item">
              </card>
          </li>
        </ul>
  </div>
  
</template>
<script>
import moment from 'moment';
import api from '../api/activity';
import Card from '../components/card';

export default {
  components: { Card },
  data() {
    return {
      list: [],
      page: 1,
    };
  },
  methods: {
    async handleData() {
      const res = await api.getMy(1);
      this.page += 1;
      /**
       * id,
       * name,
       * location,
       * link
       */
      const list = res.data.map(v => ({
        ...v,
        name: v.title,
        id: v.id,
        location: v.address,
        link: 'Activity-detail',
        time: moment(v.start_time * 1000).format('YYYY-MM-DD'),
      }));
      this.list.push(...list);
    },
    loadMore() {
      this.handleData();
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
  padding: 15px;
  > p {
    text-align: center;
  }
  li {
    margin-bottom: 10px;
  }
}
</style>


