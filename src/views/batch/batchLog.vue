<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px" :prop="searchParams" v-show="!into">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="批次号" prop="batchNo">
                            <el-input type="text" v-model="searchParams.batchNo" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="job编码" prop="jobCode">
                            <el-input type="text" v-model="searchParams.jobCode" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="交易日期" prop="trandate">
                            <el-date-picker type="date" v-model="searchParams.trandate" size="small"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-button type="primary" icon="el-icon-search" @click.native="search">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card" shadow="never">
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams">
            </elx-table>
        </el-card>
    </div>
</template>
<script>

    export default {
        name: 'batchLog',
        components: {},
        props: {},
        data() {
            return {
                url: "/loan/batchLogAction.do?_md=listBatchScheduleLog",
                columns: [{
                    prop: "batchNo",
                    label: "批次号"
                }, {
                    prop: "jobCode",
                    label: "job编码"
                }, {
                    prop: "trandate",
                    label: "交易日期"
                }, {
                    prop: "stepCode",
                    label: "工作步"
                }, {
                    prop: "status",
                    label: "状态"
                }, {
                    prop: "startTime",
                    label: "开始执行时间"
                }, {
                    prop: "endTime",
                    label: "结束时间"
                }, {
                    prop: "errorMsg",
                    label: "错误信息"
                }],
                searchParams: {
                    batchNo: '',
                    jobCode: '',
                    trandate: ''
                },
                initParams: {},
                row: {}
            }
        },
        mounted: function () {
        },
        methods: {
            onSubmit() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.$emit('getRows', rows[0]);
            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            },
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            search() {
                this.$refs.table.search();
            },
            refresh() {
                this.$refs.table.refresh();
            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            delRuleSetData() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                let id = rows[0].id;
                this.$confirm('此操作将永久删除,是否继续?', '提示', {type: 'warning'})
                    .then(() => {
                        this.$http.post(_this.deleteUrl,
                            {"id": id}).then(function (response) {
                            if (response.success) {
                                _this.$success(response.msg);
                                _this.refresh();
                            }
                        }).catch(function (error) {
                            _this.$error(error);
                        })
                    })
                    .catch(() => {
                        this.$info('已取消操作!');
                    });
            },
            updateRuleSetData() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.row = {...rows[0]};
                    _this.updateVisible = true;
                }
            },
            addRuleUnit() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.row = {...rows[0]};
                    _this.addRuleVisible = true;
                }
            },
        }
    };
</script>