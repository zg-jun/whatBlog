<style lang='scss' scoped>
.content {
  width: 100%;
  padding: 0 20px;
}
</style>

<template>
  <div class="article-list-content">
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column type="index"
                       label="#">
      </el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="abstract"
                       label="摘要"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="author"
                       label="作者">
      </el-table-column>
      <el-table-column prop="isDel"
                       label="文章状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDel===0?'success':'danger'">{{scope.row.isDel===0?'公开':'回收'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="datetime"
                       label="发布日期">
        <template slot-scope="scope">
              <span>{{scope.row.datetime | formatTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="240">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.isDel===0"
                     size="mini"
                     type="warning"
                     @click="handleRecovery(scope.row)">回收</el-button>
          <el-button v-else
                     size="mini"
                     type="success"
                     @click="handleShow(scope.row)">公开</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllArticle, recoveryArticle, showArticle, delArticle } from '@service/admin/article/article';

export default {
  filters:{
    formatTime: function (value) {
      if (!value) return '--';
      let dateObj = new Date(value);
      let y = dateObj.getFullYear();
      let m = dateObj.getMonth()+1;
      let d = dateObj.getDate();
      let h = dateObj.getHours();
      let mi = dateObj.getMinutes();
      let s = dateObj.getSeconds();
      return `${y}-${String(m).padStart(2,0)}-${String(d).padStart(2,0)} ${String(h).padStart(2,0)}:${String(mi).padStart(2,0)}:${String(s).padStart(2,0)}`;
    },
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      getAllArticle().then(res => {
        this.tableData = res.data.data;
      })
    },
    handleEdit ({ _id }) {
      this.$router.push({ name: 'admin.addArticle', params: { id: _id } })
    },
    handleShow ({ _id }) {
      showArticle({ _id }).then(res => {
        this.$message({
          type: res.data.code === 0 ? 'success' : 'error',
          message: res.data.msg
        });
        this.getList();
      })
    },
    handleRecovery ({ _id }) {
      recoveryArticle({ _id }).then(res => {
        this.$message({
          type: res.data.code === 0 ? 'success' : 'error',
          message: res.data.msg
        });
        this.getList();
      })
    },
    handleDel ({ _id }) {
      this.$confirm('确认删除？删除后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticle({ _id }).then(res => {
          this.$message({
            type: res.data.code === 0 ? 'success' : 'error',
            message: res.data.msg
          });
          this.getList();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除操作'
        });
      });
    }
  },
}

</script>