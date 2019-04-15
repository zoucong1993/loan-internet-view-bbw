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
        name: "viewJobStatus",
        props: {
            batchNo:String
        },
        data() {
            return {
                url: "/loan/jobStatusAction.do?_md=findJobStatusByBatchNo",
                initParams: {
                    "batchNo": this.batchNo,
                },
                searchParams: {},
                columns: [
                    {
                        prop: "jobExecutionId",
                        label: "job执行的id"
                    }, {
                        prop: "batchNo",
                        label: "批次号"
                    }, {
                        prop: "groupCode",
                        label: "执行job组的名称"
                    }, {
                        prop: "jobName",
                        label: "job名称"
                    }, {
                        prop: "jobType",
                        label: "job类型",
                        selectKey: "JOBTYPE"
                    }, {
                        prop: "trandate",
                        label: "交易日期"
                    }, {
                        prop: "dataCount",
                        label: "处理数据总数"
                    }, {
                        prop: "startTime",
                        label: "开始时间"
                    }, {
                        prop: "endTime",
                        label: "结束时间"
                    }, {
                        prop: "status",
                        label: "执行状态",
                        selectKey: "BTH_TASK_ZHIXING_STATUS"
                    }, {
                        prop: "clickType",
                        label: "触发类型",
                        selectKey: "CLICK_TYPE"
                    }, {
                        prop: "nodeId",
                        label: "节点编号"
                    }, {
                        prop: "executeTime",
                        label: "执行时间"
                    }]
            }
        },
        methods: {
        }
    };
</script>

<style scoped>

</style>