<template>
  <div class="container">
    <div class="top">
      <p class="title">玩家评论</p>
      <p>
        <img src="../assets/comments.svg" alt="">
        评论
      </p>
    </div>
    <ul v-for="i in [1, 2, 3]" :key="i">
      <li>
        <div class="item">
          
          <div class="content-box">
            <div class="content-title">
              <div class="avatar">
                <img src="../assets/avatar.png" alt="">
                <p>一只无聊的蘑菇</p>
              </div>
              <small>2017-11-21 19:50</small>
            </div>
            <div class="content">
              发发发发发尼玛阿斯顿减肥 i阿斯顿减肥 i啊手机东方；啊接了；发但是家里啊减肥了撒娇地方；萨里德肌肤啊；类似的肌肤撒；两地分居阿三；老地方就
            </div>
          <div class="footer">
            <p class="zan">
              <img src="../assets/zan.svg" alt="">
              2
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
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
.container {
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
  padding: 25px 15px 0;
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


