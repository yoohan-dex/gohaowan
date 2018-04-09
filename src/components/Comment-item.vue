<template>
  <div class="item">
    <div class="content-box">
      <div class="content-title">
        <div class="avatar">
          <img :src="item.headimgurl" alt="">
          <p>{{item.nickname}}</p>
        </div>
        <small>{{item.time}}</small>
      </div>
      <div class="content">
        {{item.content}}
      </div>
      <div class="footer">
      <p class="zan">
        <img @click="handleUpvote(item)" src="../assets/zan.svg" alt="">
        {{item.upvote}}
      </p>
    </div>
      <div class="line"></div>
      <div class="source" :style="{height: height + 'px'}" @click="to(item.relation_id, item.type)">
        <img :src="item.cover_image"
          :style="{width: width + 'px', height: height + 'px'}" alt="">
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="footer">
            <p class="time">{{item.sourceTime}}</p>
            <div class="arrow">
              <img src="../assets/arrow2.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</template>
<script>
export default {
  name: 'comment-item',
  props: {
    item: {
      type: Object,
    },
    to: {
      type: Function,
    },
  },
  computed: {
    width() {
      return (window.innerWidth - 30) * 0.4;
    },
    height() {
      return this.width / 16 * 9; // eslint-disable-line no-mixed-operators
    },
  },
  methods: {
    handleUpvote(item) {
      const { id, type } = item;

      this.$store.dispatch('upvote', { id, type }).then(() => {
        this.item.upvote += 1;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 15px;
  background: white;
}
.avatar {
  display: flex;
  align-items: center;
  img {
    margin-right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
.content-box {
  margin-left: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 13px;
    p {
      font-size: 16px;
      font-weight: bold;
    }
    small {
      font-size: 14px;
    }
  }
  .content {
    padding: 0 0 0 35px;
    font-size: 13px;
    color: #666;
  }
}
.line {
  width: 100%;
  border-top: 1px solid #f2f2f2;
  margin-top: 5px;
  margin-bottom: 10px;
}
.source {
  position: relative;
  display: flex;
  width: 100%;
}
.right {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding-left: 10px;

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    position: absolute;
    bottom: 0;
    width: 100%;
    p {
      font-size: 12px;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: box;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .arrow {
      margin-right: 15px;
      img {
        width: 15px;
        margin-bottom: 3px;
      }
    }
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
  p {
    font-size: 12px;
  }
  .zan {
    img {
      width: 15px;
      margin-bottom: 3px;
    }
  }
}
</style>

