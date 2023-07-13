<template>
  <el-dialog
    v-model="visible"
    title="目录修改"
    width="30%"
    @close="dialogClose"
  >
    <el-form
      label-position="left"
      label-width="100px"
      :model="catalogForm"
      :rules="catalogRule"
      ref="catalogForm"
    >
      <el-form-item label="目录名称" prop="name">
        <el-input v-model="catalogForm.name" clearable maxlength="10" placeholder="请输入目录名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="catalogUpdateConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { catalogUpdate } from '@/request/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'CatalogUpdate',
  props: {
    id: {
      type: Number
    },
    catalogUpdateShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: this.catalogUpdateShow,
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
    catalogUpdateShow () {
      this.visible = this.catalogUpdateShow
    }
  },
  methods: {
    catalogUpdateConfirm () {
      this.$refs.catalogForm.validate((valid) => {
        if (valid && this.id != null) {
          const obj = {
            id: this.id,
            name: this.catalogForm.name
          }
          catalogUpdate(obj).then(() => {
            this.$store.commit('set_catalogRefresh')
            ElMessage.success('修改成功')
            this.dialogClose()
          }).catch(() => {
            ElMessage.error('修改失败')
          })
        }
      })
    },
    dialogClose () {
      this.$emit('update:catalogUpdateShow', false)
      this.$refs.catalogForm.resetFields()
    }
  }
})
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
