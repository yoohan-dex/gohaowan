<template>
  <div class="new">
    <textarea
      class="textarea"
      auto-focus
      v-model="form.description"
      maxlength="-1"
      placeholder="这一刻的想法"
      placeholder-style="color: #999;">
    </textarea>
    <div class="image-list">
      <!-- preview the image which already be choosed -->
      <div
        class="choosed-image-list"
        v-for="(image, idx) in images"
        :key="idx">
        <img
          :src="image"
          class="choosed-image">
        <div
          class="choosed-image-delete-btn"
          @click="deleteImage(idx)">
          <img
            class="choosed-image-delete-btn-icon"
            src="../assets/delete.svg">
        </div>
      </div>
      <!-- image choosing btn -->
      <div
        class="choose-image-btn"
        v-if="images.length < 9"
        @click="chooseImage">
        <img
          class="choose-image-btn-icon"
          src="../assets/choose-image.svg">
      </div>
    </div>
    <div class="tag-choose" @click="toTag">
      <div class="item">
        <img src="../assets/tag.svg" alt="">
        关联标签
      </div>
      <img src="../assets/arrow2.svg" alt="">
    </div>
    <div class="submit-btn">
      <button
        type="primary"
        size="default"
        @click="send"
        class="submit"
        :disabled="disabled">
        发送
      </button>
    </div>
    <mt-popup
      class="page-popup"
      v-model="selectingTag"
      position="right"
    >
    <div class="tag-box">
      <div class="tag-item" v-for="(item , i) in tags" :key="i" @click="handleSelected(i)">
        <p >{{item.name}}</p>
        <img v-show="item.selected" src="../assets/choose.svg" alt="">
      </div>
      <div class="actions" >
        <p @click="cancelTag">取消</p>
        <p @click="handleConfirm">确认</p>
      </div>
    </div>
    
    </mt-popup>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';

import apiwx from '../api/wx';
import api from '../api/hot';
import activityApi from '../api/activity';

export default {
  name: 'moment',
  data() {
    return {
      form: {
        type: 1,
        description: '',
        images: [],
        tags: '',
        address: '',
      },
      type: 1,
      description: '',
      images: [],
      tags: '',
      address: '',
      location: '',
      latitude: '',
      longitude: '',
      disabled: false,
      uploading: false,
      localIds: [],
    };
  },
  mounted() {
    this.getTags();
  },
  computed: {
    selectingTag() {
      return this.$route.name === 'Moment-tag';
    },
  },
  watch: {
    async uploading(val, old) {
      if (!val && old) {
        const res = await api.add(this.form);
        if (res.code === 0) {
          this.form = {
            type: 1,
            description: '',
            images: [],
            tags: '',
            address: '',
          };
          this.images = [];
          this.$router.back();
          this.$store.dispatch('reloadList');
        }
      }
    },
  },
  methods: {
    toTag() {
      this.$router.push({
        name: 'Moment-tag',
      });
    },
    async getTags() {
      const res = await activityApi.getTags();
      this.tags = res.data.map(v => ({
        ...v,
        selected: false,
      }));
    },
    cancelTag() {
      this.$router.back();
    },
    chooseImage() {
      wx.chooseImage({
        count: 9 - this.localIds.length,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          this.localIds.push(...res.localIds); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          this.setImages(res.localIds);
        },
      });
    },
    setImages(localIds) {
      if (window.whatdevice.isiOS) {
        if (localIds.length > 0) {
          wx.getLocalImgData({
            localId: localIds.shift(),
            success: res => {
              this.images.push(res.localData);
              this.setImages(localIds);
            },
          });
        }
      } else {
        this.images.push(localIds);
      }
    },
    handleSelected(idx) {
      this.tags[idx].selected = !this.tags[idx].selected;
    },
    deleteImage(idx) {
      this.images.splice(idx, 1);
      this.localIds.splice(idx, 1);
    },
    uploadImages(idx) {
      if (this.localIds.length > idx) {
        this.uploading = true;
        wx.uploadImage({
          localId: this.localIds[idx], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: async res => {
            const serverId = res.serverId; // 返回图片的服务器端ID
            const response = await apiwx.uploadImage(serverId);
            this.form.images.push(response.data);
            this.uploadImages(idx + 1);
          },
        });
      } else {
        this.uploading = false;
      }
    },
    handleConfirm() {
      this.form.tags = this.tags.filter(v => v.selected);
      this.$router.back();
    },
    async send() {
      if (this.form.description.length >= 5 && this.images.length > 0) {
        this.uploadImages(0);
      } else {
        if (this.form.description.length < 5) {
          alert('动态需要5个字以上'); // eslint-disable-line no-alert
        }
        if (this.images.length < 1) {
          alert('至少要一张照片'); // eslint-disable-line no-alert
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.new {
  width: 100%;

  .textarea {
    padding: 15px;
    width: 100%;
    color: #333;
    min-height: 120px;
    background: #fff;
    font-size: 16px;
    line-height: 36px;
    resize: none;
    outline: none;
    border: 0;
  }

  .image-list {
    padding: 15px;
    padding-top: 0;
    width: 100%;
    background: #fff;
    overflow: hidden;

    .choosed-image-list {
      position: relative;
      float: left;
      width: 70px;
      height: 70px;
      margin-right: 15px;
      margin-top: 15px;

      .choosed-image {
        width: 100%;
        height: 100%;
      }

      .choosed-image-delete-btn {
        position: absolute;
        right: -10px;
        top: -10px;
        width: 20px;
        height: 20px;
      }

      .choosed-image-delete-btn-icon {
        width: 20px;
        height: 20px;
      }
    }

    .choose-image-btn {
      float: left;
      width: 70px;
      height: 70px;
      margin-top: 15px;

      .choose-image-btn-icon {
        width: 70px;
        height: 70px;
      }
    }
  }

  .isanonymous {
    background: #fff;
    padding: 15px;
    padding-top: 0;
    overflow: hidden;

    .location {
      float: left;
      width: 250px;
      height: 32px;

      .location-icon {
        width: 32px;
        height: 32px;
        vertical-align: middle;
      }

      text {
        font-size: 14px;
        line-height: 32px;
        color: #666;
      }
    }
    .location-active {
      text {
        font-weight: bold;
        color: #fa6570;
      }
    }

    .isanonymous-btn {
      position: relative;
      float: right;
      width: 66px;
      height: 32px;
      padding: 0 6px;
      border-radius: 18px;
      transition: all 300ms ease;

      text {
        color: #fff;
        font-size: 12px;
        line-height: 32px;
      }
      .anonymous-text {
        float: left;
      }
      .named-text {
        float: right;
      }

      .isanonymous-btn-key {
        position: absolute;
        left: 1px;
        top: 1px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
        transition: all 300ms ease;
      }
    }
    .anonymous {
      background: #fa6570;

      .isanonymous-btn-key {
        transform: translateX(34px);
      }
    }
    .named {
      background: #2ecc71;

      .isanonymous-btn-key {
        transform: translateX(0);
      }
    }
  }

  .submit-btn {
    margin: 0 auto;
    margin-top: 20px;
    width: 90%;

    .submit {
      width: 80%;
      margin: 50px 10%;
      background: #fdda06;
      padding: 15px;
      border: 0;
      border-radius: 5px;
      outline: none;
    }

    button[disabled][type='primary'] {
      opacity: 0.7;
    }
  }
}

.tag-choose {
  border-top: 1px solid #f2f2f2;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 15px;
    height: 15px;
  }
  .item {
    display: flex;

    align-items: center;
    img {
      margin-right: 9px;
    }
  }
}
.page-popup {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: scroll;
}
.select-tag {
  position: relative;
  width: 100px;
  height: 100px;
  background: white;
}
.tag-box {
  .actions {
    padding: 0 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    p {
      font-size: 20px;
      padding: 10px 20px;
      text-align: center;
      border-radius: 5px;
    }
    p:nth-child(1) {
      width: 33%;
      background: #d1d4db;
    }
    p:nth-child(2) {
      width: 65%;
      background: #fdda06;
    }
  }
}
.tag-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 15px;
  color: #333;
  p {
    font-size: 18px;
  }

  img {
    width: 20px;
  }
}
</style>
