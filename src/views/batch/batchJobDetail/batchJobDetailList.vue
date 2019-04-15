<!--liuyang-->
<!--yangzhu改动-->
<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px" >
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="job名称" prop="jobName">
                            <el-input type="text" v-model="searchParams.jobName" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="13">
                        <el-button type="primary" icon="el-icon-search" @click.native="search">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="success" icon="el-icon-plus" @click="addVisible = true">新增</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="delJobData">删除</el-button>
                <el-button size="mini" type="warning" icon="el-icon-edit" @click="updateJobData">修改</el-button>
                <el-button size="mini" type="primary" icon="el-icon-view" @click="viewJobData">查看</el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <el-dialog
                    title="新增job信息"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    width="30%"
                    >
                <job-detail-add ref="jobDetailAdd" @refreshTable="refresh" @closeDialog="addVisible = false"></job-detail-add>
            </el-dialog>
            <el-dialog
                    title="查看Job信息"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="30%"
                    >
                <job-detail-view :data="row"></job-detail-view>
            </el-dialog>
            <el-dialog
                    title="修改Job信息"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="30%"
                    >
                <job-detail-update ref="jobDetailUpdate" @refreshTable="refresh" @closeDialog="updateVisible = false" :data="row"></job-detail-update>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('jobDetailUpdate')">保存</el-button>
                    <el-button type="danger" @click="updateVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import sessionStorage from '@/utils/sessionStorage';
    import jobDetailAdd from './batchJobDetailAdd';
    import jobDetailView from './batchJobDetalView';
    import jobDetailUpdate from './batchJobDetailUpData';

    export default {
        name: 'userList',
        components: {jobDetailAdd, jobDetailView, jobDetailUpdate},

        data() {
            return {
                uploadData: {},
                url: "/loan/jobDetailAction.do?_md=findJobDetaiList",
                deleteUrl: "/loan/jobDetailAction.do?_md=deleteJobDetailByPrimaryKey",
                addVisible: false,
                viewVisible: false,
                jobName:'',
                updateVisible: false,
                columns: [{
                    prop: "jobName",
                    label: "job名称"
                }, {
                    prop: "jobType",
                    label: "job类型",
                    selectKey:'JOBTYPE'
                }, {
                    prop: "trandateType",
                    label: "交易日期类型",
                    selectKey: 'TRANDATETYPE'
                }, {
                    prop: "executePeriod",
                    label: "执行周期",
                    selectKey: 'EXECUTETYPE'
                }, {
                    prop: "remark",
                    label: "描述信息"
                }],
                searchParams: {
                    jobName:'',
                },
                initParams: {},
                row: {},

            }
        },
        mounted: function () {
        },
        methods: {
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            search(){
                this.$refs.table.search();
            },
            resetForm(){
                this.$refs.searchParams.resetFields();
            },
            refresh(){
                this.$refs.table.refresh();
            },
            delJobData() {
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
            viewJobData() {
                const rows = this.getSelectRows();
                const _this = this;
                if(rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.row = {...rows[0]};
                    _this.viewVisible = true;
                }
            },
            updateJobData() {
                const rows = this.getSelectRows();
                const _this = this;
                if(rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.row = {...rows[0]};
                    _this.updateVisible = true;
                }
            },
            dialogOnSubmit(dialog){
                this.$refs[dialog].onSubmit();
            }
        }
    };
</script>