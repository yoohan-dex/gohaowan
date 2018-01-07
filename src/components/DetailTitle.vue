<template>
  <div class="wrap">
    <div class="content-box" :style="{height: height + 'px'}">
      <div class="background">
        <mt-swipe :show-indicators="false" :auto="0" v-show="showType === 1">
          <mt-swipe-item v-for="(image, i) in item.images" :key="i"> 
            <img class="swipe-image" :src="image" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <div class="video-box" @click="handleClick" v-show="showType === 0">
          <video id="video" ref="video" :style="{width: '100%', height: height + 'px'}" preload="auto" >
            <source type="video/mp4" :src="item.video_url">
            你的浏览器不支持视频播放
          </video>
        </div>
      </div>
      <div class="cover-image" v-show="haveNotPlay && showType === 0">
        <img :src="item.cover_image" alt="">
      </div>
      <div class="top" v-show="!playing">
        <div class="like">
          <img src="../assets/liked.svg" alt="">
          <p>{{item.upvote_count}}</p>
        </div>
      </div>
      <div class="type" v-show="!playing" v-if="item.video_url">
        <div :class="{active: showType === 0}" @click="handleTypeChange(0)">视频</div>
        <div :class="{active: showType === 1}" @click="handleTypeChange(1)">图片</div>
      </div>
      <div class="play-controller" v-show="showPlay && showType === 0" v-if="item.video_url">
        <img v-show="!playing" src="../assets/play.svg" @click="handlePlay">
        <img v-show="playing" src="../assets/stop.svg" @click="handlePlay">
      </div>
    </div>
    <div class="text-box">
      <h2>{{item.title}}</h2>
      <p class="location">
        <img src="../assets/location2.svg" alt="">
        {{item.address}} </p>
      <p class="time">
        <img src="../assets/time.svg" alt="">
        {{item.start_time}}至{{item.end_time}} </p>
      <div class="text-item">
        <p class="phone">
          <img src="../assets/phone.svg" alt="">
          80800808</p>
        <p class="status">{{status}}</p>
      </div>
    </div>
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
  name: 'detail-title',
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      height: '',
      playing: false,
      haveNotPlay: true,
      showPlay: true,
      showType: this.item.video_url ? 0 : 1,
    };
  },
  computed: {
    status() {
      return getStatus(this.item.status);
    },
  },
  mounted() {
    const rate = window.innerWidth / 16;
    this.height = rate * 9;
  },
  methods: {
    handleTypeChange(i) {
      this.showType = i;
      if (i === 1 && this.playing) {
        this.$refs.video.pause();
      }
    },
    handlePlay() {
      if (this.playing) {
        this.$refs.video.pause();
        this.showPlay = true;
        this.playing = false;
      } else {
        this.$refs.video.play();
        this.showPlay = false;
        this.playing = true;
        this.haveNotPlay = false;
      }
    },
    handleClick() {
      if (this.playing) {
        if (this.showPlay) {
          this.showPlay = false;
        } else {
          this.showPlay = true;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.swipe-image {
  width: 100%;
}
.wrap {
  background: white;
  width: 100%;
  margin-bottom: 8px;
  .content-box {
    width: 100%;
    height: 100%;
    position: relative;
    .background {
      width: 100%;
      height: 100%;
    }
    .cover-image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .foreground {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    // .controller {
    //   position: relative;
    //   width: 100%;
    //   height: 100%;

    .top {
      position: absolute;
      width: 100%;
      height: 50px;
      top: 0;
      display: flex;
      justify-content: flex-end;
      padding: 7px 24px 0 0;
      .like {
        width: 60px;
        height: 25px;
        padding: 0 10px 0 10px;
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
        }
      }
    }
    // }
    .type {
      position: absolute;
      bottom: 0;
      height: 50px;
      width: 100%;
      padding: 10px 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        padding: 3px 15px;
        border-radius: 15px;
        color: #555;
        background: rgba(255, 255, 255, 0.5);
        font-size: 14px;
      }
      .active {
        background-image: linear-gradient(
          to right,
          #d4504b,
          #ec6d3f,
          #fc8f2f,
          #ffb419,
          #fdda06
        );
        color: white;
      }
    }
    .play-controller {
      img {
        position: absolute;
        width: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }
    }
  }
  .text-box {
    padding: 7px 15px 20px;
    img {
      width: 12px;
      margin-bottom: 3px;
    }
    .text-item {
      display: flex;
      justify-content: space-between;

      .status {
        font-size: 12px;
        padding: 2px 4px;
        color: #ff5d57;
        border: 2px solid #ff5d57;
        border-radius: 6px;
      }
    }
  }
  h2 {
    font-size: 18px;
    margin: 3px 0 0;
  }
  p {
    font-size: 14px;
  }
  .location {
    margin: 9px 0 0;
  }
  .time {
    margin: 12px 0 0;
  }
  .phone {
    margin: 13px 0 0;
  }
}
</style>


