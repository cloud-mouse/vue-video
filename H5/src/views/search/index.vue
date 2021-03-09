<template>
  <div class="search">
    <div class="search-box">
      <van-search
        v-model="keywords"
        shape="round"
        background="#fff"
        placeholder="搜索视频"
        @blur="doSearch"
      />
    </div>
    <div class="search-content">
      <div v-if="!showResult" class="search-history">
        <div class="title">搜索历史</div>
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
        搜索结果
      </div>
    </div>
  </div>
</template>

<script>
import {movieApi} from '@/api/movie'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      searchHistory: [],
      showResult: false,
    }
  },
  created() {
    const val = localStorage.getItem('search-history')
    this.searchHistory = val.split(',')
  },
  methods: {
    setKeywords(item) {
      this.keywords = item
    },
    doSearch() {
      if (searchHistory.indexOf(this.keywords) === -1) {
        this.searchHistory.push(this.keywords)
      }
      localStorage.setItem('search-history', this.searchHistory.join(','))
      movieApi.getItem({
        keywords: this.keywords
      }).then(res=>{
        console.log(res);
        this.movieList = res.data.list
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
  }
}
</style>
