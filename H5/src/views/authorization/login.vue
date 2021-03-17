<template>
  <div class="user-login">
    <svg-icon icon-class="yingshi" class-name="yingshi" />
    <div class="form-box">
      <div class="title">用户登录</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginForm.account"
          name="account"
          label="账　号"
          placeholder="登录账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          name="password"
          label="密　码"
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
          >提交</van-button>
        </div>
      </van-form>
    </div>
    <div class="tips">还没有账号？<span @click="toRegister" style="color: #335eea">马上注册</span></div>
  </div>
</template>

<script>
import { Toast } from 'vant'
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
      this.$store.dispatch('user/login', values).then(res=>{
        Toast(res.msg || '请求异常')
        this.$store.dispatch('user/getInfo').then(res=>{
          this.$router.push('/user')
        })
      })
    },
    toRegister() {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-login {
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
  .tips{
    font-size: 14px;
    color: #999;
    padding: 20px 0 0;
  }
}
</style>
