<template>
  <div class="ad-list main-content">
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
        v-loading="loading"
        :data="adList"
        style="width: 100%"
        fit
        highlight-current-row
        tooltip-effect="dark"
      >
        <el-table-column label="序号" align="center" width="100" type="index" />
        <el-table-column label="广告位图片" align="center" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.path" alt="" width="60" height="60">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{
              scope.row.status === '0' ? '下架' : '上架'
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
            <el-button
              size="mini"
              @click.native="showDialog('detail', scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 广告位新增，详情，编辑弹框 -->
    <el-dialog
      v-dialogDrag
      center
      :title="
        dialogType == 'add'
          ? '新增广告位'
          : dialogType == 'edit'
            ? '编辑广告位'
            : '广告位详情'
      "
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="left"
        size="small"
      >
        <el-form-item label="广告位名称" prop="name">
          <el-input v-model="form.name" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="广告位图片" prop="path">
          <!-- <el-upload
            class="uploader"
            :action="uploadUrl"
            :headers="{ Authorization: `Basic ${token}` }"
            :show-file-list="false"
            :disabled="dialogType == 'detail'"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.path" :src="form.path" class="cloud_img">
            <i v-else class="el-icon-plus uploader-icon" />
          </el-upload> -->
          <img-upload
            :disabled="dialogType=='detail'"
            :img-data="form.path"
            :pic-max="1"
            @chooseImg="imageChoose"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.link" :disabled="dialogType == 'detail'" />
        </el-form-item>
        <el-form-item label="是否上架">
          <el-switch
            v-model="form.status"
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
import { adsenseApi } from '@/api/system'
import { formatTime } from '@/utils'
import { getToken } from '@/utils/auth'
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
      adList: [],
      token: getToken(),
      dialogFormVisible: false,
      form: {
        name: '',
        path: '',
        sort: '0',
        link: '',
        status: '1'
      },
      btnLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入广告位名称', trigger: 'blur' }
        ],
        path: [{ required: true, message: '请上传广告位图片', trigger: 'blur' }]
      },
      dialogType: 'add'
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === false) {
        this.$refs['form'].resetFields()
        this.form = {
          name: '',
          path: '',
          sort: '',
          link: '',
          status: '1'
        }
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 获取广告位列表
      adsenseApi
        .getList()
        .then(res => {
          this.loading = false
          this.adList = res.data
        })
        .catch(() => {
          this.loading = false
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
            adsenseApi.updateItem(_this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.msg || '修改成功!'
                })
                // 重置表单
                _this.$refs[formName].resetFields()
                this.dialogFormVisible = false
                this.fetchData()
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg || '修改失败!'
                })
              }
            })
          } else {
            adsenseApi.addItem(_this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.msg || '添加成功!'
                })
                // 重置表单
                _this.$refs[formName].resetFields()
                this.dialogFormVisible = false
                this.fetchData()
              } else {
                this.$message.success(res.msg || '添加失败!')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 图片上传模块
    imageChoose(img) {
      this.form.path = img
      this.$refs.form.validateField('path')
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.form.path = res.data.path
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
    handleDelete(id) {
      this.$confirm('是否删除该广告位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      })
        .then(() => {
          adsenseApi.deleteItem({ id: id }).then(res => {
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
.ad-list {
  .screen-box {
    .screen-item {
      text-align: right;
    }
    .operation {
      width: 100%;
      text-align: right;
    }
  }
}
</style>
