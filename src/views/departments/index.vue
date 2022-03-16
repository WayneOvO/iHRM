<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!--头部-->
        <TreeTools
          :tree-node="company"
          :is-root="true"
          @addDepartment="addDepartment"
        />
        <!--/头部-->

        <!--tree-->
        <el-tree :data="departments" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools
              :tree-node="data"
              @addDepartment="addDepartment"
              @delDepartments="getDepartments"
            />
          </template>
        </el-tree>
        <!--/tree-->
      </el-card>

      <AddDepartment
        :show-dialog="showDialog"
        :tree-node="treeNode"
      />
    </div>
  </div>
</template>

<script>
import TreeTools from '@/views/departments/components/TreeTools.vue'
import AddDepartment from '@/views/departments/components/AddDepartment.vue'
import { getDepartments } from '@/api/departments.js'
import { listToTree } from '@/utils/index.js'

export default {
  name: 'Departments',
  components: { AddDepartment, TreeTools },
  data() {
    return {
      company: {},
      departments: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      showDialog: false,
      treeNode: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const data = await getDepartments()
      this.company = { name: data.companyName, manager: '负责人', id: '' }
      this.departments = listToTree(data.depts, '')
    },
    addDepartment(treeNode) {
      this.showDialog = true
      this.treeNode = treeNode
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
