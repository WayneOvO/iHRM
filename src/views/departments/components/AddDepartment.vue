<template>
  <el-dialog :title="showTitle" center :visible="showDialog" @close="onCancel">
    <el-form
      ref="departmentForm"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item prop="name" label="名称">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item prop="code" label="编码">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item prop="manager" label="负责人">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          value=""
          @focus="onFocus"
        >
          <el-option
            v-for="item in people"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="介绍">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="onSubmit"
        >确 定</el-button>
        <el-button size="small" @click="onCancel">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  addDepartments,
  getDepartmentDetail,
  getDepartments,
  updateDepartments
} from '@/api/departments.js'
import { getEmployeeSimple } from '@/api/employees.js'

export default {
  name: 'AddDepartment',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat
      if (this.formData.id) {
        // 修改
        isRepeat = depts
          .filter(
            (item) => item.pid === this.treeNode.pid && item.id !== this.treeNode.id
          )
          .some((item) => item.name === value)
      } else {
        // 新增
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value)
      }
      isRepeat
        ? callback(new Error(`已存在 ${value}`))
        : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat
      if (this.formData.id) {
        // 修改
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        // 新增
        isRepeat = depts.some((item) => item.code === value && value)
      }
      isRepeat ? callback(new Error(`已存在 ${value}`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur'
          },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '部门介绍要求1-300个字符',
            trigger: 'blur'
          }
        ]
      },
      people: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async onFocus() {
      this.people = await getEmployeeSimple()
    },
    onSubmit() {
      this.$refs.departmentForm.validate(async(valid) => {
        if (valid) {
          if (this.formData.id) {
            await updateDepartments(this.formData)
          } else {
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('addDepartment')
          this.$emit('update:showDialog', false)
        }
      })
    },
    onCancel() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('update:showDialog', false)
      this.$refs.departmentForm.resetFields()
    },
    async getDepartmentsDetail(id) {
      this.formData = await getDepartmentDetail(id)
    }
  }
}
</script>

<style scoped></style>
