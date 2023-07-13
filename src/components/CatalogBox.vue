<template>
  <div class="catalog-box">
    <div class='catalog-list'>
      <div v-for="catalog in catalogTree" :key="catalog.id">
        <div class="catalog-row">
          <div @click="showCatalogAdd(catalog.id)">
            <el-icon>
              <CirclePlus />
            </el-icon>
          </div>
          <div class="catalog-title" @click="nodeClick(catalog)" @contextmenu="showCatalogUpdate(catalog.id, $event)">{{ catalog.name }}</div>
          <el-popconfirm
            title="确定删除该目录吗？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteCatalog(catalog.id)"
            width="200px"
          >
            <template #reference>
              <el-icon>
                <Remove />
              </el-icon>
            </template>
          </el-popconfirm>
        </div>
        <template v-if="catalog.screenList">
          <div class="screen-list">
            <div v-for="(screen, index) in catalog.screenList" :key="index">
              <a :href="screen.accessAddress">{{ screen.screenName }}</a>
            </div>
          </div>
        </template>
        <div v-if="catalog.children && catalog.children.length" v-show="isOpen(catalog.id)">
          <CatalogBox :catalog-tree="catalog.children" @node-click="$emit('node-click', $event)"/>
        </div>
      </div>
    </div>
    <catalog-add v-model:catalog-add-show="catalogAddShow" :pid="pid"></catalog-add>
    <catalog-update v-model:catalog-update-show="catalogUpdateShow" :id="id"></catalog-update>
  </div>
</template>

<script>
import { CirclePlus, Remove } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { catalogDelete } from '@/request/api'
import CatalogAdd from '@/components/dialog/CatalogAdd.vue'
import CatalogUpdate from '@/components/dialog/CatalogUpdate.vue'
export default {
  name: 'CatalogBox',
  components: { Remove, CirclePlus, CatalogAdd, CatalogUpdate },
  props: {
    catalogTree: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      expandNode: [], // 当前需要展开的结点id组成的数组
      CirclePlus,
      Remove,
      catalogAddShow: false,
      catalogUpdateShow: false,
      pid: null,
      id: null
    }
  },
  methods: {
    // 子组件向父组件传值，在div中使用递归思想，点击目录对所点击的目录信息传给父组件
    nodeClick (catalog) { // 点击查看结点有没有在展开数组中，在就删除关闭，没在就添加打开
      this.$emit('node-click', catalog)
      if (catalog.children && catalog.children.length) {
        const index = this.expandNode.indexOf(catalog.id)
        console.log(index)
        if (index > -1) {
          this.expandNode.splice(index, 1)
        } else {
          this.expandNode.push(catalog.id)
        }
      }
    },
    isOpen (id) {
      return this.expandNode.includes(id)
    },
    deleteCatalog (id) {
      catalogDelete(id).then(() => {
        this.$store.commit('set_catalogRefresh')
        ElMessage.success('目录删除成功')
      }).catch(() => {
        ElMessage.error('目录删除失败')
      }) // 调用接口删除目录
    },
    showCatalogAdd (pid) {
      this.pid = pid
      this.catalogAddShow = true
    },
    showCatalogUpdate (id, event) {
      event.preventDefault()
      this.id = id
      this.catalogUpdateShow = true
    }
  }
}
</script>

<style scoped lang="scss">
.catalog-box {
  border-left: solid 2px #88ceeb;
  border-bottom: solid 2px #88ceeb;
  border-radius: 10px;
  margin: 10px 40px;
  padding-left: 20px;
}

.catalog-title {
  font-size: 1.2rem;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    color: #409EFF;
  }
}

.catalog-row {
  display: flex;
  align-items: center;
  color: rgba(77, 77, 77, 0.7);
  .el-icon:hover {
    color: #409EFF;
  }
}

.screen-list {
  display: flex;
  flex-wrap: wrap;

  div {
    margin-bottom: 10px;
    margin-right: 10px;
  }

  a {
    text-decoration: none;
    font-size: 1rem;
  }

  .router-link-active {
    text-decoration: none;
    font-size: 1rem;
  }
}

</style>
