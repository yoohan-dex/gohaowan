<template>
  <div class="wrap">
  <div class="like" v-show="!options.withoutLike" @click="handleFollow(item.id, 'activity', item.is_follow)">
    <img src="../assets/liked.svg" alt="">
    <p>{{item.follow_count}}</p>
  </div>
  <router-link :to="{ name: 'Activity-detail', params: { id: item.id }}" class="container">
    <div class="background" :style="{height: height + 'px'}" >
      <!-- <img :src="item.cover_image" class="background-image" :style="{width: '100%'}"> -->
      <div class="background-image" :style="{ height: height + 'px', backgroundImage: `url(${item.cover_image}), linear-gradient(to right, rgba(253, 218, 6, .5), rgba(0, 0, 0, 0))`}"  alt=""></div>
    </div>
    <div class="foreground">
      <div class="top">
        <div class="indicator">
          {{status}}
        </div>
        
      </div>
      
      <div class="bottom">
          <div class="title">{{item.title}}</div>
        <div class="other">
          <div class="location">
            <img class="icon" src="../assets/location.svg" alt="">
            {{item.address}}
          </div>
          <div class="price" v-show="item.can_join_online">
            {{item.join_fee}}元/位
          </div>
        </div>
      </div>
    </div>
  </router-link>
  </div>
</template>
<script>
const getStatus = status => {
  // 0未开始 1进行中 2已结束 3活动取消
  switch (status) {
    case 0:
    default:
      return '未开始';
    case 1:
      return '进行中';
    case 2:
      return '已结束';
    case 3:
      return '活动取消';
  }
};
export default {
  name: 'activity',
  props: {
    item: {
      type: Object,
      default: {
        title: '',
        address: '',
        like: '',
        join_fee: '',
        indicator: '',
        cover_image: '',
      },
    },
    handleFollow: {
      type: Function,
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    const rate = window.innerWidth / 16;
    this.height = rate * 9;
  },
  computed: {
    status() {
      return getStatus(this.item.status);
    },
  },
  data() {
    return {
      height: '',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
  width: 100%;

  .like {
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 20px;
    width: 60px;
    font-size: 12px;
    padding: 4px 10px;
    background: #ff5d57;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 15px;
      height: auto;
    }
    p {
      color: white;
      margin: 0;
    }
  }
}
.container {
  display: block;
  position: relative;
  width: 100%;
  color: white;
}
.background {
  width: 100%;
  height: auto;

  .background-image {
    width: 100%;
    background-size: contain;
    background-image: linear-gradient(
      to right,
      rgba(253, 218, 6, 0.5),
      rgba(0, 0, 0, 0)
    );
    background-blend-mode: saturation;
  }
}
.foreground {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0 15px;
  .indicator {
    font-size: 12px;
    background: #ff5d57;
    padding: 4px 10px;
    border-radius: 30px;
  }
}
.bottom {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  width: 100%;
  padding: 5px 7px 7px 20px;
  bottom: 0;
  background: rgba(20, 20, 20, 0.4);

  .title {
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .other {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .location {
      width: 60%;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .icon {
        margin-bottom: 3px;
      }
    }
    .price {
      bottom: 0;
      font-size: 20px;
      font-weight: bold;
      color: #ff5d57;
    }
  }
}
</style>

