<template>
  <div class="permission-list main-content">
    <div class="screen-box">
      <!-- <div class="screen-item">
        <el-input
          v-model="keywords"
          size="small"
          placeholder="请输入管理员名称"
          clearable
          style="width:220px"
          @keyup.enter.native="fetchData"
        />
        <el-button size="small" icon="el-icon-search" type="primary" @click.native="fetchData">搜索</el-button>
      </div> -->
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
        :data="permissionList"
        row-key="_id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="name"
          label="菜单名称"
          align="center"
        />
        <el-table-column
          prop="icon"
          label="菜单图标"
          width="180"
          align="center"
        />
        <el-table-column
          prop="path"
          label="菜单路由"
          align="center"
        />
        <el-table-column
          prop="component"
          label="路由组件"
          align="center"
        />
        <el-table-column label="是否隐藏" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.hidden==='1'?'隐藏':'显示' }}</span>
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
            <el-button
              size="mini"
              @click.native="showDialog('detail', scope.row)"
            >查看</el-button>
            <!-- <el-button
              size="mini"
              @click.native="showDialog('edit', scope.row)"
            >编辑</el-button> -->
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
          ? '新增权限规则'
          : dialogType == 'edit'
            ? '编辑权限规则'
            : '权限规则详情'
      "
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="rigth"
        size="small"
      >
        <el-form-item label="父级菜单" prop="pid">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            style="width: 100%"
            :disabled="dialogType == 'detail'"
          >
            <el-option key="0" label="顶级" value="0" />
            <el-option
              v-for="item in permissionList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="form.icon" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="权限路径" prop="path">
          <el-input v-model="form.path" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="权限名" prop="path_name">
          <el-input v-model="form.path_name" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="路由组件" prop="component">
          <el-input v-model="form.component" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="激活菜单">
          <el-input v-model="form.activeMenu" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-switch
            v-model="form.hidden"
            active-value="1"
            inactive-value="0"
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="总是显示">
          <el-switch
            v-model="form.alwaysShow"
            active-value="1"
            inactive-value="0"
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="路由排序">
          <el-input v-model="form.sort" :disabled="dialogType == 'detail'" />
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
import { permissionApi } from '@/api/manage'
import { formatTime } from '@/utils'
export default {
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
      permissionList: [],
      dialogFormVisible: false,
      form: {
        pid: 0,
        name: '',
        icon: '',
        path: '',
        path_name: '',
        component: '',
        activeMenu: '',
        hidden: '1',
        alwaysShow: '0',
        sort: '0'
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      rules: {
        name: [{ required: true, message: '请填写路由名称', trigger: 'blur' }],
        path: [{ required: true, trigger: 'blur', message: '请填写权限路径' }],
        path_name: [{ required: true, trigger: 'blur', message: '请填写权限名' }],
        component: [{ required: true, trigger: 'blur', message: '请填写路由组件' }]
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
          pid: 0,
          name: '',
          icon: '',
          path: '',
          path_name: '',
          component: '',
          activeMenu: '',
          hidden: '1',
          alwaysShow: '0',
          sort: '0'
        }
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 获取管理员列表
      permissionApi
        .getList({
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          this.permissionList = res.data.list
          this.total = res.data.count
        })
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      if (form && form._id) {
        // 请求分类详情
        this.form = form
      }
    },
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.form._id) {
            permissionApi.updateItem(_this.form).then(res => {
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
            permissionApi.addItem(_this.form).then(res => {
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
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleDelete(id) {
      this.$confirm('是否删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      })
        .then(() => {
          permissionApi.deleteItem({ id: id }).then(res => {
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
.permission-list {
  .screen-box {
    .screen-item {
      text-align: right;
    }
    .operation{
      position: relative;
      top: 0;
      right: 0
    }
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
