<template>
  <div class="hello">
    <d-player ref="player" :autoplay="autoplay" :video="video" @play="play" />
  </div>
</template>

<script>
import VueDPlayer from '@/components/VueDPlayerHls'
export default {
  name: 'HelloWorld',
  components: {
    'd-player': VueDPlayer
  },
  data() {
    return {
      video: {
        pic:
          'https://img.52swat.cn/upload/vod/20210303-1/1df872b96932638c34338be4c9ecd272.jpg',
        url: 'https://vod4.buycar5.cn/20210303/5fdtxUVJ/index.m3u8', // 播放视频的路径
        // thumbnails: 'https://img.52swat.cn/upload/vod/20210303-1/1df872b96932638c34338be4c9ecd272.jpg',
        type: 'hls'
      },
      autoplay: false,
      player: null
    }
  },
  mounted() {
    // this.player = this.$refs.player.dp;
    // console.log(this.player);
    // var hls = new Hls();
    // hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
    // hls.attachMedia(this.player);
  },
  methods: {
    play() {
      // console.log('开始播放...')
    }
  }
}
</script>
