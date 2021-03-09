<template>
  <div class="video-list main-content">
    <div class="screen-box">
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
      <el-table
        :data="videoList"
      >
        <el-table-column
          label="封面"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.cover" width="30" height="60" alt="" class="cover">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="剧名"
          align="center"
        />
        <el-table-column
          label="分类"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.movieClass">{{ scope.row.movieClass.name }}</span>
            <span v-else>未选择分类</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        />
        <el-table-column
          label="首页推荐"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.recommend"
              active-value="1"
              inactive-value="0"
              @change="changeRecommend(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="是否完结"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.isOver | statusFilter">{{ scope.row.isOver==='0'?'未完结':'已完结' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.updateTime | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="`episodes/?id=${scope.row._id}`">
              <el-button
                size="mini"
              >剧集</el-button>
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
            : '影视详情'"
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
          <el-input v-model="form.name" placeholder="输入影视名称" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="影视分类" prop="movieClass">
          <el-cascader
            v-model="form.movieClass"
            :options="videoClassList"
            :show-all-levels="false"
            :props="{ value: '_id',label:'name',checkStrictly: true, emitPath: false }"
            clearable
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-cascader
            v-model="form.area"
            :options="videoClassList"
            :show-all-levels="false"
            :props="{ value: '_id',label:'name',checkStrictly: true, emitPath: false }"
            clearable
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-cascader
            v-model="form.type"
            :options="videoClassList"
            :show-all-levels="false"
            :props="{ value: '_id',label:'name',checkStrictly: true, emitPath: false }"
            clearable
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="年代" prop="year">
          <el-cascader
            v-model="form.year"
            :options="videoClassList"
            :show-all-levels="false"
            :props="{ value: '_id',label:'name',checkStrictly: true, emitPath: false }"
            clearable
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="影视封面" prop="cover">
          <img-upload
            :disabled="dialogType=='detail'"
            :img-data="form.cover"
            :pic-max="1"
            @chooseImg="imageChoose"
          />
        </el-form-item>
        <el-form-item label="影视描述">
          <el-input v-model="form.description" placeholder="输入影视描述" type="textarea" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="影视排序">
          <el-input v-model="form.sort" placeholder="输入影视排序" :disabled="dialogType == 'detail'" />
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
        movieClass: '',
        area: '', // 地区
        type: '', // 类型
        year: '', // 年代
        recommend: '0',
        isOver: '0',
        sort: '0',
        description: ''
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请填写影视名称' }],
        movieClass: [{ required: true, trigger: 'change', message: '请选择影视分类' }],
        area: [{ required: true, trigger: 'change', message: '请选择影视地区' }],
        type: [{ required: true, trigger: 'change', message: '请选择影视类型' }],
        year: [{ required: true, trigger: 'change', message: '请选择影视年代' }],
        icon: [{ required: true, trigger: 'blur', message: '请上传影视封面' }]
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
          movieClass: '',
          description: '',
          cover: '',
          area: '', // 地区
          type: '', // 类型
          year: '', // 年代
          recommend: '0',
          isOver: '0',
          sort: '0'
        }
        this.pid = []
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
          currentPage: this.currentPage
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
          videoApi.updateItem({ _id: row._id, recommend: row.recommend === '0' ? '1' : '0' }).then(res => {
            this.$message.success(res.msg || '修改成功')
            // 重置表单
            this.dialogFormVisible = false
            this.fetchData()
          }).catch(err => {
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
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      if (form && form._id) {
        // 请求分类详情
        this.form = JSON.parse(JSON.stringify(form))
        this.form.movieClass = this.form.movieClass._id
      }
    },
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.form._id) {
            videoApi.updateItem(_this.form).then(res => {
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
            videoApi.addItem(_this.form).then(res => {
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
    .operation{
      display: block;
      width: 100%;
      text-align: right;
    }
  }
  .cover{
    display: inline-block;
    vertical-align: middle;
  }
}
</style>

<style lang="scss">
.logo-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .logo {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>
