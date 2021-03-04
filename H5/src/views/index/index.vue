<template>
  <div class="index-view">
    <div class="index-search">
      <van-search
        v-model="value"
        shape="round"
        background="#fff"
        placeholder="搜索视频"
        disabled
        @click="toSearch"
      />
    </div>
    <!-- 轮播 -->
    <div class="index-banner">
      <van-swipe
        width="200px"
        class="my-swipe"
        :autoplay="3000"
        touchable
        lazy-render
        :indicator-color="indicatorColor"
      >
        <van-swipe-item v-for="(image, index) in slider" :key="index">
          <a :href="image.link" target="_blank">
            <img v-lazy="image.img_path" @click="linkJump(image.link)">
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 选项卡 -->
    <div class="tabs-box">
      <van-tabs
        v-model="active"
        animated
        swipeable
        :border="false"
        color="#335eea"
        title-active-color="#335eea"
        title-inactive-color="#333"
      >
        <van-tab
          v-for="item in indexData"
          :key="item._id"
          :title="item.class_name"
        >
          <div v-if="item.video && item.video.length" class="video-content">
            <div
              v-for="(block, index) in item.video"
              :key="index"
              class="block-list"
            >
              <div class="title">{{ block.name }}</div>
              <div class="video-list">
                <div
                  v-for="mv in block.list"
                  :key="mv.id"
                  class="video-item"
                  @click="toDetail(mv.id)"
                >
                  <img :src="mv.cover" alt="">
                  <div class="mv-info">
                    <div class="mv-name">{{ mv.name || '...' }}</div>
                  </div>
                  <div class="episodes">
                    {{ mv.isOver === 1 ? '全' : '更新至'
                    }}{{ mv.episodes || 0 }}集
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            <NoData text="该分类下暂无内容" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NoData from '@/components/NoData'
import { indexApi } from '@/api/home'
export default {
  components: {
    NoData
  },
  data() {
    return {
      value: '',
      active: '',
      slider: [
        {
          link: '',
          img_path:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.nosdn.127.net%2FTf6CecDaze41F5tDiVtnGwDdUNkaGQ1SeF8qvJY1WDZOG1543544455676compressflag.jpg&refer=http%3A%2F%2Fdingyue.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617347706&t=cf30a3e09f3753d7ad936d4f81bc322c'
        },
        {
          link: '',
          img_path:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-3185099299-388C5E27136DB16C4ECE618635BD864B%2F0%3Ffmt%3Djpg%26size%3D87%26h%3D325%26w%3D618%26ppv%3D1&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617347732&t=e453aded86c19ee6e9d2fba16c8756c1'
        }
      ],
      indexData: [
        {
          _id: '1',
          class_name: '推荐',
          video: [
            {
              name: '精选推荐',
              list: [{}]
            },
            {
              name: '电视剧推荐',
              list: [
                {
                  id: 1,
                  name: '赘婿',
                  episodes: '28',
                  isOver: 0,
                  cover:
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-3185099299-388C5E27136DB16C4ECE618635BD864B%2F0%3Ffmt%3Djpg%26size%3D87%26h%3D325%26w%3D618%26ppv%3D1&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617347732&t=e453aded86c19ee6e9d2fba16c8756c1'
                },
                {
                  id: 2,
                  name: '赘婿',
                  episodes: '28',
                  isOver: 1,
                  cover:
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-3185099299-388C5E27136DB16C4ECE618635BD864B%2F0%3Ffmt%3Djpg%26size%3D87%26h%3D325%26w%3D618%26ppv%3D1&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617347732&t=e453aded86c19ee6e9d2fba16c8756c1'
                },
                {
                  id: 3,
                  name: '赘婿',
                  episodes: '28',
                  isOver: 0,
                  cover:
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-3185099299-388C5E27136DB16C4ECE618635BD864B%2F0%3Ffmt%3Djpg%26size%3D87%26h%3D325%26w%3D618%26ppv%3D1&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617347732&t=e453aded86c19ee6e9d2fba16c8756c1'
                }
              ]
            }
          ]
        },
        {
          _id: '2',
          class_name: '电影'
        },
        {
          _id: '3',
          class_name: '电视剧'
        },
        {
          _id: '4',
          class_name: '动漫'
        },
        {
          _id: '5',
          class_name: '综艺'
        }
      ],
      indicatorColor: '#fff'
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
      this.$router.push({ path: `/movie/detail`, query: { id }})
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
  padding-bottom: 50px;
  .index-banner {
    padding: 10px 12px;
    .my-swipe {
      height: 180px;
      border-radius: 12px;
      .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 10px;
        text-align: center;
        height: 180px;
        img {
          width: 100%;
          height: 180px;
          border-radius: 12px;
        }
      }
    }
  }
  .video-content {
    background: #fff;
    padding: 10px;
    .block-list {
      margin-bottom: 15px;
      .title {
        padding: 15px 0;
        font-size: 16px;
        font-weight: bold;
        background: #fff;
      }
      .video-list {
        display: flex;
        justify-content: space-between;
      }
      .video-item {
        width: 32%;
        box-shadow: 0 0 10px 2px #f5f5f5;
        border-radius: 8px;
        margin-bottom: 10px;
        font-size: 14px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 120px;
          display: block;
        }
        .mv-info {
          .mv-name {
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
<style lang="scss">
.index-view {
  .van-tab--active {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
