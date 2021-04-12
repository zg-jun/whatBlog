<style lang="scss" scoped>
.content {
  width: 100%;
  padding: 0 20px;
}
</style>

<template>
  <div class="article-list-content">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="url" label="网址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="avatar" label="头像"> </el-table-column>
      <el-table-column prop="datetime" label="发布日期">
        <template slot-scope="scope">
          <span>{{ scope.row.datetime | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="success" @click="handleShow(scope.row)"
            >通过</el-button
          >
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getAllArticle,
  recoveryArticle,
  showArticle,
  delArticle,
  
} from '@service/admin/article/article'

export default {
  filters: {},
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getAllArticle().then((res) => {
        this.tableData = res.data.data
      })
    },
    handleEdit({ _id }) {
      this.$router.push({ name: 'admin.addArticle', params: { id: _id } })
    },
    handleShow({ _id }) {
      showArticle({ _id }).then((res) => {
        this.$message({
          type: res.data.code === 0 ? 'success' : 'error',
          message: res.data.msg,
        })
        this.getList()
      })
    },
    handleRecovery({ _id }) {
      recoveryArticle({ _id }).then((res) => {
        this.$message({
          type: res.data.code === 0 ? 'success' : 'error',
          message: res.data.msg,
        })
        this.getList()
      })
    },
    handleDel({ _id }) {
      this.$confirm('确认删除？删除后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delArticle({ _id }).then((res) => {
            this.$message({
              type: res.data.code === 0 ? 'success' : 'error',
              message: res.data.msg,
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作',
          })
        })
    },
  },
}
</script>
