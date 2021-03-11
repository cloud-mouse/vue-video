(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09692457"],{"0fea":function(t,e,a){"use strict";a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return o}));var n=a("b775"),i={authorityList:function(t){return Object(n["a"])({url:"/admin-api/permission",method:"get",params:t})},addRole:function(t){return Object(n["a"])({url:"/admin-api/role",method:"post",data:t})},editRole:function(t){return Object(n["a"])({url:"/admin-api/role",method:"patch",data:t})},roleList:function(t){return Object(n["a"])({url:"/admin-api/role",method:"get",params:t})},roleDetail:function(t){return Object(n["a"])({url:"/admin-api/role",method:"get",params:t})},delRole:function(t){return Object(n["a"])({url:"/admin-api/role",method:"delete",params:t})}},r={getAdminList:function(t){return Object(n["a"])({url:"/admin-api/admin",method:"get",params:t})},addAdmin:function(t){return Object(n["a"])({url:"/admin-api/admin",method:"post",data:t})},delAdmin:function(t){return Object(n["a"])({url:"/admin-api/admin",method:"get",params:t})},editAdmin:function(t){return Object(n["a"])({url:"/admin-api/admin",method:"patch",data:t})}},o={getList:function(t){return Object(n["a"])({url:"/admin-api/permission",method:"get",params:t})},addItem:function(t){return Object(n["a"])({url:"/admin-api/permission",method:"post",data:t})},updateItem:function(t){return Object(n["a"])({url:"/admin-api/permission",method:"patch",data:t})},deleteItem:function(t){return Object(n["a"])({url:"/admin-api/permission",method:"delete",params:t})}}},1788:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"roles-list main-content"},[a("div",{staticClass:"screen-box"},[a("div",{staticClass:"screen-item"},[a("el-input",{staticStyle:{width:"220px"},attrs:{size:"small",placeholder:"请输入角色名称",clearable:""},model:{value:t.keywords,callback:function(e){t.keywords=e},expression:"keywords"}}),t._v(" "),a("el-button",{attrs:{size:"small",icon:"el-icon-search",type:"primary"},on:{click:t.doSearch}},[t._v("搜索")])],1),t._v(" "),a("div",{staticClass:"operation"},[a("router-link",{attrs:{to:"/manage/roles/edit"}},[a("el-button",{attrs:{size:"small",icon:"el-icon-plus",type:"primary"}},[t._v("新增")])],1)],1)]),t._v(" "),a("div",{staticClass:"content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.rolesList,fit:"","highlight-current-row":"","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"_id",label:"ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"role_name",label:"角色名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:t._f("statusFilter")(e.row.status)}},[t._v(t._s(0==e.row.status?"禁用":"正常"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("timeFormat")(e.row.createTime))+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"更新时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("timeFormat")(e.row.updateTime))+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:"/manage/roles/edit?id="+e.row._id}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("编辑")])],1),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDelete(e.row._id)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-box"},[a("el-pagination",{attrs:{total:t.total,"current-page":t.currentPage,"page-sizes":[5,10,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])},i=[],r=a("0fea"),o=a("ed08"),s={filters:{timeFormat:function(t){return Object(o["b"])(new Date(t))},statusFilter:function(t){var e={1:"success",0:"danger"};return e[t]}},data:function(){return{keywords:"",total:0,pageSize:10,currentPage:1,rolesList:[]}},created:function(){this.getRoleList()},methods:{getRoleList:function(){var t=this;r["c"].roleList({currentPage:this.currentPage,pageSize:this.pageSize}).then((function(e){t.rolesList=e.data.list,t.total=e.data.count}))},handleCurrentChange:function(t){this.currentPage=t,this.getRoleList()},handleSizeChange:function(t){this.pageSize=t,this.getRoleList()},doSearch:function(){this.currentPage=1,this.getRoleList()},handleDelete:function(t){var e=this;this.$confirm("是否删除该角色?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",confirmButtonClass:"danger",center:!0}).then((function(){r["c"].delRole({id:t}).then((function(t){e.$message({type:"success",message:"删除成功!"}),e.getRoleList()}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))}}},l=s,c=(a("bce6"),a("2877")),u=Object(c["a"])(l,n,i,!1,null,"4ef547d1",null);e["default"]=u.exports},ab97:function(t,e,a){},bce6:function(t,e,a){"use strict";var n=a("ab97"),i=a.n(n);i.a}}]);