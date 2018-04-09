<template>
  <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="(item, i) in list.user" :key="i">
            <user-item :item="item">
              </user-item>
          </li>
        </ul>
</template>
<script>
import User from '../components/user';
import api from 
export default {
  components: {User},
  methods: {
    loadMore() {
      
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


