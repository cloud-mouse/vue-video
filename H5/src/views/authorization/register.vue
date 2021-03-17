<template>
  <div class="user-register">
    <svg-icon icon-class="yingshi" class-name="yingshi" />
    <div class="form-box">
      <div class="title">用户注册</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginForm.account"
          name="account"
          label="账号"
          placeholder="登录账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          name="password"
          label="密码"
          placeholder="登录密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="linear-gradient(to right, #335eea, #4d73edde)"
          >立即注册</van-button>
        </div>
      </van-form>
    </div>
    <div class="tips">
      已有账号？<span style="color: #335eea" @click="toLogin">去登录</span>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      }
    }
  },
  created() {},
  methods: {
    onSubmit(values) {
      this.$store.dispatch('user/register', values).then(res => {
        Toast(res.msg || '请求异常')
        Dialog.confirm({
          title: '注册成功',
          message: '是否需要使用注册的账号登录？'
        })
          .then(() => {
            // on confirm
            this.$store.dispatch('user/login', values).then(res => {
              Toast(res.msg)
              this.$router.push({ path: '/user' })
            })
          })
          .catch(() => {
            // on cancel
            this.toLogin()
          })
      })
    },
    toLogin() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-register {
  padding: 20px;
  text-align: center;
  background: linear-gradient(#f5f5f5, #fff);
  .yingshi {
    font-size: 64px;
    margin-bottom: 20px;
  }
  .form-box {
    padding: 40px 20px 20px;
    position: relative;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 0 5px 2px #f5f5f5;
    border-radius: 12px;
    .title {
      font-size: 24px;
      margin-bottom: 20px;
    }
  }
  .tips {
    font-size: 14px;
    color: #999;
    padding: 20px 0 0;
  }
}
</style>
