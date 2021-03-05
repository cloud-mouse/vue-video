<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import io from 'socket.io-client'
// import { getToken, getAdminId } from '@/utils/auth'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted() {
    // const WS_HOST = 'http://192.168.31.180:8001'
    // const msgSocket = io(`${WS_HOST}`, {
    //   // secure: true,
    //   path: '/socket.io'
    // })
    // msgSocket.on('open', function(socket) {
    //   console.log(msgSocket, socket)
    //   msgSocket.emit('sendInfo', {
    //     socketId: msgSocket.id,
    //     adm_sign: getToken(),
    //     adminId: getAdminId()
    //   })
    //   msgSocket.on('offline', function(socket) {
    //     console.log(socket)
    //   })
    // })
  },
  created() {

  }
}
</script>
<style lang="scss">
.uploader{
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
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .cloud_img {
    width: 150px;
    height: 150px;
    display: block;
  }
}

.changes-status.el-switch.is-disabled {
  opacity: 1;
  .el-switch__core {
    cursor: pointer;
  }
}
</style>
