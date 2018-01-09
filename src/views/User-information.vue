<template>
  <div class="bind-container">
  <p class="title">请填写您的个人信息</p>
  <p class="tip">以便我们更好地为您推荐活动</p>
  <input type="text" class="name" placeholder="填写您的昵称" v-model="name">
  <div class="options">
    <p>选择您的性别</p>
    <div class="sex">
      <div class="option" @click="handleSex(1)">
        <img v-show="sex=== 1" src="../assets/selected.svg" alt="">
        <img v-show="sex=== 2" src="../assets/unselected.svg" alt="">
        男
      </div>
      <div class="option" @click="handleSex(2)">
        <img v-show="sex===2" src="../assets/selected.svg" alt="">
        <img v-show="sex===1" src="../assets/unselected.svg" alt="">
        女
      </div>
    </div>
  </div>
  <button class="next" :disabled="disabled" @click="handleSubmit">下一步</button>
</div>
</template>
<script>
import api from '../api/wx';

export default {
  data() {
    return {
      name: '',
      sex: 1,
    };
  },
  computed: {
    disabled() {
      return !this.name;
    },
  },
  mounted() {
    if (this.$store.state.global.name) {
      this.$router.replace({ name: 'User-label' });
    }
  },
  methods: {
    handleSex(sex) {
      this.sex = sex;
    },
    async handleSubmit() {
      const res = await api.updateInfo({
        nickname: this.name,
        sex: this.sex,
      });
      if (res.code === 0) {
        this.$router.replace({ name: 'User-label' });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bind-container {
  input,
  button {
    outline: none;
  }
  text-align: center;
  padding: 50px 53px;
  .title {
    font-weight: bold;
    color: #333;
    font-size: 17px;
  }
  .tip {
    color: #666;
    font-size: 13px;
  }
  .name {
    border: 0;
    border-bottom: 1px solid #f2f2f2;
    padding: 5px 0;
    width: 100%;
  }
  .next {
    width: 250px;
    background: #fdda06;
    border: 0;
    border: 10px;
    height: 45px;
    margin-top: 100px;
    color: #666;
  }
  .next[disabled] {
    color: white;
    background: #f2f2f2;
  }
  .options {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    p {
      margin: 0;
    }
    .sex {
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .option {
      width: 50%;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }
  }
}
</style>


