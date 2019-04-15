<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'duebillNo':'借据编号',
                         'contNo':'合同编号',
                         'custNo':'客户编号'
                         },{'custName':'客户名称'}]"
        ></elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看
                </el-button>
                <el-button v-if="$route.meta.btns.approveBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="approveData">审批
                </el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%">
                <risk-class-adjust-view ref="riskClassAdjustView" :classAdjust="classAdjust"></risk-class-adjust-view>
            </el-dialog>
            <el-dialog
                    title="审批"
                    :visible.sync="approveVisible"
                    v-if="approveVisible"
                    width="60%">
                <risk-class-adjust-approve ref="riskClassAdjustApprove" @refreshTable="refreshTable"
                                           @closeDialog="approveVisible = false" @updateDialog="updateDialog"
                                           :form="row"
                ></risk-class-adjust-approve>
            </el-dialog>
            <el-dialog
                    title="审批详情"
                    :visible.sync="approvesVisible"
                    v-if="approvesVisible"
                    width="60%">
                <content-tab ref="riskClassAdjustApprove" @refreshTable="refreshTable"
                             @closeDialog="approvesVisible = false" :rowData="row" flag="todo"
                ></content-tab>
            </el-dialog>
        </el-card>

    </div>
</template>
<script>

    import riskClassAdjustView from './riskClassAdjustView';
    import RiskClassAdjustApprove from "~/views/pls/risk/riskClassAdjust/riskClassAdjustApprove";
    import ContentTab from "./contentTab";

    export default {
        name: 'riskClassAdjustList',
        components: {
            RiskClassAdjustApprove,
            riskClassAdjustView,
            ContentTab
        },
        data() {
            return {
                url: "/loan/riskClassAdjustAction.do?_md=selectForPage",
                columns: [{
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户姓名"
                }, {
                    prop: "duebillNo",
                    label: "借据编号"
                },{
                    prop: "contNo",
                    label: "合同编号"
                }, {
                    prop: "loanAmt",
                    label: "贷款金额",
                    formatter: (row, column, cellValue, index) => {
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "overdueBalance",
                    label: "逾期本金",
                    formatter: (row, column, cellValue, index) => {
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "sts",
                    label: "审批状态",
                    selectKey: 'WF_SP_STATUS',
                }, {
                    prop: "sysLevel",
                    label: "系统认定结果",
                    selectKey: 'STD_ZB_FIVE_SORT',
                }, {
                    prop: "manLevel",
                    label: "人工认定结果",
                    selectKey: 'STD_ZB_FIVE_SORT',
                }, {
                    prop: "finalLevel",
                    label: "最终认定结果",
                    selectKey: 'STD_ZB_FIVE_SORT',
                }],
                initParams: {},
                searchParams: {
                    custNo:'',
                    contNo:'',
                    duebillNo:''
                },
                classAdjust: {},
                // updateVisible: false,
                viewVisible: false,
                approveVisible: false,
                approvesVisible: false,
                row: {},
            }
        },
        mounted: function () {
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
            // updateData: function () {
            //     const rows = this.getSelectRows();
            //     if (rows.length !== 1) {
            //         this.$error("请选择一行数据");
            //         return;
            //     }
            //     this.classAdjust = {...rows[0]};
            //     this.updateVisible = true;
            // },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.classAdjust = {...rows[0]};
                this.viewVisible = true;
            },
            approveData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                if (rows[0].sts === "01") {
                    this.$error("该流程已经发起审批");
                    return;
                }
                if (rows[0].sts === "02") {
                    this.$error("该流程正在审批中");
                    return;
                }
                if (rows[0].sts === "03") {
                    this.$error("该流程已经审批通过");
                    return;
                }
                this.row = {...rows[0]};
                this.approveVisible = true;
            },
            updateDialog(rowData) {
                this.row = rowData;
                this.approveVisible = false;
                this.approvesVisible = true;
            },
        }
    }
    ;
</script>