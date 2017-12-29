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
          <video ref="video" :src="item.video_url" :style="{width: '100%', height: height + 'px'}" ></video>
        </div>
      </div>
      <div class="cover-image" v-show="haveNotPlay && showType === 0">
        <img :src="item.cover_image" alt="">
      </div>
      <div class="top" v-show="!playing">
        <div class="like">
          <img src="../assets/liked.svg" alt="">
          <p>0</p>
        </div>
      </div>
      <div class="type" v-show="!playing">
        <div :class="{active: showType === 0}" @click="showType = 0">视频</div>
        <div :class="{active: showType === 1}" @click="showType = 1">图片</div>
      </div>
      <div class="play-controller" v-show="showPlay && showType === 0">
        <img v-show="!playing" src="../assets/play.svg" @click="handlePlay">
        <img v-show="playing" src="../assets/stop.svg" @click="handlePlay">
      </div>
    </div>
    <div class="text-box">
      <h2>{{item.title}}</h2>
      <p class="location">{{item.address}} </p>
      <p class="time">{{item.start_time}}至{{item.end_time}} </p>
      <p class="phone">80800808</p>
    </div>
  </div>
</template>
<script>
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
      showType: 0,
    };
  },
  mounted() {
    const rate = window.innerWidth / 16;
    this.height = rate * 9;
  },
  methods: {
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


