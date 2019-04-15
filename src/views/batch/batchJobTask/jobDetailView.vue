<!--JOB具体的显示信息 -->
<template>
    <div>
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
        name: 'jobNameView',
        props: {
            groupCode: String
        },
        data() {
            return {
                url: "/loan/jobGroupAction.do?_md=selectJob",
                columns: [
                    {
                        prop: "jobName",
                        label: "job名字"
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
                        label: "job描述信息"
                    }],
                initParams: {
                    "groupCode": this.groupCode,
                },
                searchParams: {},
            }
        },
    };
</script>