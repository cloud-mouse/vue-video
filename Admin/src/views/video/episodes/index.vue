<template>
  <div class="video-list main-content">
    <div class="screen-box">
      <div class="video-detail">
        <img :src="detail.cover" alt="">
        <div>
          <p>剧名：<span>{{ detail.name }}</span> </p>
          <!-- <p>年代：<span>{{ detail.years }}</span> </p> -->
          <p>分类：<span>{{ detail.movie_class.name }}</span> </p>
          <p>状态：<span>{{ detail.isOver==='1'?'已完结': '连载中...' }}</span> </p>
          <p>简介：<span>{{ detail.description }}</span> </p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="title">剧集列表</div>
      <el-tag
        v-for="item in episodesList"
        :key="item._id"
        closable
        type="info"
        effect="plain"
        class="episode-item"
        :disable-transitions="false"
        @click="showDialog('edit', item)"
        @close="handleDelete(item._id)"
      >
        第{{ item.index }}集：{{ item.name }}
      </el-tag>
      <el-button
        size="medium"
        icon="el-icon-plus"
        type="primary"
        @click="showDialog('add')"
      >新增</el-button>
    </div>
    <!-- 权限新增，详情，编辑弹框 -->
    <el-dialog
      v-dialogDrag
      center
      :title="
        dialogType == 'add'
          ? '新增剧集'
          : dialogType == 'edit'
            ? '编辑剧集'
            : '剧集详情'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="130px"
        label-position="rigth"
        size="small"
      >
        <el-form-item label="剧集名称" prop="name">
          <el-input v-model="form.name" placeholder="输入剧集名称" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="剧集资源" prop="url">
          <el-input v-model="form.url" placeholder="输入剧集资源" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="第几集" prop="index">
          <el-input v-model="form.index" placeholder="输入第几集（请谨慎填写）" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="dialogType !== 'detail'"
            type="primary"
            @click="onSubmit('form')"
          >保存</el-button>
          <el-button
            v-else
            type="primary"
            @click="dialogType = 'edit'"
          >编辑</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { videoApi, videoEpisodesApi } from '@/api/video'
export default {
  data() {
    return {
      loading: true,
      detail: null,
      episodesList: [], // 影视列表
      dialogFormVisible: false,
      form: {
        name: '',
        url: '',
        movie_id: this.$route.query.id,
        index: ''
      },
      total: 0,
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请填写剧集名' }],
        url: [{ required: true, trigger: 'blur', message: '请上传影视资源' }]
      },
      dialogType: 'add'
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === false) {
        this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
        this.form = {
          name: '',
          url: '',
          movie_id: this.$route.query.id,
          index: ''
        }
      }
    }
  },
  created() {
    this.fetchData()
    this.getDetail()
  },
  handleClose(item) {
    console.log(item)
  },
  methods: {
    fetchData() {
      // 获取管理员列表
      videoEpisodesApi
        .getList({
          pageSize: 10000,
          currentPage: 1,
          movie_id: this.$route.query.id
        })
        .then(res => {
          this.episodesList = res.data.list
          this.total = res.data.count
        })
    },
    getDetail() {
      videoApi.getList({
        id: this.$route.query.id
      }).then(res => {
        this.detail = res.data
      })
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      if (form && form._id) {
        // 请求分类详情
        this.form = JSON.parse(JSON.stringify(form))
      }
    },
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.form._id) {
            videoEpisodesApi.updateItem(_this.form).then(res => {
              this.$message.success(res.msg)
              // 重置表单
              this.$nextTick(() => {
                _this.$refs[formName].resetFields()
              })
              this.dialogFormVisible = false
              this.fetchData()
            }).catch(err => {
              this.$message.error(err || '编辑失败!')
            })
          } else {
            videoEpisodesApi.addItem(_this.form).then(res => {
              this.$message.success(res.msg)
              // 重置表单
              this.$nextTick(() => {
                _this.$refs[formName].resetFields()
              })
              this.dialogFormVisible = false
              this.fetchData()
            }).catch(err => {
              this.$message.error(err || '添加失败!')
            })
          }
        } else {
          return false
        }
      })
    },
    handleDelete(id) {
      this.$confirm('是否删除该剧集?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      })
        .then(() => {
          videoEpisodesApi.deleteItem({ id: id }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-list {
  .screen-box {
    padding: 20px;
    .video-detail{
      display: flex;
      justify-content: space-between;
      width: 100%;
      img{
        width: 150px;
      }
      div{
        width: 100%;
        text-align: left;
        padding-left: 20px;
        p{
          span{
            color: #666;
          }
        }
      }
    }
  }
  .content{
    padding: 20px;
    background: #ffffff;
    .title{
      font-size: 16px;
      font-weight: bold;
      padding: 10px 0 20px;
    }
    .episode-item{
      height: 36px;
      line-height: 36px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>

