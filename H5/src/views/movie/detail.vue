<template>
  <div class="video-detail">
    <div class="video-box">
      <d-player ref="player" :autoplay="autoplay" :video="video" @play="play" />
    </div>
    <div class="video-content">
      <div class="head-title">
        <div class="mv-cell">
          <span
            class="mv-name"
          >{{ movieDetail.name
          }}<span
            class="mv-recommend"
          >({{ movieDetail.recommend === '1' ? '已完结' : '连载中' }})</span></span>
          <span @click="showProfile = true">简介 <van-icon name="arrow" /></span>
        </div>
        <div class="mv-info">
          <span
            v-if="movieDetail.movieClass"
            class="mv-class"
          >分类：{{ movieDetail.movieClass.name }} |</span>
          <!-- <span class="mv-date"> 年份：{{ movieDetail.years }} |</span> -->
          <span class="mv-uptime">
            更新时间：{{ movieDetail.updateTime | timeFormat }}</span>
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
            v-for="(item, index) in movieEpisodes"
            :key="index"
            :class="['episodes-item', currentIndex === index ? 'active' : '']"
            @click="setCurrent(item, index)"
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
      <div class="description" v-html="movieDetail.description" />
    </van-popup>

    <!-- 影片剧集 -->
    <van-popup
      v-model="showAllEpisodes"
      closeable
      round
      position="bottom"
      style="height: 40%"
      @close="showAllEpisodes = false"
    >
      <div class="episodes-all">
        <div
          v-for="(item, index) in movieEpisodes"
          :key="index"
          :class="['episodes-item', currentIndex === index ? 'active' : '']"
          @click="setCurrent(item, index)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { movieApi, movieEpisodesApi } from '@/api/movie'
import VueDPlayer from '@/components/VideoPlayer/VueDPlayerHls'
import { formatTime } from '@/utils'
export default {
  name: 'VideoDetail',
  components: {
    'd-player': VueDPlayer
  },
  filters: {
    timeFormat(time) {
      return formatTime(new Date(time))
    }
  },
  data() {
    return {
      movieDetail: {},
      video: {
        pic: '',
        url: '', // 播放视频的路径
        type: 'hls'
      },
      autoplay: true,
      player: null,
      showProfile: false, // 显示简介
      showAllEpisodes: false, // 显示全部剧集
      currentIndex: 0,
      movieEpisodes: [],
      count: 0
    }
  },
  mounted() {
    this._initData()
  },
  methods: {
    play() {
      console.log('开始播放...')
    },
    async _initData() {
      await movieApi.getMovie({ id: this.$route.query.id }).then(res => {
        this.movieDetail = res.data
        this.video.pic = res.data.cover
      })

      await movieEpisodesApi
        .getMovieEpisodes({
          movie_id: this.$route.query.id
        })
        .then(res => {
          this.movieEpisodes = res.data.list
          this.count = res.data.count
          this.video.url = res.data.list[0].url
          this.$nextTick(() => {
            this.$refs.player._initPlayer()
          })
          document.title = `${this.movieDetail.name} - ${res.data.list[0].name}`
        })
    },
    // 设置当前播放集
    setCurrent(item, i) {
      this.video.url = item.url
      this.$nextTick(() => {
        this.$refs.player._initPlayer()
      })
      document.title = `${this.movieDetail.name} - ${item.name}`
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
        padding: 10px 15px 10px;
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
        .mv-recommend{
          font-size: 12px
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
  .title {
    padding: 15px 0;
    width: 100%;
    font-size: 18px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
  .description {
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
