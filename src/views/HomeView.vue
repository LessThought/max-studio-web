<template>
  <div className="home">
    <div className="catalog">
      <span>Max Studio</span>
      <div className="catalog-list">
        <div class="root-add" @click="showCatalogAdd">
          <el-icon>
            <CirclePlus />
          </el-icon>
          <span>root</span>
        </div>
        <CatalogBox :catalog-tree="navigations" @node-click="nodeClick"/>
      </div>
      <div class="screen-list">
        <router-link to="/screen">Screen List</router-link>
      </div>
    </div>
    <catalog-add v-model:catalog-add-show="catalogAddShow" :pid="pid"></catalog-add>
  </div>
</template>

<script>
import CatalogBox from '@/components/CatalogBox.vue'
import { catalogList } from '@/request/api'
import { CirclePlus } from '@element-plus/icons-vue'
import CatalogAdd from '@/components/dialog/CatalogAdd.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      catalogAddShow: false,
      pid: null,
      navigations: []
    }
  },
  components: {
    CirclePlus,
    CatalogBox,
    CatalogAdd
  },
  watch: {
    isRefresh () {
      this.getCatalogList()
    }
  },
  computed: {
    isRefresh () {
      return this.$store.state.catalogRefresh
    }
  },
  methods: {
    nodeClick (val) {
      console.log(val)
    },
    getCatalogList () {
      catalogList().then((res) => {
        this.navigations = res.data
      })
    },
    showCatalogAdd () {
      this.pid = 0
      this.catalogAddShow = true
    }
  },
  created () {
    this.getCatalogList()
  }
}
</script>

<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  overflow-y: scroll;
  background: linear-gradient(to right top, rgb(205, 230, 255), rgba(121, 187, 255, 0.12)), white;
}

.catalog {
  color: darkorange;
  font-size: 1.2rem;
}

.root-add {
  display: flex;
  align-items: center;
  margin: 10px 40px;
}

.root-add .el-icon{
  margin-right: 10px;
}

.screen-list {
  margin-top: 20px;
  a {
    color: darkorange;
  }
}
</style>
