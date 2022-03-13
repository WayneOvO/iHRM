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
import { getDepartments } from '@/api/departments.js'
import { listToTree } from '@/utils/index.js'

export default {
  name: 'Departments',
  components: { TreeTools },
  data() {
    return {
      company: {},
      departments: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const data = await getDepartments()
      this.company = { name: data.companyName, manager: '负责人' }
      this.departments = listToTree(data.depts, '')
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
