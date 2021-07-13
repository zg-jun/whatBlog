<style lang="scss" scoped>
.container-t {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .container-t-l {
    ::v-deep .el-form {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
.container-b {
  /deep/ .el-table {
    .cell {
      display: flex;
      align-items: center;
    }
  }
}
</style>

<template>
  <div class="friend-manage-container">
    <!-- <div class="container-t">
      <div class="container-t-l">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input
              size="small"
              v-model="formInline.name"
              placeholder="请填写名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="getList"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="container-t-r">
        <el-button size="small" type="primary" @click="friendDialogVisible = true">添加</el-button>
      </div>
    </div> -->
    <div class="container-b">
      <el-table
        :data="tableData"
        style="width: 100%;"
        row-key="_id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <el-avatar
              shape="square"
              :size="30"
              fit="fill"
              :src="scope.row.avatar"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容"> </el-table-column>
        <el-table-column prop="nickName" label="昵称"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="site" label="网址">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.site">{{ scope.row.site }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="datetime" label="评论时间">
          <template slot-scope="scope">
            <span>{{ scope.row.datetime | formatTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getComment } from '@service/back/article/article'

export default {
  filters: {},
  data() {
    return {
      tableData: [],
      formInline: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getComment().then((res) => {
        this.tableData = res.data.data
      })
    },
  },
}
</script>
