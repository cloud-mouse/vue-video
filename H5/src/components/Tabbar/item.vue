<template>
  <div class="itemWarp flex_mid" @click="changePage">
    <!-- <span v-show="!bol">
      <slot name="normalImg" />
    </span>
    <span v-show="bol">
      <slot name="activeImg" />
    </span> -->
    <span :class="{active: bol==true}" v-text="txt" />
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'Item',
  props: {
    txt: {
      type: String,
      default: '首页'
    },
    page: {
      type: String,
      default: '/'
    },
    sel: {
      type: String,
      default: '/'
    }
  },
  computed: {
    bol() {
      if (this.sel === this.page) {
        return true
      }
      return false
    }
  },
  methods: {
    changePage() {
      // if (this.bol === false) {
      //   // 点击跳转对应的页面
      //   this.$router.push(this.page).catch(data => {})
      //   this.$emit('change', this.page)
      // }
      this.$router.push(this.page).catch(data => {})
      this.$emit('change', this.page)
    }
  }
}
</script>
<style type="text/css" lang="scss">
.itemWarp {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  span {
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    color: #333;
    &:hover{
      background: #f5f5f5;
      border-radius: 6px;
    }
    &.active{
      color: rgb(51, 94, 234);
    }
  }
}
</style>
