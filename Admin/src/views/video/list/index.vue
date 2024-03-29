<template>
  <div class="video-list main-content">
    <div class="screen-box">
      <div class="screen-item">
        <el-input
          v-model="keywords"
          size="small"
          placeholder="输入关键词"
          clearable
          style="width:220px"
          @keyup.enter.native="fetchData"
        />
        <el-select
          v-model="movie_class"
          size="small"
          clearable
          placeholder="请选择影视分类"
        >
          <el-option
            v-for="item in videoClassList"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
        <el-button size="small" icon="el-icon-search" type="primary" @click.native="fetchData">搜索</el-button>
      </div>
      <div class="operation">
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="showDialog('add')"
        >新增</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="videoList">
        <el-table-column label="封面" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.cover" width="30" alt="" class="cover">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="剧名" align="center" />
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.movie_class">{{
              scope.row.movie_class.name
            }}</span>
            <span v-else>未选择分类</span>
          </template>
        </el-table-column>
        <el-table-column prop="pv" label="浏览量" align="center" />
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column label="首页推荐" align="center">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.recommend"
              active-value="1"
              inactive-value="0"
              @change="changeRecommend(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="是否完结" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isOver | statusFilter">{{
              scope.row.isOver === '0' ? '未完结' : '已完结'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.updateTime | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="`episodes/?id=${scope.row._id}`">
              <el-button size="mini">剧集</el-button>
            </router-link>
            <el-button
              size="mini"
              type="primary"
              @click.native="showDialog('edit', scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-box">
        <el-pagination
          :total="total"
          :current-page="currentPage"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 权限新增，详情，编辑弹框 -->
    <el-dialog
      v-dialogDrag
      center
      :title="
        dialogType == 'add'
          ? '新增影视'
          : dialogType == 'edit'
            ? '编辑影视'
            : '影视详情'
      "
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
        <el-form-item label="影视名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="输入影视名称"
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="影视分类" prop="movie_class">
          <el-select
            v-model="currentClass"
            clearable
            value-key="_id"
            placeholder="请选择影视分类"
            :disabled="dialogType == 'detail'"
            @change="changeClass"
          >
            <el-option
              v-for="item in videoClassList"
              :key="item._id"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="影视种类" prop="movie_type">
          <el-select
            v-model="form.movie_type"
            clearable
            placeholder="请先选择影视分类"
            :disabled="dialogType == 'detail'"
          >
            <el-option
              v-for="item in currentClass.type"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="影视类型" prop="movie_genres">
          <el-select
            v-model="form.movie_genres"
            clearable
            placeholder="请先选择影视分类"
            :disabled="dialogType == 'detail'"
          >
            <el-option
              v-for="item in currentClass.genres"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上映年代" prop="year">
          <el-date-picker
            v-model="form.year"
            format
            value-format="yyyy"
            type="year"
            placeholder="选择影视年代"
          />
        </el-form-item>
        <el-form-item label="影视封面" prop="cover">
          <img-upload
            :disabled="dialogType == 'detail'"
            :img-data="form.cover"
            :pic-max="1"
            @chooseImg="imageChoose"
          />
          <el-input v-model="form.cover" placeholder="您还可以输入封面url，这将不会录入图库资源" clearable />
        </el-form-item>
        <el-form-item label="影视描述">
          <el-input
            v-model="form.description"
            placeholder="输入影视描述"
            type="textarea"
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="影视排序">
          <el-input
            v-model="form.sort"
            placeholder="输入影视排序"
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="首页推荐">
          <el-switch
            v-model="form.recommend"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="是否完结">
          <el-switch
            v-model="form.isOver"
            active-value="1"
            inactive-value="0"
          />
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
import { videoApi, videoClassApi } from '@/api/video'
import { formatTime } from '@/utils'
import ImgUpload from '@/components/ImgUpload'
export default {
  components: {
    ImgUpload
  },
  filters: {
    timeFormat(time) {
      return formatTime(new Date(time))
    },
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      loading: true,
      keywords: '',
      videoList: [], // 影视列表
      videoClassList: [], // 影视分类列表
      dialogFormVisible: false,
      form: {
        name: '',
        cover: '',
        movie_class: '',
        movie_type: '', // 地区
        movie_genres: '', // 类型
        year: '', // 年代
        recommend: '0',
        isOver: '0',
        sort: '0',
        description: ''
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      currentClass: {},
      movie_class: '',
      movie_type: '',
      movie_genres: '',
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请填写影视名称' }],
        movie_class: [
          { required: true, trigger: 'change', message: '请选择影视分类' }
        ],
        movie_type: [
          { required: true, trigger: 'change', message: '请选择影视种类' }
        ],
        movie_genres: [
          { required: true, trigger: 'change', message: '请选择影视类型' }
        ],
        year: [
          { required: true, trigger: 'change', message: '请选择影视年代' }
        ],
        icon: [{ required: true, trigger: 'blur', message: '请上传影视封面' }]
      },
      dialogType: 'add'
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === false) {
        this.form = {
          name: '',
          description: '',
          cover: '',
          movie_class: '',
          movie_type: '', // 地区
          movie_genres: '', // 类型
          year: '', // 年代
          recommend: '0',
          isOver: '0',
          sort: '0'
        }
        this.currentClass = {}
        this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.getVideoClass()
  },
  methods: {
    fetchData() {
      // 获取管理员列表
      videoApi
        .getList({
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          keywords: this.keywords,
          movie_class: this.movie_class,
          movie_type: this.movie_type,
          movie_genres: this.movie_genres
        })
        .then(res => {
          this.videoList = res.data.list
          this.total = res.data.count
        })
    },
    // 获取分类列表
    getVideoClass() {
      videoClassApi
        .getList({
          pageSize: 1000,
          currentPage: 1
        })
        .then(res => {
          this.videoClassList = res.data.list
        })
    },
    changeRecommend(row) {
      this.$confirm('是否修改首页推荐?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      })
        .then(() => {
          videoApi
            .updateItem({
              _id: row._id,
              recommend: row.recommend === '0' ? '1' : '0'
            })
            .then(res => {
              this.$message.success(res.msg || '修改成功')
              // 重置表单
              this.dialogFormVisible = false
              this.fetchData()
            })
            .catch(err => {
              this.$message.error(err || '编辑失败!')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    changeClass(item) {
      this.form.movie_class = item._id
      this.form.movie_type = ''
      this.form.movie_genres = ''
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      if (form && form._id) {
        // 请求分类详情
        this.currentClass = form.movie_class
        this.form = JSON.parse(JSON.stringify(form))
        this.form.movie_class = this.form.movie_class._id
      }
    },
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.form._id) {
            videoApi
              .updateItem(_this.form)
              .then(res => {
                this.$message.success(res.msg)
                // 重置表单
                this.$nextTick(() => {
                  _this.$refs[formName].resetFields()
                })
                this.dialogFormVisible = false
                this.fetchData()
              })
              .catch(err => {
                this.$message.error(err || '编辑失败!')
              })
          } else {
            videoApi
              .addItem(_this.form)
              .then(res => {
                this.$message.success(res.msg)
                // 重置表单
                this.$nextTick(() => {
                  _this.$refs[formName].resetFields()
                })
                this.dialogFormVisible = false
                this.fetchData()
              })
              .catch(err => {
                this.$message.error(err || '添加失败!')
              })
          }
        } else {
          return false
        }
      })
    },
    // 图片上传模块
    imageChoose(img) {
      this.form.cover = img
      this.$refs.form.validateField('cover')
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleDelete(id) {
      this.$confirm('是否删除该影视?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      })
        .then(() => {
          videoApi.deleteItem({ id: id }).then(res => {
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
    .screen-item {
      text-align: right;
    }
    .operation {
      display: block;
      text-align: right;
    }
  }
  .cover {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>

<style lang="scss">
