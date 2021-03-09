<template>
  <div class="dplayer" />
</template>

<script>
import DPlayer from 'dplayer'
export default {
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    video: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dp: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initPlayer()
    })
    // 以下为隐藏一些作者的信息和视频播放源 如不需要可删除
    document.querySelector('.dplayer-menu').remove() // 隐藏右键菜单
    document.querySelector('.dplayer-mask').remove() // 隐藏遮罩
    document.querySelector('.dplayer-info-panel-item-url').remove() // 隐藏播放源
  },
  methods: {
    _initPlayer() {
      const player = (this.dp = new DPlayer({
        element: this.$el,
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: '#335eea', // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: 'zh-cn', // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: true, // 自动预加载
        volume: 0.7, // 初始化音量
        autoplay: this.autoplay,
        video: {
          pic: this.video.pic,
          url: this.video.url,
          // thumbnails: this.video.thumbnails,
          type: this.video.type
        }
      }))
      player.on('play', () => {
        this.$emit('play')
      })
      player.on('quality_start', () => {
        this.$emit('quality_start')
        player.on('play')
      })
      player.on('pause', () => {
        this.$emit('pause')
      })
      player.on('canplay', () => {
        this.$emit('canplay')
      })
      player.on('playing', () => {
        this.$emit('playing')
      })
      player.on('ended', () => {
        this.$emit('ended')
      })
      player.on('error', () => {
        this.$emit('error')
      })
    }
  }
}
</script>
<style lang="scss">
.dplayer {
  .dplayer-video {
    min-height: 220px;
  }
}
</style>
