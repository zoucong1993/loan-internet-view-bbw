<template>
    <el-card class="box-card" shadow="never">
        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :checkbox=true
                   :initParams="initParams"
                   :searchParams="searchParams" >
        </elx-table>
        <div align="center" style="margin-top: 10px;">
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-card>
</template>
<script>
    export default {
        name: "custJobInfoList",
        components: {},
        data() {
            return {
                url: "/loan/jobDetailAction.do?_md=findJobDetaiList",
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
                searchParams: {},
                initParams: {}
            };
        },
        methods: {
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
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
            }
        }
    };
</script>