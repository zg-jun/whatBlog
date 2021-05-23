<style lang='scss' scoped>
.el-menu {
  border: none;
}
</style>

<template>
  <div class="nav-content">
    <el-aside width="200px">
      <el-menu :default-openeds="['1']"
               unique-opened
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
            // { menuName: '发布文章' },
            { menuName: '文章列表' }
          ]
        },
        {
          menuName: '权限管理',
          childrenMenu: [
            { menuName: '管理员列表' }
          ]
        },
        {
          menuName: '站点管理',
          childrenMenu: [
            { menuName: '友链列表' },
            // { menuName: '站点配置' }
          ]
        }
      ]
    }
  },
  methods: {
    selMenu (index) {
      switch (index) {
        // case '1-1':
        //   this.$route.name !== 'addArticle' && this.$router.push({ name: 'addArticle' });
        //   break;
        case '1-1':
          this.$route.name !== 'articleManage' && this.$router.push({ name: 'articleManage' });
          break;
        case '2-1':
          this.$route.name !== 'adminManage' && this.$router.push({ name: 'adminManage' });
          break;
        case '3-1':
          this.$route.name !== 'friendManage' && this.$router.push({ name: 'friendManage' });
          break;
      }
    }
  }
}

</script>