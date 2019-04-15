<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">

                <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-plus" @click="addVisible = true">新增</el-button>
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete" @click="deleteData">删除</el-button>
                <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="info" icon="el-icon-edit" @click="updateData">修改</el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view" @click="viewData">查看</el-button>
                <!--查看内部组信息-->
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="danger" icon="el-icon-view"
                           @click="viewJobData">查看-job</el-button>
                <!--维护内部组信息-->
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="danger" icon="el-icon-view"
                           @click="changeGroupData">维护-job</el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams">
            </elx-table>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="30%"
                    >
                <job-task-update ref="jobTaskUpdate" @refreshTable="search" @closeDialog="updateVisible = false" :updateUrl="updateUrl" :jobTaskList="jobTaskList"></job-task-update>
            </el-dialog>
            <el-dialog
                    title="新增"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    width="30%"
                   >
                <job-task-add ref="jobTaskAdd" @refreshTable="refreshTable" @closeDialog="addVisible = false" :addUrl="addUrl"/>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="30%">
                <job-task-view ref="jobTaskView" :jobTaskList="jobTaskList"/>
            </el-dialog>
            <!--查看工作组关系-->
            <el-dialog
                    :title="'工作名称:'+groupName"
                    :visible.sync="jobViewVisible"
                    v-if="jobViewVisible"
                    width="60%">
                <job-detail-view :groupCode="groupCode" :groupName="groupName"></job-detail-view>
            </el-dialog>
            <!--修改工作组关系-->
            <el-dialog
                    :title="'工作组名称:'+groupName"
                    :visible.sync="changeviewVisible"
                    v-if="changeviewVisible"
                    width="60%">
                <job-change-view ref="jobChangeView" :groupCode="groupCode"  :groupName="groupName"/>
            </el-dialog>

        </el-card>
    </div>
</template>
<script>
    import jobTaskUpdate from './jobTaskUpdate';
    import jobTaskAdd from './jobTaskAdd';
    import  jobTaskView from './jobTaskView';
    import  jobDetailView from './jobDetailView';
    import jobChangeView from './jobChangeView';
    export default {
        name: 'jobTaskList',
        components: {
            jobTaskUpdate,
            jobTaskAdd,
            jobTaskView,
            jobDetailView,
            jobChangeView
        },
        data() {
            return {

                url: "/loan/jobGroupAction.do?_md=selectJobGroup",
                updateUrl: "/loan/jobGroupAction.do?_md=updateByGroupCode",
                deleteUrl: "/loan/jobGroupAction.do?_md=deleteByGroupCode",
                addUrl: "/loan/jobGroupAction.do?_md=addJobGroup",

                columns: [{
                    prop: "groupCode",
                    label: "工作组编码"
                }, {
                    prop: "groupName",
                    label: "工作组名称"
                }, {
                    prop: "remark",
                    label: "描述信息"
                }],
                initParams: {},
                searchParams: {},
                jobTaskView:false,
                jobTaskList: {},
                addVisible: false,
                updateVisible: false,
                dialogTitle: "",
                jsonData: {},
                viewVisible:false,
                jobViewVisible:false,
                groupName:"",
                changeviewVisible:false
            }
        },
        methods: {
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            search() {
                this.$refs.table.search();
            },
            refreshTable() {
                this.$refs.table.refresh();
            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            updateData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                else {
                    this.groupCode = rows[0].groupCode;
                    this.jobTaskList = {...rows[0]};
                    this.updateVisible = true;
                }
            },
            dialogOnSubmit(dialog) {
                this.$refs[dialog].onSubmit();
            },
            viewData: function () {
                const rows = this.getSelectRows();
                this.jobTaskList = {...rows[0]};
                this.viewVisible = true;
            },
            viewJobData() {
                const rows = this.getSelectRows();
                this.groupCode = rows[0].groupCode;
                this.groupName = rows[0].groupName;
                this.jobViewVisible = true;
            },
            changeGroupData: function () {
                const rows = this.getSelectRows();
                this.groupCode = rows[0].groupCode;
                this.groupName = rows[0].groupName;
                this.changeviewVisible = true;
            },
            deleteData: function () {
                const _self = this;
                _self.$confirm("是否删除此信息", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    const rows = this.getSelectRows();
                    if (rows.length !== 1) {
                        this.$error("请选择一行数据");
                        return;
                    }
                    let groupCode = rows[0].groupCode;
                    _self.$http.post(_self.deleteUrl,
                        {"groupCode": groupCode})
                        .then(function (response) {
                            if (response.success) {
                                _self.$success(response.msg);
                                _self.$refs.table.refresh();
                            } else {
                                _self.$error(response.msg);
                            }
                        }).catch(function (error) {
                        _self.$error(error.message);
                    })
                }).catch(() => {
                    return false;
                })
            }
        }
    };
</script>