<template>
  <ul class="grid grid--type-a" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="height: 300px">
    <div class="grid__sizer"></div>
    <li class="grid__item" v-for="(item, i) in list" :key="i" @click="!edit && handleDetail(item.id)">
      <a class="grid__link">
        <img class="grid__img" @click="edit && handleDetail(item.id)" :src="item.cover_image" alt="">
        <div class="content">
          <p>{{item.description}}</p>
        </div>
        <div class="footer">
          <div class="left" v-show="!edit">
          <img :src="item.headimgurl" alt="" class="head">
          <span>{{item.nickname}}</span>
          </div>
          <div class="right">
            <img src="../assets/like.svg" alt="" class="heart">
            <span>{{item.upvote_number}}</span>
          </div>
          <div class="option" v-show="edit">
            <!-- <img src="../assets/more.svg" alt=""> -->
            <span class="menu" @click="handleDel(item.id)">
              删除
            </span>
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>
<script>
import imagesloaded from 'imagesloaded';
import Masonry from 'masonry-layout';

export default {
  name: 'people-list',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    loadMore: {
      type: Function,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      top: [],
    };
  },
  updated() {
    // this.msnry.
    imagesloaded('.grid', () => {
      this.msnry = new Masonry('.grid', {
        itemSelector: '.grid__item',
        columnWidth: '.grid__sizer',
        percentPosition: true,
        transitionDuration: 0,
        gutter: 0,
      });
      // grids.forEach(grid => {
      //   const m = new Masonry(grid, {
      //     itemSelector: '.grid__item',
      //     columnWidth: '.grid__sizer',
      //     percentPosition: true,
      //     transitionDuration: 0,
      //   });
      //   masonry.push(m);
      //   // Hide the grid.
      //   grid.classList.add('grid--hidden');
      //   // Init GridLoaderFx.
      // });
      // grids[currentGrid].classList.remove('grid--hidden');
      // Init/Bind events.
      // Remove loading class from body
    });
  },
  mounted() {
    imagesloaded('.grid', () => {
      this.msnry = new Masonry('.grid', {
        itemSelector: '.grid__item',
        columnWidth: '.grid__sizer',
        percentPosition: true,
        transitionDuration: 0,
      });
      // grids.forEach(grid => {
      //   const m = new Masonry(grid, {
      //     itemSelector: '.grid__item',
      //     columnWidth: '.grid__sizer',
      //     percentPosition: true,
      //     transitionDuration: 0,
      //   });
      //   masonry.push(m);
      //   // Hide the grid.
      //   grid.classList.add('grid--hidden');
      //   // Init GridLoaderFx.
      // });
      // grids[currentGrid].classList.remove('grid--hidden');
      // Init/Bind events.
      // Remove loading class from body
    });
    // console.log(masonry);
  },
  methods: {
    handleDetail(id) {
      this.$router.push({
        name: 'Hot-detail',
        params: {
          id,
        },
      });
    },
    handleDel(id) {
      this.$store.dispatch('deleteHot', { id });
    },
  },
};
</script>
<style lang="scss" scoped>
.grid {
  position: relative;
  z-index: 0;
  display: block;
  min-height: 130%;
  margin: 7px auto 0;
}
.grid .grid__item,
.grid .grid__sizer {
  position: absolute;
  width: calc(50% - 20px);
  margin: 0 10px 10px;
}

.grid__item {
  background: white;
  border-radius: 5px;
  overflow: hidden;
}

.grid__link,
.grid__img {
  display: block;
}

.grid__img {
  width: 100%;
}
.grid__img {
  width: 100%;
}
.content,
.footer {
  padding: 0 10px;
}
.content p {
  font-size: 13px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.footer {
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  span {
    font-weight: bold;
    font-size: 13px;
    color: #333;
  }
  img.heart {
    width: 15px;
  }
}
.right {
  span {
    color: #d4504b;
  }
}

.option {
  position: relative;
  display: flex;
  img {
    width: 13px;
  }
  .menu {
    font-weight: bold;
    font-size: 13px;
    color: #333;
    line-height: 2.5;
    // position: absolute;
    // top: -20px;
    // left: -20px;
    // width: 100px;
    // height: 50px;
  }
}
</style>


