<template>
  <div class="movie-detail">
    <div class="video-box">
      <div
        ref="Dplayer_dom"
        class="video_box"
        style="width: 100%;height: 100%"
      />
      <img
        src="../../assets/images/bofang.png"
        class="bofang"
        width="50"
        height="50"
        alt=""
        @click="changeSource"
      >
    </div>
    <div class="content">
      <div class="header">
        <span>视频名称</span>
        <span>简介</span>
      </div>
      <div class="anthology">
        <div class="head-cell">全部</div>
        <div class="anthology-content">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DPlayer from 'dplayer'
export default {
  name: 'MovieDetail',
  data() {
    return {
      current_video:
        'https://vod5.wenshibaowenbei.com/20210223/YawTjtog/index.m3u8'
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.initDplayer()
    })
  },
  methods: {
    // 选择一个播放资源
    changeSource(video) {
      this.showVideo = true
      this.current_video =
        './index.m3u8'
      this.$nextTick(() => {
        this.initDplayer()
      })
    },
    // 初始化视频播放器
    initDplayer() {
      const _self = this
      const Dplayer_dom = this.$refs.Dplayer_dom
      this.Dplayer = new DPlayer({
        element: Dplayer_dom,
        video: {
          url: _self.current_video,
          // pic: _self.movie.cover,
          autoplay: true,
          lang: 'zh',
          screenshot: true,
          hotkey: true,
          preload: 'auto'
        },
        // 加载弹幕
        // danmaku: {
        //     id: '1',
        //     api: 'https://api.prprpr.me/dplayer/'
        // },
        contextmenu: [
          {
            text: '版本: v1.26.0',
            link: 'https://github.com/MoePlayer/DPlayer/releases'
          },
          {
            text: 'HTML5视频播放器',
            link: 'https://github.com/DIYgod/DPlayer'
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-detail {
  .video-box {
    height: 350px;
    position: relative;
    .bofang {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
