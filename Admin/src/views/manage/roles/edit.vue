<template>
  <div class="role-edit roles">
    <div class="title-info">
      <card-tag :tag-name="id!=''? '编辑角色': '新增角色'" />
    </div>
    <div class="form-info">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top" size="small">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="form.role_name" style="width: 30%" />
        </el-form-item>
        <el-form-item label="角色权限">
          <!-- <el-input v-model="form.name" style="width: 30%" /> -->
          <div v-loading="loading" class="permission-tree">
            <el-tree
              ref="tree"
              :data="authorityList"
              :props="defaultProps"
              default-expand-all
              show-checkbox
              node-key="_id"
              :expand-on-click-node="false"
              :render-content="renderContent"
              @node-expand="handleNodeExpand"
              @check="checkHandle"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="()=>this.$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CardTag from '@/components/CardTag'
import { permissionApi, rolesApi } from '@/api/manage'
// import tree from '@/utils/tree'
export default {
  components: {
    CardTag
  },
  data() {
    return {
      id: '',
      loading: false,
      expand_all: false,
      authorityList: [],
      form: {
        role_name: '',
        permission: []
      },
      rules: {
        role_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    // getRulesList() {
    //   return tree.listToTreeMulti(this.authorityList)
    // }
  },
  created() {
    this.getPermission()
    this.id = this.$route.query.id ? this.$route.query.id : ''
    if (this.$route.query.id) {
      this.getRoleInfo(this.$route.query.id)
    }
  },
  mounted() {
  },
  methods: {
    // 获取权限列表
    getPermission() {
      permissionApi.getList().then(res => {
        this.authorityList = res.data.list
      })
    },
    loadNode(node, resolve) {
      resolve()
    },
    renderContent(h, { node, data, store }) {
      let classname = ''
      if (node.childNodes.length === 0) {
        classname = 'floatRight'
      } else if (node.childNodes.length > 0) {
        classname = 'clearFloat'
      }
      return <span class={classname}>{node.label}</span>
    },
    handleNodeExpand() {
      this.changeCss()
    },
    changeCss() {
      this.$nextTick(() => {
        var levelName = document.getElementsByClassName('floatRight')
        for (var i = 0; i < levelName.length; i++) {
          const parentNode = levelName[i].parentNode
          parentNode.style.cssFloat = 'left'
          parentNode.style.styleFloat = 'left'
        }
        var clearFloat = document.getElementsByClassName('clearFloat')
        for (var j = 0; j < clearFloat.length; j++) {
          const parentNode = clearFloat[j].parentNode
          parentNode.style.clear = 'both'
          parentNode.style.clear = 'both'
        }
      })
    },
    // 获取角色详情
    getRoleInfo(id) {
      const _this = this
      this.loading = true
      rolesApi.roleDetail({
        id: id
      }).then(res => {
        this.form._id = res.data._id
        this.form.role_name = res.data.role_name
        this.form.permission = res.data.permission
        let permissionArr = []
        permissionArr = res.data.permission.split(',')
        setTimeout(() => {
          permissionArr.forEach(value => {
            _this.$refs.tree.setChecked(value, true, false)
          })
          _this.loading = false
        }, 500)
      })
    },
    // 提交check
    checkHandle(data) {
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys().join(',')
      const checkedKeys = this.$refs.tree.getCheckedKeys().join(',')
      if (halfCheckedKeys.length && checkedKeys.length) {
        this.form.permission = halfCheckedKeys + ',' + checkedKeys
      } else if (halfCheckedKeys.length && checkedKeys.length === 0) {
        this.form.permission = halfCheckedKeys
      } else if (halfCheckedKeys.length === 0 && checkedKeys.length) {
        this.form.permission = checkedKeys
      } else {
        this.form.permission = ''
      }
    },
    // 提交按钮
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.form._id) {
            rolesApi.editRole(_this.form).then(res => {
              this.$message({
                type: 'success',
                message: res.msg
              })
              _this.$router.go(-1)
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '更新失败'
              })
            })
          } else {
            rolesApi.addRole(_this.form).then(res => {
              this.$message({
                type: 'success',
                message: res.msg
              })
              _this.$router.go(-1)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '创建失败'
              })
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
