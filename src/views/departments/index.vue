<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">

        <!--头部-->
        <TreeTools :tree-node="company" :is-root="true" />
        <!--/头部-->

        <!--tree-->
        <el-tree :data="departments" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools :tree-node="data" />
          </template>
        </el-tree>
        <!--/tree-->

      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from '@/views/departments/components/TreeTools.vue'

export default {
  name: 'Departments',
  components: { TreeTools },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departments: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
