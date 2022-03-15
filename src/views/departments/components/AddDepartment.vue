<template>
  <el-dialog
    title="新增部门"
    center
    :visible="showDialog"
  >
    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="编码">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="负责人">
        <el-select style="width:80%" placeholder="请选择" value="" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" type="primary" @click="showDialog = false">确 定</el-button>
        <el-button size="small" @click="showDialog = false">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDepartment',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {
        })
    }
  }
}
</script>

<style scoped></style>
