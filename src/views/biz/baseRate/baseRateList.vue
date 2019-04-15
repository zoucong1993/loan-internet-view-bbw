<template>
    <div>

        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'rateName':'利率名称','termMin':'最小期限','termMax':'最大期限'}]">
        </elx-search-card>

        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 3px 0;padding-bottom: 10px">
                <el-button icon="el-icon-plus" type="primary" @click="baseRateAdd">新增</el-button>
                <el-button icon="el-icon-edit" type="success" @click="baseRateUpdate">修改</el-button>
                <el-button icon="el-icon-delete" type="danger" @click="baseRateDelete">删除</el-button>
            </el-row>
            <el-row>
                <elx-table ref="table"
                           :url="url"
                           :columns="columns"
                           :initParams="initParams"
                           :searchParams="searchParams"
                >
                </elx-table>
            </el-row>
        </el-card>
        <el-dialog
                title="新增"
                :visible.sync="baseRateAddDialog"
                v-if="baseRateAddDialog"
                width="70%"
                :before-close="handleClose">
                <base-rate-add @refreshTable="refreshTable" @closeDialog="baseRateAddDialog = false" ></base-rate-add>
        </el-dialog>
        <el-dialog
                title="修改"
                :visible.sync="baseRateUpdateDialog"
                v-if="baseRateUpdateDialog"
                width="70%"
                :before-close="handleClose">
            <base-rate-update :rows="rows"  @refreshTable="refreshTable" @closeDialog="baseRateUpdateDialog = false"></base-rate-update>
        </el-dialog>
    </div>
</template>

<script>
    import baseRateAdd from "./baseRateAdd"
    import baseRateUpdate from "./baseRateUpdate"

    export default {
        name: "baseRateList",
        components: {
            baseRateAdd,
            baseRateUpdate
        },
        data() {
            return {
                baseRateAddDialog: false,
                baseRateUpdateDialog: false,
                rows:{},
                url: '/loan/baseRateAction.do?_md=selectList',
                initParams:{},
                searchParams:{},
                columns:[
                    {
                        label: '利率名称',
                        prop: 'rateName',
                    },

                    {
                        label: '利率值',
                        prop: 'rate',
                    },

                    {
                        label: '最小期限',
                        prop: 'termMin',
                    },

                    {
                        label: '最大期限',
                        prop: 'termMax',
                    },

                    {
                        label: '备注',
                        prop: 'remark',
                    },

                    {
                        label: '生效日期',
                        prop: 'effectDate',
                    },

                    {
                        label: '登记人员',
                        prop: 'createUserName',
                    },

                    {
                        label: '登记机构',
                        prop: 'createOrgName',
                    },

                    {
                        label: '登记日期',
                        prop: 'createTime',
                    },
                ],
            }
        },
        methods:{
            baseRateDelete(){
                const _this = this;
                let row = _this.getSelectRows()
                console.info(row)
                if (row.length === 0) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.$confirm('是否删除该条数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(
                        '/loan/baseRateAction.do?_md=deleteBaseRateById',
                        {'id': row[0].id}
                    ).then(function (response) {
                        if (response.success) {
                            _this.$success('删除成功')
                            _this.refreshTable()
                        }
                    }).catch(function (error) {
                        _this.$error(error.message);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            baseRateAdd(){
                const _this = this;
                _this.baseRateAddDialog = true
            },
            baseRateUpdate(){
                const _this = this;
                let row = _this.getSelectRows()
                if (row.length === 0) {
                    this.$error("请选择一行数据");
                    return;
                }
                _this.rows = {...row[0]}
                _this.baseRateUpdateDialog = true
            },
            refreshTable() {
                this.$refs.table.refresh();
            },

        }
    }
</script>
