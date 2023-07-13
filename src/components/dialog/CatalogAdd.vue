<template>
  <el-dialog
    v-model="visible"
    title="新建目录"
    width="30%"
    :before-close="dialogClose"
  >
    <el-form
      label-position="left"
      label-width="100px"
      :model="catalogForm"
      :rules="catalogRule"
      ref="catalogForm"
    >
      <el-form-item label="目录名称" prop="name">
        <el-input v-model="catalogForm.name" clearable maxlength="10"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="catalogAddConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { catalogAdd } from '@/request/api'
import { ElMessage } from 'element-plus'

export default {
  name: 'CatalogAdd',
  props: {
    pid: {
      type: Number
    },
    catalogAddShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:catalogAddShow'],
  data () {
    return {
      visible: this.catalogAddShow,
      catalogForm: {
        name: ''
      },
      catalogRule: {
        name: [
          {
            required: true,
            message: '请输入目录名称'
          }
        ]
      }
    }
  },
  watch: {
    catalogAddShow () {
      this.visible = this.catalogAddShow
    }
  },
  methods: {
    catalogAddConfirm () {
      this.$refs.catalogForm.validate((valid) => {
        if (valid && this.pid != null) {
          const obj = {
            pid: this.pid,
            name: this.catalogForm.name
          }
          catalogAdd(obj).then(() => {
            this.$store.commit('set_catalogRefresh')
            ElMessage.success('新建成功')
            this.dialogClose()
          }).catch(() => {
            ElMessage.error('新建失败')
          })
        }
      })
    },
    dialogClose () {
      this.$emit('update:catalogAddShow', false)
      this.$refs.catalogForm.resetFields()
    }
  }
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
