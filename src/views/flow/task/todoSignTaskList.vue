<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-dialog
                    :visible.sync="handleVisible"
                    v-if="handleVisible"
                    :append-to-body = "true"
                    width="80%"
                    class="el_dialog_content">
                <component :is="contentTab" @refreshTable="refresh" @closeDialog="handleVisible = false" :rowData="taskData" :flag="'todo'" />
            </el-dialog>
        </el-card>
        <el-card class="box-card" shadow="never">
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
                       :selection="false"
                       @row-click="handleTodoTask"
            >
            </elx-table>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'todoSignTaskList',
        components: {},
        props: {
        },
        data() {
            return {
                url: "/flow/taskAction/getTodoSignTaskList",
                columns: [{
                    prop: "busiInfo",
                    label: "流程概要"
                },{
                    prop: "businessKey",
                    label: "业务主键"
                }, {
                    prop: "custName",
                    label: "客户姓名",
                }, {
                    prop: "custNo",
                    label: "客户号",
                }, {
                    prop: "createTime",
                    label: "创建时间"
                }],
                rowData: {},
                assignee: null,
                initParams: {},
                searchParams: {},
                handleVisible: false,
                contentTab: "",
                roleCodes: [],
                handleVisible: false,
                taskData: {},
                contentTab: "",
            }
        },
        created: function () {
            let roles = this.$sessionStorage.getLoginUser().roles;
            if(roles) {
                roles.forEach(item => {
                    this.roleCodes.push(item.roleCode);
                });
            }
            this.initParams = {"roleCodes": this.roleCodes};
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
                this.$emit('refresh');
            },
            handleTodoTask(row, event, column) {
                const _this = this;
                this.$confirm('是否签收此任务', '提示', {type: 'success'})
                    .then(() => {
                        _this.$http.post("/flow/interface/signTask", {
                            "taskId": row.id, "assignee": _this.$sessionStorage.getLoginUser().userName
                        }).then(
                            response => {
                                if(response.success) {
                                    _this.$success(response.msg);
                                    _this.refresh();
                                    _this.swithContentTab(response.data);
                                } else {
                                    _this.$error(response.msg);
                                }
                            }).catch(
                                error => {
                                    _this.$error(error);
                                })
                    })
            },
            swithContentTab(taskData) {
                this.handleVisible = true;
                this.taskData = taskData;
                const _this = this;
                this.$http.post("/loan/activityAction.do?_md=getTabUrl", {
                    procDefId: _this.rowData.procDefId
                }).then(function (response) {
                    if (response.success) {
                        //动态加载表单
                        _this.contentTab = function render(h, cxt) {
                            return h(require('@/views'+response.data))
                        }
                    } else {
                        _this.$error(response.msg)
                    }
                }).catch(function (error) {
                    _this.$error(error);
                });
            },
        }
    };
</script>
