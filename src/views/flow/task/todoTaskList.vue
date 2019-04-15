<template>
    <div>
        <el-dialog :visible.sync="handleVisible" v-if="handleVisible" :append-to-body="true" width="80%" class="el_dialog_content">
            <component :is="contentTab" @refreshTable="refresh" @closeDialog="handleVisible = false" :rowData="rowData" flag="todo" />
        </el-dialog>
        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :initParams="initParams"
                   :searchParams="searchParams"
                   :selection="false"
                   :pageSize="pageSize"
                   :height="height"
                   @row-click="handleTodoTask">
        </elx-table>
    </div>
</template>
<script>
    export default {
        name: "todoTaskList",
        components: {},
        props: {
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
                url: "/flow/taskAction/getTodoTaskList",
                columns: [
                    {
                        prop: "busiInfo",
                        label: "流程概要",
                        showOverflowTooltip: true
                    },
                    {
                        prop: "businessKey",
                        label: "业务主键",
                        showOverflowTooltip: true
                    },
                    {
                        prop: "createTime",
                        label: "创建时间",
                        showOverflowTooltip: true
                    }
                ],
                rowData: {},
                assignee: null,
                initParams: {},
                searchParams: {},
                handleVisible: false,
                contentTab: ""
            };
        },
        created: function() {
            this.assignee = this.$sessionStorage.getLoginUser().user.userName;
            this.initParams = { assignee: this.assignee };
        },
        methods: {
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            search() {
                this.$refs.table.search();
            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            refresh() {
                this.$refs.table.refresh();
                this.$emit("refresh");
            },
            handleTodoTask(row, event, column) {
                this.rowData = { ...row };
                const _this = this;
                this.$http
                    .post("/loan/activityAction.do?_md=getTabUrl", {
                        procDefId: _this.rowData.procDefId
                    })
                    .then(function(response) {
                        if (response.success) {
                            //动态加载表单
                            _this.contentTab = function render(h, cxt) {
                                return h(_this.$_require_(response.data));
                            };
                            _this.handleVisible = true;
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch(function(error) {
                        _this.$error(error);
                    });
            }
        }
    };
</script>
