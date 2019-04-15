<template>
    <div>
        <el-row type="flex" class="row-bg" justify="start">
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="addVisible = true">新增</el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteRow(selection)" :disabled="this.selection.length === 0||this.disabled">删除</el-button>
            <el-button size="mini" type="primary" icon="el-icon-edit">修改</el-button>
            <el-button size="mini" type="primary" icon="el-icon-view">查看</el-button>
            <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
        </el-row>

        <el-dialog title="新增" :visible.sync="addVisible" width="70%">
            <CcgApplyAdd @refreshTable="initTableData" @closeDialog="addVisible = false"></CcgApplyAdd>
        </el-dialog>

        <pager-table element-loading-text="拼命加载中..." ref="table" :url="url" :columnlist="columnlist" @getSelectInfo="getSelectInfo"></pager-table>
    </div>
</template>
<script>
    import CcgApplyAdd from './ccgApplyAdd.vue';

    export default {
        name: 'CcgApplyList',
        components: {
            pagerTable,
            CcgApplyAdd,
        },
        data() {
            return {
                url: "/loan/applyAction.do?_md=selectApplyByPage",
                addVisible: false,
                columnlist: [{
                    type: "selection"
                }, {
                    prop: "applyNo",
                    label: "申请编号"
                }, {
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "approveSts",
                    label: "申请状态"
                }, {
                    prop: "totalScore",
                    label: "总分数"
                }, {
                    prop: "autoScore",
                    label: "系统评定得分"
                }, {
                    prop: "autoGrade",
                    label: "系统评定等级"
                }, {
                    prop: "adjustGrade",
                    label: "人工调整等级"
                }, {
                    prop: "grtType",
                    label: "担保方式"
                }, {
                    prop: "custMgr",
                    label: "客户经理"
                }, {
                    prop: "createUser",
                    label: "登记人"
                }, {
                    prop: "createOrg",
                    label: "登记机构"
                }, {
                    prop: "createTime",
                    label: "登记日期"
                }],
                selection: [],//选中显示的值
            }
        },
        mounted: function () {
        },
        methods: {
            getSelectInfo(val) {
                this.selection = val;
                if(this.selection.length > 1){
                    this.$message.error('请选择一条!');
                }
            },
            search() {
                this.argument = {"userName": this.userName},
                    this.$refs.table.initTableData(this.argument);
            },
            // 多个删除
            deleteRows(rows) {
                var ids = [];
                rows.forEach(element =>{
                    ids.push(element.id)
                })
                this.$confirm('此操作将永久删除,是否继续?', '提示', { type: 'warning' })
                    .then(() => {
                        this.$http.post("/loan/applyAction.do?_md=deleteApplyByPrimaryKey",{ids:ids})
                            .then((response) => {
                                if(response.success){
                                    this.$message.success(response.msg);
                                    this.$refs.table.initTableData();
                                }else{
                                    this.$message.error(response.msg);
                                }
                            })
                            .catch((response) => {
                                this.$message.error('删除失败!');
                            });
                    })
                    .catch(() => {
                        this.$message.info('已取消操作!');
                    });
            },
            //单个删除
            deleteRow(row) {
                debugger;
                this.$confirm('此操作将永久删除,是否继续?', '提示', { type: 'warning' })
                    .then(() => {
                        this.$http.post("/loan/applyAction.do?_md=deleteApplyByPrimaryKey",{id:row[0].id})
                            .then((response) => {
                                if(response.success){
                                    this.$message.success(response.msg);
                                    this.$refs.table.initTableData();
                                }else{
                                    this.$message.error(response.msg);
                                }
                            })
                            .catch((response) => {
                                this.$message.error('删除失败!');
                            });
                    })
                    .catch(() => {
                        this.$message.info('已取消操作!');
                    });
            },


        }
    };
</script>