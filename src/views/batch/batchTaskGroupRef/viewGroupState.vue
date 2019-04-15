<template>
    <el-card class="box-card" shadow="never">
        <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="success" icon="el-icon-view" @click="viewJobData">查看job状态
        </el-button>
        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :initParams="initParams"
                   :searchParams="searchParams">
        </elx-table>
        <el-dialog
                :title="'批量号:'+batchNo"
                :visible.sync="viewJobDataVisible"
                v-if="viewJobDataVisible"
                append-to-body
                width="90%">
            <view-job-status ref="viewJobStatus" :batchNo="this.batchNo" />
        </el-dialog>
    </el-card>
</template>

<script>

    import  viewJobStatus from './viewJobStatus'

    export default {
        name: "viewGroupStatus",
        components:{
            viewJobStatus
        },
        props: {
            batchNo:String
        },
        data() {
            return {
                url: "/loan/batchTaskGroupStatusAction.do?_md=findTaskGroupStatusByBatchNo",
                columns: [
                    {
                        prop: "batchNo",
                        label: "批次号"
                    }, {
                        prop: "taskCode",
                        label: "任务编码"
                    }, {
                        prop: "GROUP_LEV",
                        label: "当前组所在的层级"
                    }, {
                        prop: "startTime",
                        label: "开始时间"
                    }, {
                        prop: "endTime",
                        label: "结束时间"
                    }, {
                        prop: "STATUS",
                        label: "退出状态",
                        selectKey: "BTH_TASK_ZHIXING_STATUS"

                    }, {
                        prop: "executeTime",
                        label: "执行时间：毫秒"
                    }

                ],
                searchParams: {},
                initParams: {
                    "batchNo": this.batchNo,
                },
                // batchNo:'',
                viewJobDataVisible:false
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
            viewJobData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("亲，请选择一行批次数据");
                    return;
                }
                else {
                    const rows = this.getSelectRows();
                   // this.batchNo = rows[0].batchNo;
                    this.viewJobDataVisible = true;
                }


            }
        }
    };
</script>

<style scoped>

</style>