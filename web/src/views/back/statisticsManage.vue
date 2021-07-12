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
::v-deep .el-dialog {
  .el-dialog__body {
    padding: 0 20px;
    .el-form-item {
      &:nth-last-child(1) {
        margin: 0;
      }
      .wangeditor {
        .w-e-text {
          overflow: auto;
        }
      }
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
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="ip" label="IP" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="位置" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="visits" label="访问次数"> </el-table-column>
        <el-table-column prop="updatetime" label="最近访问日期">
          <template slot-scope="scope">
            <span>{{ scope.row.updatetime | formatTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getStatistics } from '@service/back/statistics/statistics'

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
      getStatistics().then((res) => {
        this.tableData = res.data.data
      })
    },
  },
}
</script>
