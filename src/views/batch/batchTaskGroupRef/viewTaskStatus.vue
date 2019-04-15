<template>
    <el-card class="box-card" shadow="never">
        <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="success" icon="el-icon-view" @click="viewGroupData">查看工作组状态
        </el-button>

        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :initParams="initParams"
                   :searchParams="searchParams">
        </elx-table>

        <el-dialog
                :title="'批量号:'+batchNo"
                :visible.sync="viewGroupDataVisible"
                v-if="viewGroupDataVisible"
                append-to-body
                width="60%">
            <view-group-state ref="viewGroupState" :batchNo="batchNo" />
        </el-dialog>

    </el-card>
</template>

<script>

   import  viewGroupState from './viewGroupState'

    export default {
        name: "viewTaskStatus",
        components:{
            viewGroupState
        },
        props: {
            taskCode: String,
            taskName: String
        },
        data() {
            return {
                url: "/loan/batchTaskStatusAction.do?_md=findTaskStatusByTaskCode",
                columns: [
                    {
                        prop: "batchNo",
                        label: "批次号"
                    }, {
                        prop: "taskCode",
                        label: "任务编码"
                    }, {
                        prop: "trandate",
                        label: "交易日期"
                    }, {
                        prop: "clickType",
                        label: "触发类型",
                        selectKey: "CLICK_TYPE"
                    }, {
                        prop: "status",
                        label: "状态",
                        selectKey: "BTH_TASK_ZHIXING_STATUS"
                    }, {
                        prop: "startTime",
                        label: "开始时间"
                    }, {
                        prop: "endTime",
                        label: "结束时间"
                    }

                    ],
                searchParams: {},
                initParams: {
                    "taskCode": this.taskCode,
                },
                batchNo:'',
                viewGroupDataVisible:false
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
            viewGroupData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("亲，请选择一行批次数据");
                    return;
                }
                else {
                    const rows = this.getSelectRows();
                    this.batchNo = rows[0].batchNo;
                    this.viewGroupDataVisible = true;
                }
            }
        }
    };
</script>

<style scoped>

</style>