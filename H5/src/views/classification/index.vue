<template>
  <div>
    <div class="index-search">
      <van-search
        shape="round"
        disabled
        background="#fff"
        placeholder="搜索"
        @click="toSearch"
      />
    </div>
    <div class="classify-content">
      <div class="fliter-box">
        <div class="filter-item">
          <span>分类：</span>
          <div>
            <label
              v-for="item in classList"
              :key="item._id"
              :class="{ active: current === item._id }"
              @click="setActive(item)"
            >{{ item.name }}</label>
          </div>
        </div>
        <div class="filter-item">
          <span>种类：</span>
          <div>
            <label
              v-for="item in currentClass.type"
              :key="item"
              :class="{ active: curType === item }"
              @click="setType(item)"
            >{{ item }}</label>
          </div>
        </div>
        <div class="filter-item">
          <span>类型：</span>
          <div>
            <label
              v-for="item in currentClass.genres"
              :key="item"
              :class="{ active: curGenres === item }"
              @click="setGenres(item)"
            >{{ item }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { movieClassApi } from '@/api/movie'
export default {
  data() {
    return {
      current: 0,
      currentClass: {},
      curType: '',
      curGenres: '',
      items: [],
      classList: []
    }
  },
  created() {
    this.currentId = this.$route.query.class_id
    this.getMovieClass()
  },
  methods: {
    // 获取分类列表
    getMovieClass() {
      movieClassApi.getMovieClass().then(res => {
        this.classList = res.data.list
        this.current = res.data.list[0]._id
        this.currentClass = res.data.list[0]
      })
    },
    setActive(item) {
      this.current = item._id
      this.currentClass = item
    },
    setType(val) {
      this.curType = val
    },
    setGenres(val) {
      this.curGenres = val
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

<style lang="scss" scoped>
.classify-content {
  .fliter-box {
    padding: 0 12px;
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
}
</style>
