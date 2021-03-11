<template>
  <div class="movie-class">
    <!-- <div class="index-search">
      <van-search
        shape="round"
        disabled
        background="#fff"
        placeholder="搜索"
        @click="toSearch"
      />
    </div> -->
    <div class="classify-content">
      <div class="fliter-box">
        <div class="filter-item">
          <span>分类：</span>
          <div>
            <label
              v-for="item in classList"
              :key="item._id"
              :class="{ active: current === item._id }"
              @click="setActive('class', item)"
            >{{ item.name }}</label>
          </div>
        </div>
        <div class="filter-item">
          <span>种类：</span>
          <div>
            <label
              :class="{ active: curType === '' }"
              @click="setActive('type', '')"
            >全部</label>
            <label
              v-for="item in currentClass.type"
              :key="item"
              :class="{ active: curType === item }"
              @click="setActive('type', item)"
            >{{ item }}</label>
          </div>
        </div>
        <div class="filter-item">
          <span>类型：</span>
          <div>
            <label
              :class="{ active: curGenres === '' }"
              @click="setActive('genres', '')"
            >全部</label>
            <label
              v-for="item in currentClass.genres"
              :key="item"
              :class="{ active: curGenres === item }"
              @click="setActive('genres', item)"
            >{{ item }}</label>
          </div>
        </div>
      </div>
      <div class="movie-content">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-if="movieList.length > 0" class="movie-list">
              <div
                v-for="item in movieList"
                :key="item._id"
                class="movie-item"
                @click="toDetail(item._id)"
              >
                <img :src="item.cover" alt="">
                <div class="item-info">
                  <div class="item-name">{{ item.name || '...' }}</div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { movieClassApi, movieApi } from '@/api/movie'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,

      current: 0,
      currentClass: {}, // 当前分类
      curType: '', // 选中的种类
      curGenres: '', // 选中的类型
      classList: [], // 分类列表
      movieList: [], // 视频列表
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.currentId = this.$route.query.class_id
    this.getMovieClass()
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.currentPage = 1
          this.movieList = []
          this.refreshing = false
        } 
        this.getList()
      }, 2000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    // 获取分类列表
    async getMovieClass() {
      await movieClassApi.getMovieClass().then(res => {
        this.classList = res.data.list
        this.current = res.data.list[0]._id
        this.currentClass = res.data.list[0]
        this.getList()
      })
    },
    getList() {
      movieApi
        .getMovie({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          keywords: this.keywords,
          movie_class: this.current,
          movie_type: this.curType,
          movie_genres: this.curGenres
        })
        .then(res => {
          this.loading = false
          if (this.currentPage === 1) {
            this.movieList = res.data.list
            this.currentPage+=1
          } else {
            if(res.data.list.length !== 0) {
              this.movieList = this.movieList.concat(res.data.list)
              this.currentPage+=1
            }else {
              this.finished = true
            }
          }
        })
    },
    // 分类筛选
    setActive(type, item) {
      if (type === 'class') {
        this.current = item._id
        this.currentClass = item
      } else if (type === 'type') {
        this.curType = item
      } else {
        this.curGenres = item
      }
      this.currentPage = 1
      this.getList()
    },
    toDetail(id) {
      this.$router.push({ path: `/movie/detail`, query: { id }})
    },
    toSearch() {
      this.$router.push({ path: `/search` })
    },
    toMovieList(id) {
      this.$router.push({ path: `/movieList?class_id=${id}` })
    }
  }
}
</script>

<style lang="scss">
.classify-content {
  position: relative;
  .fliter-box {
    padding: 10px 20px;
    background: #fff;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    .filter-item {
      font-size: 14px;
      color: #999;
      display: flex;
      height: 30px;
      line-height: 30px;
      span {
        display: inline-block;
        width: 60px;
        color: #333;
        font-weight: bold;
      }
      div {
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        height: 30px;
        label {
          display: inline-block;
          margin-right: 15px;
          &.active {
            color: #335eea;
            font-weight: bold;
          }
        }
      }
    }
  }
  .movie-content {
    padding: 0 20px 50px;
    .movie-list {
      display: flex;
      flex-wrap: wrap;
    }
    .movie-item {
      width: 100px;
      box-shadow: 0 0 10px 2px #f5f5f5;
      border-radius: 8px;
      margin-bottom: 10px;
      font-size: 14px;
      overflow: hidden;
      position: relative;
      margin-right: 17px;
      display: inline-block;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 120px;
        display: block;
      }
      .item-info {
        .item-name {
          font-size: 14px;
          padding: 0 5px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          height: 30px;
          line-height: 30px;
        }
      }
      .episodes {
        position: absolute;
        bottom: 30px;
        right: 0;
        padding: 2px;
        color: #fff;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.26);
        width: 100%;
        text-align: right;
      }
    }
    .no-data {
      font-size: 14px;
      color: #666;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
