<style lang='scss' scoped>
.content {
  width: 100%;
  padding: 0 20px;
}
</style>

<template>
  <div class="admin-list-content">
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column type="index"
                       label="#">
      </el-table-column>
      <el-table-column prop="username"
                       label="账户名"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="isDisable"
                       label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDisable===0?'success':'danger'">{{scope.row.isDisable===0?'启用':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="datetime"
                       label="注册时间">
        <template slot-scope="scope">
              <span>{{scope.row.datetime | formatTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="240">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="handleEdit(scope.$index, scope.row)">启用</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleRecovery(scope.$index, scope.row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAdminUser } from '@service/admin/authorization/authorization';

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
      getAdminUser().then(res => {
        this.tableData = res.data.data;
      })
    }
  },
}

</script>