<template>
  <div class="screen-list">
    <div class="horizontal-navigation">
      <div class="search-box">
        <el-input v-model="searchContent" placeholder="请输入大屏名称" class="handle-input mr10"></el-input>
        <el-button plain type="primary" :icon="Search" @click="searchHandle">搜索</el-button>
      </div>
      <div class="addition-box">
        <el-button plain type="primary" :icon="Plus" @click="showScreenAdd">大屏添加</el-button>
      </div>
    </div>
    <el-table
      :data="screenList"
      style="width: 100%"
      :highlight-current-row="true"
    >
      <el-table-column
        v-for="(table, index) in tableHeader"
        :key="index"
        :prop="table.prop"
        :label="table.label"
        :min-width="table.width"
      >
      </el-table-column>
      <el-table-column min-width="210" label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="pageJump(scope.row.accessAddress)">预览</el-button>
          <el-button
            size="small"
            @click="screenShare(scope.row.accessAddress, scope.row.screenName)">分享</el-button>
          <el-button
            size="small"
            type="warning" plain
            @click="showScreenUpdate(scope.row.id)">修改</el-button>
          <el-button
            size="mini"
            type="danger" plain
            @click="checkinDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <screen-add v-model:screen-add-show="screenAddShow" :screen-list="getScreenList"></screen-add>
    <screen-update v-model:screen-update-show="screenUpdateShow" :id="id" :screen-list="getScreenList"></screen-update>
  </div>
</template>

<script>
import { Search, Plus } from '@element-plus/icons-vue'
import { screenList, screenSearch, screenDelete, screenShare } from '@/request/api'
import ScreenAdd from '@/components/dialog/ScreenAdd'
import ScreenUpdate from '@/components/dialog/ScreenUpdate'
import { ElMessage } from 'element-plus'

export default {
  name: 'ScreenList',
  data () {
    return {
      searchContent: null,
      screenList: [],
      currentPage: 1,
      id: null,
      screenAddShow: false,
      screenUpdateShow: false,
      Plus,
      Search,
      tableHeader: [
        {
          prop: 'id',
          label: '大屏id',
          width: '120'
        },
        {
          prop: 'screenName',
          label: '大屏名称',
          width: '120'
        },
        {
          prop: 'currentStatus',
          label: '大屏状态',
          width: '120'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: '170'
        }
      ]
    }
  },
  components: {
    ScreenAdd,
    ScreenUpdate
  },
  watch: {
  },
  methods: {
    showScreenAdd () {
      this.screenAddShow = true
    },
    showScreenUpdate (id) {
      this.id = id
      this.screenUpdateShow = true
    },
    checkinDelete (id) {
      this.$confirm('将删除该条入住记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        screenDelete(id).then(() => {
          ElMessage.success('删除成功')
          this.getScreenList()
        }).catch(() => {
          ElMessage.error('删除失败')
        })
      })
    },
    getScreenList () {
      screenList().then((res) => {
        this.screenList = res.data
      })
    },
    screenShare (url, name) {
      screenShare(url, name).then(() => {
        ElMessage.success('分享成功')
      })
    },
    searchHandle () {
      if (this.searchContent === null) {
        this.$message.error('请先输入大屏名称')
      } else {
        const name = this.searchContent
        screenSearch(name).then((res) => {
          // console.log(res)
          this.screenList = [res.data]
        })
      }
    },
    pageJump (url) {
      window.open(url)
    }
  },
  created () {
    this.getScreenList()
  }
}
</script>

<style scoped lang="scss">
.screen-list {
  padding: 20px 0 0 20px;
}

.horizontal-navigation {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.search-box {
  height: 100%;
  .el-input {
    width: 200px;
    height: 31.6px;
  }
  .el-button {
    float: right;
    margin: 0 20px;
  }
}

.addition-box {
  height: 100%;
  padding-right: 20px;
}

.el-pagination {
  margin: 30px 0;
  justify-content: center;
}
</style>
