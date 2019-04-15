<template>
    <div>
        <el-row type="flex" class="row-bg" justify="start">
            <el-button size="mini" type="primary" icon="el-icon-circle-plus" @click="addItem">新增</el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteItem">删除</el-button>
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="updateItem">修改</el-button>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="searchItem">查询</el-button>
            <el-button size="mini" type="primary" icon="el-icon-view" @click="viewItem">查看</el-button>
        </el-row>
        <el-table
                :data="tableData"
                ref="table"
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick"
                border
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="custNo"
                    label="客户编号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="custName"
                    label="客户名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="certType"
                    label="证件类型"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="certNo"
                    label="证件编号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="custOrgId"
                    label="主管机构"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="custStatus"
                    label="客户状态"
                    align="center">
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :page-sizes="[10, 20, 50]"
                :current-page="pageNo"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalRows">
        </el-pagination>
        <add v-if="addVisible" ref="add"></add>
    </div>
</template>
<script>
import add from './entCustBaseInfoAdd'
export default {
  name: "appList",
  components: {
      add
  },
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      totalRows: null,
      addVisible: false,
      selection: []
    };
  },
  //数据初始化
  mounted: function() {
    this.initTableData();
  },
  methods: {
    initTableData: function() {
      const _this = this;
      this.$http
        .post("/loan/cusBaseInfoAction.do?_md=findCustBaseInfoList", {
          belongLine: "01",
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        })
        .then(function(response) {
          if (response.success) {
            _this.tableData = response.data.rows;
            _this.totalRows = response.data.totalRows;
          } else {
            _this.$error(response.msg);
          }
        })
        .catch(function(error) {
          _this.$error(error);
        });
    },
    //修改一页显示条目数
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize;
      this.initTableData();
    },
    //跳转当前页
    handleCurrentChange: function(pageNo) {
      this.pageNo = pageNo;
      this.initTableData();
    },
    handleSelectionChange: function(val) {
      this.selection = val;
    },
    //选中行事件
    handleRowClick: function(row, event, column) {
      this.selection = [row];
    },
    addItem: function() {
      this.addVisible = true
    },
    deleteItem: function() {
      console.log(this.selection);
    },
    updateItem: function() {
      console.log(this.selection);
    },
    searchItem: function() {
      console.log(this.selection);
    },
    viewItem: function() {
      console.log(this.selection);
    }
  }
};
</script>