<template>
  <div class="search">
    <div class="search-box">
      <van-search
        ref="searchInput"
        v-model="keywords"
        shape="round"
        background="#fff"
        placeholder="搜索视频"
        @blur="doSearch"
      />
    </div>
    <div class="search-content">
      <div v-if="!showResult" class="search-history">
        <div class="title">
          <span>搜索历史</span>
          <span
            class="remove-all"
            @click="showConfirm"
          ><van-icon name="delete-o" />清空历史</span>
        </div>
        <div class="history-keys">
          <div
            v-for="(item, index) in searchHistory"
            :key="index"
            class="history-key"
            @click="setKeywords(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div v-if="showResult" class="search-result">
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
import { movieApi } from '@/api/movie'
import { Dialog } from 'vant'
export default {
  name: 'Search',
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,

      keywords: '',
      searchHistory: [],
      showResult: false,
      movieList: [], // 视频列表
      currentPage: 1,
      pageSize: 10
    }
  },
  watch: {
    keywords(newValue, oldValue) {
      if (newValue) {
        this.showResult = true
      } else {
        this.showResult = false
      }
    }
  },
  created() {
    const val = localStorage.getItem('search-history')
    if (val) this.searchHistory = val.split(',')
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.searchInput.focus()
    })
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
    showConfirm() {
      Dialog.confirm({
        title: '提示',
        message: '是否要清空搜索历史?',
        confirmButtonColor: '#335eea',
        confirmButtonText: '清空'
      })
        .then(() => {
          // on confirm
          localStorage.removeItem('search-history')
          this.searchHistory = []
        })
        .catch(() => {
          // on cancel
        })
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    setKeywords(item) {
      this.keywords = item
    },
    // 查看详情
    toDetail(id) {
      this.$router.push({ path: `/movie/detail`, query: { id }})
    },
    doSearch() {
      if (this.searchHistory.indexOf(this.keywords) === -1) {
        this.searchHistory.push(this.keywords)
      }
      localStorage.setItem('search-history', this.searchHistory.join(','))
      this.showResult = true
    },
    getList() {
      movieApi
        .getMovie({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          keywords: this.keywords
        })
        .then(res => {
          this.loading = false
          if (this.currentPage === 1) {
            this.movieList = res.data.list
            this.currentPage += 1
          } else {
            if (res.data.list.length !== 0) {
              this.movieList = this.movieList.concat(res.data.list)
              this.currentPage += 1
            } else {
              this.finished = true
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  .search-content {
    padding: 0 20px 20px;
    font-size: 14px;
    .search-history {
      .title {
        color: #333;
        font-weight: bold;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        .remove-all {
          color: #335eea;
        }
      }
      .history-keys {
        .history-key {
          display: inline-block;
          padding: 5px 10px;
          font-size: 13px;
          color: #999;
          border: 1px solid #f3f3f3;
          border-radius: 10px;
          margin-right: 12px;
        }
      }
    }
    .search-result {
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
    }
  }
}
</style>
