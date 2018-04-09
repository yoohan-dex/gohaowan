<template>
  <div class="bind-container">
    <p class="title">选择5个您对自己的定义</p>
    <p class="tip">以便我们更好地为您推荐活动</p>
    <div class="label">
      <div class="item" v-for="(item, i) in tags" :key="item.id" @click="handleSelect(i)">
        <img :src="item.image_url" alt="">
        <img class="check" v-show="item.selected" src="../assets/check.svg" alt="">
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
      tags: [],
    };
  },
  mounted() {
    this.getTag();
  },
  computed: {
    disabled() {
      return this.selected.lenght < 1;
    },
    selected() {
      const selected = [];
      this.tags.forEach(v => {
        if (v.selected) {
          selected.push(v.id);
        }
      });
      return selected;
    },
  },
  methods: {
    async getTag() {
      const res = await api.getTag();
      const data = res.data.map(v => ({ ...v, selected: false }));
      this.tags = data;
    },
    async handleSubmit() {
      const res = await api.setTag({
        tags: this.selected,
      });
      if (res.code === 0) {
        this.login();
      }
    },
    async login() {
      const $router = this.$router;
      this.$store.dispatch('getUserInfo', { $router, goIndex: true });
    },
    handleSelect(i) {
      if (this.selected.length < 5) {
        this.tags[i].selected = !this.tags[i].selected;
      } else if (this.tags[i].selected) {
        this.tags[i].selected = false;
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
  padding: 30px 0;
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
    width: 80%;
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

  .label {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      position: relative;
      width: 20%;
      margin: 2.5%;
      img {
        width: 100%;
      }
      .check {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>


