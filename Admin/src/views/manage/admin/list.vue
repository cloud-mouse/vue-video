<template>
  <div class="admin-list main-content">
    <div class="screen-box">
      <div class="screen-item">
        <el-input
          v-model="keywords"
          size="small"
          placeholder="请输入管理员名称"
          clearable
          style="width:220px"
          @keyup.enter.native="fetchData"
        />
        <el-button size="small" icon="el-icon-search" type="primary" @click.native="fetchData">搜索</el-button>
      </div>
      <div class="operation">
        <el-button size="small" icon="el-icon-plus" type="primary" @click="showDialog('add')">新增</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="adminList"
        style="width: 100%"
        fit
        highlight-current-row
        tooltip-effect="dark"
      >
        <el-table-column
          label="序号"
          align="center"
          width="100"
          type="index"
        />
        <el-table-column
          label="管理员账号"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="管理员角色"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.role">{{ scope.row.role.role_name }}</span>
            <span v-else>未设置</span>
          </template>
        </el-table-column>
        <el-table-column
          label="管理员状态"
          align="center"
          width="250"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status==0?'禁用':'启用' }}</el-tag>
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
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
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
    <!-- 管理员新增，详情，编辑弹框 -->
    <el-dialog v-dialogDrag center :title="dialogType=='add'? '新增管理员': dialogType=='edit'? '编辑管理员': '管理员详情'" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="rigth" size="small">
        <el-form-item label="头像">
          <img-upload
            :disabled="dialogType=='detail'"
            :img-data="form.avatar"
            :pic-max="1"
            @chooseImg="imageChoose"
          />
        </el-form-item>

        <el-form-item label="登录账号" prop="username">
          <el-input v-model="form.username " :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone " :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item v-if="dialogType!=='detail'" label="密码">
          <el-input v-model="form.password " type="password" :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item label="管理员角色" prop="role">
          <el-select
            v-model="selectRole"
            value-key="_id"
            placeholder="请选择"
            style="width: 100%"
            :disabled="dialogType=='detail'"
            @change="roleSelect"
          >
            <el-option
              v-for="item in rolesList"
              :key="item._id"
              :label="item.role_name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="form.status"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-if="dialogType!=='detail'" type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button v-else type="primary" @click="dialogType='edit'">编辑</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { adminApi, rolesApi } from '@/api/manage'
import { validPhone } from '@/utils/validate'
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
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('手机号不正确'))
      } else {
        callback()
      }
    }
    return {
      loading: true,
      keywords: '',
      adminList: [],
      dialogFormVisible: false,
      form: {
        username: '',
        phone: '',
        password: '',
        avatar: '',
        role: '',
        status: '1'
      },
      selectRole: {},
      pageSize: 10,
      currentPage: 1,
      total: 0,
      rolesList: [],
      rules: {
        username: [
          { required: true, message: '请填写管理员姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写管理员密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
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
          username: '',
          password: '',
          avatar: '',
          role: '',
          status: '1'
        }
      }
    }
  },
  mounted() {
    this.fetchData()
    this.getRoleList()
  },
  methods: {
    fetchData() {
      // 获取管理员列表
      adminApi.getAdminList({
        keywords: this.keywords,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }).then(res => {
        this.adminList = res.data.list
        this.total = res.data.count
      })
    },
    getRoleList() {
      rolesApi.roleList({
        currentPage: 1,
        pageSize: 1000
      }).then(res => {
        this.rolesList = res.data.list
      })
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      if (form && form._id) {
        // 请求分类详情
        this.form = form
        this.selectRole = form.role
      }
    },
    roleSelect(e) {
      this.form.role = e._id
    },
    // 图片上传模块
    imageChoose(img) {
      this.form.avatar = img
    },
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.form._id) {
            adminApi.editAdmin(_this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.msg || '修改成功!'
                })
                // 重置表单
                this.$nextTick(() => {
                  _this.$refs[formName].resetFields()
                })
                this.dialogFormVisible = false
                this.fetchData()
              } else {
                this.$message.error(res.msg || '修改失败!')
              }
            })
          } else {
            adminApi.addAdmin(_this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.msg || '添加成功!'
                })
                // 重置表单
                this.$nextTick(() => {
                  _this.$refs[formName].resetFields()
                })
                this.dialogFormVisible = false
                this.fetchData()
              } else {
                this.$message.error(res.msg || '添加失败!')
              }
            })
          }
        } else {
          return false
        }
      })
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
      this.$confirm('是否删除该管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        adminApi.delAdmin({ id: id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
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
.admin-list{
  .screen-box{
    .screen-item{
      text-align: left;
    }
  }
}
</style>

<style lang="scss">
  .logo-uploader{
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409EFF;
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
