<template>
  <div class="video-class main-content">
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
        :data="videoClassList"
        row-key="_id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          label="分类图标"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.icon" width="30" height="30" alt="" class="class_icon">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="分类排序"
          align="center"
        />
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
            <!-- <el-button
              size="mini"
              @click.native="showDialog('detail', scope.row)"
            >查看</el-button> -->
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
          ? '新增影视分类'
          : dialogType == 'edit'
            ? '编辑影视分类'
            : '影视分类详情'
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
        <el-form-item label="父级分类(pid)" prop="pid">
          <el-cascader
            v-model="pid"
            :options="videoClassList"
            :show-all-levels="false"
            :props="{ value: '_id',label:'name',checkStrictly: true }"
            clearable
            :disabled="dialogType == 'detail'"
            @change="handleChange"
          />
          <el-tag type="danger">不选表示顶级</el-tag>

        </el-form-item>
        <el-form-item label="分类名称(name)" prop="name">
          <el-input v-model="form.name" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="分类图标(icon)" prop="icon">
          <el-upload
            class="uploader"
            :action="uploadUrl"
            :headers="{'Authorization': `Basic ${token}`}"
            :show-file-list="false"
            :disabled="dialogType == 'detail'"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.icon" :src="form.icon" class="cloud_img">
            <i v-else class="el-icon-plus uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="分类排序(sort)">
          <el-input v-model="form.sort" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="分类描述(desc)">
          <el-input v-model="form.description" :disabled="dialogType == 'detail'" />
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
import { videoClassApi } from '@/api/video'
import { formatTime } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  filters: {
    timeFormat(time) {
      return formatTime(new Date(time))
    }
  },
  data() {
    return {
      loading: true,
      keywords: '',
      videoClassList: [],
      dialogFormVisible: false,
      pid: [],
      token: getToken(),
      form: {
        pid: '0',
        name: '',
        icon: '',
        sort: '0',
        description: ''
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请填写分类名称' }],
        icon: [{ required: true, trigger: 'blur', message: '请上传分类图标' }]
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
          pid: '0',
          name: '',
          description: '',
          icon: '',
          sort: '0'
        }
        this.pid = []
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 获取管理员列表
      videoClassApi
        .getList({
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          this.videoClassList = res.data.list
          this.total = res.data.count
        })
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      if (form && form._id) {
        // 请求分类详情
        this.form = form
        this.pid = form.pid
      }
    },
    // 父id下拉框选择
    handleChange(e) {
      this.form.pid = e[e.length - 1]
    },
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.form._id) {
            _this.form.pid ? _this.form.pid : '0'
            videoClassApi.updateItem(_this.form).then(res => {
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
            _this.form.pid ? _this.form.pid : '0'
            videoClassApi.addItem(_this.form).then(res => {
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
    // 上传图片
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.form.icon = res.path
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      })
        .then(() => {
          videoClassApi.deleteItem({ id: id }).then(res => {
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
.video-class {
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
  .class_icon{
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
