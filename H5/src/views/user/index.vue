<template>
  <div class="user-view">
    <div class="top-info">
      <img class="user-avator" :src="avatar || require('../../assets/images/avatar.png')" alt="">
      <div v-if="userInfo.account" class="accout-info">
        <p class="user-name" @click="toUserInfo">{{ name || '完善信息 >' }}</p>
        <p v-if="userInfo.account" class="user-account">
          账号：{{ userInfo.account }}
        </p>
      </div>
      <div v-else class="accout-info" @click="toLogin">
        去登录
      </div>
    </div>
    <div class="content-view">
      <div class="cell-box">
        <!-- <cell-item icon-name="site-icon" left-text="地址管理" path="/addressList" /> -->
        <cell-item left-text="关于我们" path="/about" />
        <cell-item left-text="意见建议" path="/feedback" />
      </div>
    </div>

    <div class="logout" v-if="userInfo.account">
      <span @click="logout">退出登录</span>
    </div>
  </div>
</template>

<script>
import CellItem from '@/components/Cell/CellItem'
import { mapGetters } from 'vuex'
export default {
  components: {
    CellItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'userInfo'])
    // name() {
    //   return this.data
    // }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('user/getInfo')
    },
    toUserInfo() {
      this.$router.push({ path: '/userInfo' })
    },
    logout() {
      this.$store.dispatch('user/logout')
    },
    // 去登录
    toLogin() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-view {
  .top-info {
    background: #fff;
    padding: 30px 20px;
    border-bottom: 10px solid #f5f5f5;
    img.user-avator {
      width: 60px;
      height: 60px;
      display: inline-block;
      vertical-align: middle;
      border-radius: 50%;
      border: 1px solid #f5f5f5;
    }
    .accout-info {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
      width: 70%;
      padding-left: 20px;
      p {
        margin: 0;
        padding: 5px 0;
        color: #333;
      }
      p.user-account {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .content-view {
    padding: 10px;
    position: relative;
    .order-cell {
      padding: 10px 20px;
      border-radius: 10px;
      box-shadow: 0px 2px 15px #887d7d;
      position: absolute;
      width: 95%;
      box-sizing: border-box;
      top: -48px;
      background: #fff;
      &-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        padding: 10px 0;
        .left-text {
          color: #000;
          font-size: 16px;
        }
        .right-text {
          color: #666;
          font-size: 14px;
          text-align: right;
        }
      }
      .cell-item-box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 10px 0;
        .cell-item {
          width: 25%;
          text-align: center;
          font-size: 24px;
          p {
            font-size: 12px;
            margin: 5px;
          }
        }
      }
    }
  }
  .logout{
    padding: 20px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  .cell-box {
    padding: 0 10px;
    border-radius: 10px;
    background: #fff;
    .cell-item {
      border: none;
      padding: 10px 0;
    }
  }
}
</style>
