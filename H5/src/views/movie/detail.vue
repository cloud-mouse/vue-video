<template>
  <div class="video-detail">
    <div class="video-box">
      <d-player ref="player" :autoplay="autoplay" :video="video" @play="play" />
    </div>
    <div class="video-content">
      <div class="head-title">
        <div class="mv-cell">
          <span class="mv-name">{{ mvInfo.name }}</span>
          <span @click="showProfile = true">简介 <van-icon name="arrow" /></span>
        </div>
        <div class="mv-info">
          <span class="mv-class">分类：影片分类 |</span>
          <span class="mv-date"> 年份：2021 |</span>
          <span class="mv-uptime"> 更新时间：2021-3-4</span>
        </div>
      </div>
      <div class="mv-episodes">
        <div class="head-title">
          <span>剧集</span>
          <span
            @click="showAllEpisodes = true"
          >查看全部 <van-icon
            name="arrow"
          /></span>
        </div>
        <div class="episodes-list">
          <div
            v-for="(item, index) in 32"
            :key="index"
            :class="['episodes-item', currentIndex === index ? 'active' : '']"
            @click="setCurrent(index)"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </div>
    
    <van-popup
      v-model="showProfile"
      closeable
      round
      position="bottom"
      style="height: 40%"
      @close="showProfile = false"
    >
     <div class="title">简介</div>
     <div class="description" v-html="mvInfo.description"></div>
    </van-popup>

    <!-- 影片剧集 -->
    <van-popup
      v-model="showAllEpisodes"
      closeable
      round
      position="bottom"
      @close="showAllEpisodes = false"
    >
      <div class="episodes-all">
        <div
          v-for="(item, index) in 32"
          :key="index"
          :class="['episodes-item', currentIndex === index ? 'active' : '']"
          @click="setCurrent(index)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import VueDPlayer from '@/components/VideoPlayer/VueDPlayerHls'
export default {
  name: 'VideoDetail',
  components: {
    'd-player': VueDPlayer
  },
  data() {
    return {
      mvInfo: {
        name: '赘婿',
        description: '撒大声地按实际符合噶几会覆盖加工时费的话就按个讲话稿萨计划发噶机会市房管局好 <br> niashdiasd '
      },
      video: {
        pic:
          'https://img.52swat.cn/upload/vod/20210303-1/1df872b96932638c34338be4c9ecd272.jpg',
        url: 'https://vod4.buycar5.cn/20210303/5fdtxUVJ/index.m3u8', // 播放视频的路径
        type: 'hls'
      },
      autoplay: false,
      player: null,
      showProfile: false, // 显示简介
      showAllEpisodes: false, // 显示全部剧集
      currentIndex: 0
    }
  },
  methods: {
    play() {
      console.log('开始播放...')
    },
    // 设置当前播放集
    setCurrent(i) {
      this.currentIndex = i
      this.showAllEpisodes = false
    }
  }
}
</script>

<style lang="scss">
.video-detail {
  padding-bottom: 50px;
  .video-content {
    .head-title {
      padding: 10px 0;
      .mv-cell {
        display: flex;
        justify-content: space-between;
        align-content: center;
        padding: 10px 15px 0;
        font-size: 14px;
        color: #999;
        span {
          display: inline-block;
          vertical-align: middle;
          line-height: 14px;
        }
        .mv-name {
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
      }
      .mv-info {
        padding: 0 15px;
        span {
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: #9999;
          margin-right: 5px;
        }
      }
    }
    .mv-episodes {
      padding: 0 15px;
      font-size: 14px;
      .head-title {
        display: flex;
        justify-content: space-between;
        line-height: 14px;
        span {
          color: #999;
          display: inline-block;
          vertical-align: middle;
          &:first-child {
            font-size: 16px;
            color: #333;
            font-weight: bold;
          }
        }
      }
      .episodes-list {
        white-space: nowrap;
        width: 345px;
        overflow-y: hidden;
        overflow-x: scroll;
        padding: 10px 0;
        .episodes-item {
          display: inline-block;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 6px;
          margin-right: 10px;
          border: 1px solid #f5f5f5;
          font-size: 14px;
          color: #999;
          &.active {
            border-color: #335eea;
            color: #335eea;
            background: rgba(51, 94, 234, 0.1);
          }
        }
      }
    }
    .van-icon {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      line-height: 10px;
    }
  }
  .title{
    padding: 15px 0;
    width: 100%;
    font-size: 18px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
  .description{
    padding: 10px;
    font-size: 16px;
    color: #666;
  }
  .episodes-all {
    display: flex;
    flex-flow: wrap;
    padding: 50px 35px;
    .episodes-item {
      display: inline-block;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 6px;
      margin-right: 10px;
      margin-bottom: 10px;
      border: 1px solid #f5f5f5;
      font-size: 14px;
      color: #999;
      &:nth-child(6n) {
        margin-right: 0;
      }
      &.active {
        border-color: #335eea;
        color: #335eea;
        background: rgba(51, 94, 234, 0.1);
      }
    }
  }
}
</style>
