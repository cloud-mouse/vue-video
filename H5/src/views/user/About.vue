<template>
  <div class="about">
    <div v-html="about" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      about: '关于我'
    }
  }
}
</script>

<style lang="scss">
  .about{
    padding: 20px;
  }
</style>
