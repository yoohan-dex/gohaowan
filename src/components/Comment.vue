<template>
  <div class="inner-container" :style="{backgroundColor: options.type === 'moment' ? '#f2f2f2' : ''}">
    <div class="top" v-show="options.type !== 'moment'">
      <p class="title">玩家评论</p>
      <p @click="handleClick">
        <img src="../assets/comments.svg" alt="">
        评论
      </p>
    </div>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li  v-for="(v, i) in list" :key="i">
        <div class="item" :style="{padding: options.type === 'moment' ? '0 0 5px 0' : '', borderBottom: options.type === 'moment' ? '1px solid #ddd' : ''}">
          <div class="content-box">
            <div class="content-title">
              <div class="avatar" @click="userDetail(v.user_id)">
                <img :src="v.headimgurl" alt="">
                <p>{{v.nickname}}</p>
              </div>
              <small>{{v.create_time}}</small>
            </div>
            <div class="content">
              {{v.content}}
            </div>
          <div class="footer">
            <p class="zan">
              <img @click="handleUpvote(v.id)" src="../assets/zan.svg" alt="">
              {{v.upvote}}
            </p>
          </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'comment',
  props: {
    loadMore: {
      type: Function,
    },
    item: {
      type: Object,
    },
    list: {
      type: Array,
    },
    handleComment: {
      type: Function,
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
  methods: {
    handleClick() {
      this.handleComment();
      // MessageBox.prompt('评论', '请输入评论').then(
      //   async ({ value, action }) => {
      //     if (value && action === 'confirm') {
      //       const res = await api.comment(
      //         this.item.id,
      //         this.options.type,
      //         value,
      //       );
      //       if (res.code === 0) {
      //         MessageBox('提示', '评论成功');
      //         this.reload();
      //       }
      //     }
      //   },
      // );
    },
    handleUpvote(id) {
      this.$store.dispatch('upvote', { id, type: this.options.type });
    },
    userDetail(id) {
      this.$router.push({
        name: 'User-detail',
        params: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
.inner-container {
  width: 100%;
  margin-top: 8px;
  background: white;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 15px;

  border-bottom: 1px solid #f2f2f2;
  .title {
    font-weight: bold;
    font-size: 18px;
  }
  p {
    font-size: 15px;
  }
  img {
    width: 16px;
    margin-bottom: 3px;
  }
}
.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 15px;
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
}
ul {
  margin-top: 0;
  margin-bottom: 0;
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  width: 100%;
}
</style>


