<!--任务的显示，里面包含了很多工作组-->
<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-plus"
                           @click="addVisible = true">新增

                </el-button>
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                           @click="deleteData">删除

                </el-button>
                <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="info" icon="el-icon-edit"
                           @click="updateData">修改

                </el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewGroupData">查看工作组

                </el-button>
                <el-button size="mini" type="warning" icon="el-icon-sort" @click="scheduleClick">任务配置</el-button>

                <el-button size="mini" type="success" icon="el-icon-sort" @click="startTaskStatus">启动任务</el-button>

                <el-button size="mini" type="danger" icon="el-icon-sort" @click="viewTaskState">查看任务状态</el-button>

            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams">
            </elx-table>
            <el-dialog
                    title="新增"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    width="40%"
            >
                <task-ref-add ref="taskRefAdd" @refreshTable="refreshTable" @closeDialog="addVisible = false"/>
            </el-dialog>
            <!--查看工作关系-->
            <el-dialog
                    :title="'任务名称:'+taskName"
                    :visible.sync="groupviewVisible"
                    v-if="groupviewVisible"
                    width="60%">
                <task-group-view ref="taskGroupView" :taskCode="taskCode" :taskName="taskName"/>
            </el-dialog>
            <!--查看任务的配置-->
            <el-dialog
                    title="任务配置"
                    :visible.sync="scheduleVisible"
                    v-if="scheduleVisible"
                    width="60%">
                <job-task-schedule ref="jobTaskSchedule" :taskCode="taskCode" :jsonData="jsonData" :curVers="curVers"
                                   @refreshTable="search" @closeDialog="scheduleVisible = false"/>
                <div slot="footer" class="dialog-footer" falign="center">
                    <el-button type="primary" @click="dialogOnSubmit('jobTaskSchedule')">保存</el-button>
                    <el-button type="danger" @click="scheduleVisible = false">取消</el-button>
                </div>
            </el-dialog>


            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="60%"
            >
                <task-group-update ref="taskGroupUpdate" @refreshTable="search" @closeDialog="updateVisible = false"
                                   :updateUrl="updateUrl" :jobTaskList="jobTaskList"></task-group-update>
            </el-dialog>

            <!--查看任务状态-->
            <el-dialog
                    :title="'任务名称:'+taskName"
                    :visible.sync="viewTaskStateVisible"
                    v-if="viewTaskStateVisible"
                    width="60%">
                <view-task-status ref="viewTaskStatus" :taskCode="taskCode" :taskName="taskName"/>
            </el-dialog>


        </el-card>
    </div>
</template>
<script>
    import taskGroupView from './taskGroupRefView';
    import jobTaskSchedule from './jobTaskSchedule';
    import taskRefAdd from './taskGroupRefAdd';
    import taskGroupUpdate from './taskGroupRefUpdate';
    import viewTaskStatus from './viewTaskStatus';

    export default {
        name: 'taskGroupRef',
        components: {
            taskGroupView,
            jobTaskSchedule,
            taskRefAdd,
            taskGroupUpdate,
            viewTaskStatus
        },
        data() {
            return {
                url: "/loan/jobTaskAction.do?_md=selectJobTask",
                deleteUrl: "/loan/jobTaskAction.do?_md=deleteByTaskCode",
                updateUrl: "/loan/jobTaskAction.do?_md=updateByTaskCode",
                startTaskUrl: "/loan/jobTaskAction.do?_md=pushBatchMq",

                columns: [
                    {
                        prop: "taskCode",
                        label: "任务编码"
                    }, {
                        prop: "taskName",
                        label: "任务名称"
                    }, {
                        prop: "status",
                        label: "状态",
                        selectKey: "BTH_TASK_STATUS"
                    }, {
                        prop: "remark",
                        label: "备注"
                    }],
                initParams: {},
                searchParams: {},
                groupviewVisible: false,
                scheduleVisible: false,
                jsonData: {},
                curVers: 1,
                taskCode: '',
                taskName: '',
                addVisible: false,
                updateVisible: false,
                viewTaskStateVisible: false

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
            scheduleClick() {
                let rows = this.getSelectRows();
                this.taskCode = rows[0].taskCode;
                this.jsonData = rows[0].groupsJson;
                this.curVers = rows[0].curVers;
                this.scheduleVisible = true;
            },
            viewTaskState() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("亲，请选择一行数据");
                    return;
                }
                else {
                    let rows = this.getSelectRows();
                    this.taskCode = rows[0].taskCode;
                    this.taskName = rows[0].taskName;
                    this.viewTaskStateVisible = true;
                }
            },
            viewGroupData: function () {
                const rows = this.getSelectRows();
                this.taskCode = rows[0].taskCode;
                this.taskName = rows[0].taskName;
                this.groupviewVisible = true;
            },
            updateData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                else {
                    this.taskCode = rows[0].taskCode;
                    this.jobTaskList = {...rows[0]};
                    this.updateVisible = true;
                }
            },
            dialogOnSubmit(dialog) {
                this.$refs[dialog].onSubmit();
            },
            startTaskStatus: function () {
                const _self = this;
                _self.$confirm("是否开启这个任务", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "success"
                }).then(() => {
                    const rows = this.getSelectRows();
                    if (rows.length !== 1) {
                        this.$error("请选择一行数据");
                        return;
                    }
                    let taskCode = rows[0].taskCode;
                    _self.$http.post(_self.startTaskUrl,
                        {"taskCode": taskCode})
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
                    let taskCode = rows[0].taskCode;
                    _self.$http.post(_self.deleteUrl,
                        {"taskCode": taskCode})
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
        },
    };
</script>