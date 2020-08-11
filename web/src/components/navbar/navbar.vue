<style lang='scss' scoped>
.el-menu {
  border: none;
}
</style>

<template>
  <div class="nav-content">
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']"
               @select="selMenu">
        <el-submenu v-for="(item1,index1) in menuList"
                    :key="index1"
                    :index="`${index1+1}`">
          <template slot="title">{{item1.menuName}}</template>
          <el-menu-item-group>
            <el-menu-item v-for="(item2,index2) in  item1.childrenMenu"
                          :key="index2"
                          :index="`${index1+1}-${index2+1}`">{{item2.menuName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>

export default {
  data () {
    return {
      menuList: [
        {
          menuName: '文章管理',
          childrenMenu: [
            { menuName: '发布文章' },
            { menuName: '文章列表' }
          ]
        },
        {
          menuName: '权限管理',
          childrenMenu: [
            { menuName: '管理列表' }
          ]
        }
      ]
    }

  },
  methods: {
    selMenu (index) {
      switch (index) {
        case '1-1':
          this.$route.name !== 'admin.addArticle' && this.$router.push({ name: 'admin.addArticle' });
          break;
        case '1-2':
          this.$route.name !== 'admin.actionArticle' && this.$router.push({ name: 'admin.actionArticle' });
          break;
        case '2-1':
          this.$route.name !== 'admin.adminList' && this.$router.push({ name: 'admin.adminList' });
          break;
      }
    }
  }
}

</script>