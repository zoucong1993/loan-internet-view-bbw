<template>
    <div>

        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :initParams="initParams"
                   :selection="false"
                   :height="height"
                   :pageSize="pageSize"
                   @row-click="handleDoneTask"
        >
        </elx-table>
        <el-dialog
                :visible.sync="doneVisable"
                v-if="doneVisable"
                :append-to-body = "true"
                width="60%"
                class="el_dialog_content">
            <component :is="contentTab" @refreshTable="refresh" @closeDialog="doneVisable = false" :rowData="rowData" :flag="'done'"></component>
        </el-dialog>

    </div>
</template>
<script>
    import doneFrom from "./doneForm"
    export default {
        name: 'doneTaskList',
        components: {doneFrom},
        props: {
            procInstId: String,
            todo: String,
            border: Boolean,
            height: {
                type: Number,
                default: 395,
            },
            pageSize: {
                type: Number,
                default: 10,
            }
        },
        data() {
            return {
                url: "/loan/activityAction.do?_md=getDoneTaskList",
                columns: [{
                        prop: "busiInfo",
                        label: "流程概要",
                        showOverflowTooltip:true
                    },{

                        prop: "businessKey",
                        label: "业务主键",

                        prop: "name",
                        label: "审批岗位",
                        showOverflowTooltip:true
                    }, {
                        prop: "assignee",
                        label: "审批人",
                        showOverflowTooltip:true
                    }, {
                        prop: "opinion",
                        label: "审批结果",
                        selectKey:'STD_FLW_OPINION',
                        showOverflowTooltip:true
                    }, {
                        prop: "remark",
                        label: "意见",

                        showOverflowTooltip:true
                    }, {
                        prop: "startTimeStr",
                        label: "开始时间",
                        showOverflowTooltip:true
                    }, {
                        prop: "endTimeStr",
                        label: "结束时间",
                        showOverflowTooltip:true
                    }],
                initParams: {},
                assignee: null,
                doneVisable: false,
                rowData: {},
                contentTab: "contentTab",
            }
        },
        mounted: function () {
        },
        created: function () {
            if(this.todo === 'todoForm') {
                this.columns = [{
                    prop: "name",
                    label: "审批岗位",
                    showOverflowTooltip:true
                }, {
                    prop: "assignee",
                    label: "审批人",
                    showOverflowTooltip:true
                }, {
                    prop: "assigneeName",
                    label: "员工姓名",
                    showOverflowTooltip:true
                }, {
                    prop: "opinion",
                    label: "审批结果",
                    showOverflowTooltip:true
                }, {
                    prop: "remark",
                    label: "意见",
                    showOverflowTooltip:true
                }, {
                    prop: "startTimeStr",
                    label: "开始时间",
                    showOverflowTooltip:true
                }, {
                    prop: "endTimeStr",
                    label: "结束时间",
                    showOverflowTooltip:true
                }]
            };
            this.assignee = this.$sessionStorage.getLoginUser().user.userName;
            if(this.procInstId) {
                this.initParams = {"procInstId": this.procInstId};
            } else {
                this.initParams = {"assignee": this.assignee};
            }
        },
        methods: {
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            search(){
                this.$refs.table.search();
            },
            refresh(){
                this.$refs.table.refresh();
                this.$emit("refresh");
            },
            handleDoneTask(row, event, column) {
                this.rowData = {...row};
                const _this = this;
                this.$http.post("/loan/activityAction.do?_md=getTabUrl", {
                    procDefId: _this.rowData.procDefId
                }).then(function (response) {
                    if (response.success) {

                        //动态加载表单
                        _this.contentTab = function render(h, cxt) {
                            return h(_this.$_require_(response.data))
                        }
                        _this.doneVisable = true;

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

<style scoped>
    .box-card{
        border: none;
    }
</style>
