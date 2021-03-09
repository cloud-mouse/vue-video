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
      <div class="left-content">
        <van-sidebar v-model="active" @change="onChange">
          <van-sidebar-item
            v-for="item in categories"
            :key="item._id"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <div class="right-content">
        <div
          v-for="item in categories[active].children"
          :key="item._id"
          class="sub-categary"
        >
          <div class="sub-name" @click="toMovieList(item._id)">
            {{ item.name }}
          </div>
          <div class="sub-child">
            <ul>
              <li
                v-for="(child, i) in item.children"
                :key="i"
                @click="toMovieList(child._id)"
              >
                <img :src="child.icon" alt="">
                <p>{{ child.name }}</p>
              </li>
            </ul>
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
      active: 0,
      currentId: 0,
      currentImg: '',
      items: [],
      categories: [],
      subCategary: []
    }
  },
  created() {
    this.currentId = this.$route.query.category_id
    this.getMovieClass()
  },
  methods: {
    onChange(index) {},
    onNavClick(e) {
      Object.assign(this.$route.query, { category_id: this.items[e].activeId })
      this.currentId = this.items[e].activeId
      this.currentImg = this.items[e].image_path
      this.subCategary = this.categories[e].children
    },
    // 获取分类列表
    getMovieClass() {
      movieClassApi.getMovieClass().then(res => {
        console.log(res)
        this.categories = res.data.list
        // 渲染左侧列表
        // res.data.map(item => {
        //   this.items.push({
        //     activeId: item.id,
        //     text: item.category_name,
        //     image_path: item.image_path
        //   })
        // })
        // if (this.currentId) {
        //   res.data.forEach((element, i) => {
        //     if (element.id === parseInt(this.currentId)) {
        //       this.active = i
        //       this.currentImg = res.data[i].image_path
        //       this.subCategary = res.data[i].children
        //     }
        //   })
        // } else {
        //   this.currentId = res.data[0].id
        //   this.currentImg = res.data[0].image_path
        //   this.subCategary = res.data[0].children
        // }
        // this.categories = res.data
      })
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
  display: flex;
  .left-content {
    width: 85px;
  }
  .right-content {
    flex: 1;
    padding: 0 10px;
    img {
      width: 100%;
      height: 110px;
      border-radius: 5px;
    }
    .sub-categary {
      padding: 5px 0;
      .sub-name {
        padding: 8px 0;
        color: #333;
        font-size: 14px;
      }
      .sub-child {
        ul {
          display: flex;
          align-items: center;
          flex-flow: wrap;
          li {
            width: 25%;
            margin-right: 12%;
            img {
              width: 100%;
              height: 58px;
            }
            p {
              margin: 2px 0;
              font-size: 12px;
              text-align: center;
            }
          }
          li:nth-child(3n) {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
