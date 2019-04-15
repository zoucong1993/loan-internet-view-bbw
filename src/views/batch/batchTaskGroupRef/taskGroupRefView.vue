<!--工作组的显示，yangzhu-->
<template>
    <el-card class="box-card" shadow="never">
        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :initParams="initParams"
                   :searchParams="searchParams">
        </elx-table>
    </el-card>
</template>
<script>
    export default {
        name: 'taskGroupRefView',
        components: {},
        props: {
            taskCode: String,
            taskName: String
        },
        data() {
            return {
                url: "/loan/taskGroupRefAction.do?_md=selectGroupRef",
                groupviewVisible: false,
                columns: [
                    {
                        prop: "groupCode",
                        label: "执行组编码"
                    }, {
                        prop: "groupName",
                        label: "执行组名称"
                    }, {
                        prop: "parentGroupCode",
                        label: "前置执行组"
                    }, {
                        prop: "groupLev",
                        label: "执行顺序"
                    }],
                initParams: {
                    "taskCode": this.taskCode,
                },
                searchParams: {},
                groupCode: '',
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
            }
        }
    };
</script>