<template>
  <div class="index-view">
    <div class="index-search">
      <van-search
        v-model="value"
        shape="round"
        background="#fff"
        placeholder="搜索s视频"
        disabled
        @click="toSearch"
      />
    </div>
    <!-- 轮播 -->
    <!-- <div class="index-banner">
      <van-swipe class="my-swipe" :autoplay="3000" :indicator-color="indicatorColor">
        <van-swipe-item v-for="(image, index) in indexData.slider" :key="index">
          <a :href="image.link" target="_blank">
            <img v-lazy="image.image_path" @click="linkJump(image.link)">
          </a>
        </van-swipe-item>
      </van-swipe>
    </div> -->
    <!-- 热销商品 -->
    <van-tabs v-model="active" animated>
      <van-tab
        v-for="item in indexData"
        :key="item._id"
        :title="item.class_name"
      >
        <!-- <div v-if="item.bookList && item.bookList.length" class="book-list">
          <div
            v-for="book in item.bookList"
            :key="book._id"
            class="book-item"
            @click="toDetail(book._id)"
          >
            <img :src="book.cover" alt="">
            <div class="book-info">
              <div class="book-name">{{ book.name }}</div>
              <div class="book-author">{{ book.author }}</div>
              <div class="book-desc">
                <span>{{ book.description }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          <NoData text="该分类下暂无内容" />
        </div> -->

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import NoData from '@/components/NoData'
import { indexApi } from '@/api/home'
export default {
  components: {
    // NoData
  },
  data() {
    return {
      value: '',
      active: '',
      indexData: [{
        _id: '1',
        class_name: '推荐'
      }],
      indicatorColor: '#000'
    }
  },
  created() {
    // this.getIndex()
  },
  methods: {
    // 请求首页数据
    getIndex() {
      indexApi.getIndex().then(res => {
        this.indexData = res.data
      })
    },
    // 查看小说详情
    toDetail(id) {
      console.log(id)
    },
    toSearch() {
      this.$router.push({ path: `/bookList` })
    },
    linkJump(url) {}
  }
}
</script>
<style lang="scss" scoped>
.index-view {
  .index-banner {
    .my-swipe {
      background: #f7f7f7;
      height: 220px;
      .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 10px;
        text-align: center;
        height: 220px;
        img {
          width: 100%;
          height: 220px;
        }
      }
    }
  }
  .book-list {
    background: #fff;
    padding: 10px;
    .book-item {
      padding: 10px;
      box-shadow: 0 0 10px 5px #f5f5f5;
      border-radius: 8px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      img {
        width: 100px;
        height: 140px;
      }
      .book-info {
        padding-left: 15px;
        width: 230px;
        .book-name {
          font-size: 18px;
          padding-bottom: 5px;
        }
        .book-author {
          color: #666;
          padding: 5px 0;
        }
        .book-desc {
          color: #666;
        }
      }
    }
  }
}
</style>
