<template>
  <div class="user-login">
    用户登录
  </div>
</template>

<script>
import {} from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style></style>
