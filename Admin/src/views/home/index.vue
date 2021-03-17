<template>
  <div class="dashboard-editor-container">
    <panel-group :panel-data="panelData" />

    <el-row v-loading="loading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;border-radius: 20px;">
      <line-chart :chart-data="panelData" />
    </el-row>
  </div>
</template>

<script>
import { indexApi } from '@/api/index'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      loading: false,
      panelData: {}
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      indexApi.getData().then(res => {
        this.loading = false
        this.panelData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    border-radius: 20px;
  }
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
