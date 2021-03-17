<template>
  <div class="user-info">
    <div class="info-cell">
      <span>头像</span>
      <div class="avatar">
        <van-uploader
          v-model="avatar"
          multiple
          :after-read="onRead"
          accept="image/*"
          :preview-full-image="false"
          :max-count="1"
        />
      </div>
    </div>
    <van-cell-group>
      <van-field
        v-model="userInfo.nickName"
        label="昵称"
        placeholder="请输入昵称"
        input-align="right"
      />
      <van-field
        v-model="userInfo.realName"
        label="真实姓名"
        placeholder="请输入昵称"
        input-align="right"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="info"
        native-type="submit"
        color="linear-gradient(to right, #335eea, #4d73edde)"
        @click="submit"
      >保存</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateUser } from '@/api/user'
import { uploadImg } from '@/api/common'
import { Toast } from 'vant'
export default {
  name: 'UserInfo',
  data() {
    return {
      avatar: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.avatar = this.$store.state.user.avatar
      ? [{ url: this.$store.state.user.avatar }]
      : []
  },
  methods: {
    submit() {
      // 更新用户信息
      updateUser(this.userInfo).then(res => {
        Toast(res.msg || '修改成功')
      })
    },
    onRead(file) {
      var formData = new FormData() // 构造一个 FormData，把后台需要发送的参数添加
      formData.append('file', file.file) // 接口需要传的参数
      uploadImg(formData).then(res => {
        Toast(res.msg || '上传成功')
        this.userInfo.avatar = res.data.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  padding: 20px;
  .info-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 10px 0 10px 16px;
  }
}
</style>
