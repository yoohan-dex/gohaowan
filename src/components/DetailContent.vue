<template>
  <div class="inner-container">

    <div class="member-list" v-if="member && data.join_list && data.join_list.length > 0" @click="handleMember">
      <div class="left" v-if="options.type === 'activity'">
        已报名 {{data.join_list.length}} {{data.join_limit_number > 0 ? '/' + data.join_limit_number : ''}}
      </div>
      <div class="left" v-else-if="options.type === 'store'">
        玩过的玩家
      </div>

      <div class="right">
        <div class="avatar-list">
          <img v-for="(item, i) in data.join_list.filter((v, i) => i < 5)" :key="i" :src="item.headimgurl" alt="" class="avatar">
        </div>
        <img class="member-arrow" src="../assets/arrow2.svg" alt="">
      </div>
    </div>
    <div class="store-activity" v-show="options.type === 'store'">
      <div class="title">
        <div class="left">相关活动</div>
        <div class="right">更多<img class="member-arrow" src="../assets/arrow2.svg" alt=""></div>
      </div>
      <div class="activity-wrap">
        <div class="activity" v-if="activityList" v-for="(item, i) in activityList" :key="i" @click="handleDetail(item.id)">
          <img :src="item.cover_image" alt="">
          <div class="text-wrap">
            <div class="activity-title">{{item.title}}</div>
            <div class="activity-time">{{item.time}}</div>
            <div class="activity-price">{{item.join_fee}}元/位</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box">
    <div class="content richtext" v-html="data.content">
      
    </div>
    <div class="tags">
      <span v-for="(item , i) in data.tag_list" :key="i" @click="handleTag(item.id)">#{{item.name}}</span>
    </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'detail-content',
  data() {
    return {
      activityList: [],
    };
  },
  props: {
    data: {
      type: Object,
    },
    member: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
      default() {
        return {
          type: 'activity',
        };
      },
    },
  },
  updated() {
    this.length = this.data.join_list.length;
    this.limit = this.data.join_limit_number;
  },
  mounted() {},
  watch: {
    data(val, old) {
      if (val.activity_list !== old.activity_list) {
        this.activityList = val.activity_list.map(v => ({
          ...v,
          time: moment(v.start_time * 1000).format('YYYY-MM-DD'),
        }));
      }
    },
  },
  methods: {
    handleMember() {
      this.$router.push({
        name: 'activityJoined',
        params: {
          type: this.options.type,
          length: this.length,
          limit: this.limit,
        },
      });
    },
    handleDetail(id) {
      this.$router.push({
        name: 'Activity-detail',
        params: {
          id,
        },
      });
    },
    handleTag(id) {
      this.$router.push({
        name: 'Tag-activity',
        params: { id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.inner-container {
  background: white;
}
.member-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 15px;
  .left {
    font-size: 14px;
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-list {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
.member-arrow {
  width: 15px;
  height: auto;
}
.store-activity {
  width: 100%;
  background: #f2f2f2;
  padding: 15px 15px;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .member-arrow {
      width: 15px;
      height: 15px;
      position: relative;
      top: -2px;
    }
    .left {
      color: #333;
      font-size: 18px;
    }
    .right {
      color: #666;
    }
  }
  .activity-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .activity {
    width: 47%;
    flex-shrink: 0;
    background: white;
    margin: 10px 0;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
    }
    .text-wrap {
      padding: 5px 3px;
      .activity-title {
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: box;
        display: -webkit-box;
        line-clamp: 1;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .activity-time {
        font-size: 13px;
        color: #666;
      }
      .activity-price {
        font-size: 20px;
        color: #d4504b;
        text-align: right;
      }
    }
  }
}
.content-box {
  display: block;
  p {
    display: inline-block;
    width: 100%;
  }
  padding: 13px 15px;
}
.content {
  display: block;

  * {
    color: #333333;
  }
  img,
  .wscnph {
    position: relative;
    width: 100%;
    height: auto;
  }
}
.tags {
  padding: 40px 0 20px;

  span {
    text-decoration: underline;
    color: #639ae7;
    margin-right: 20px;
  }
}
</style>

