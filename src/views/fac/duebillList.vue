<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'duebillNo':'借据编号',
                         'contNo':'合同编号',
                         'custNo':'客户编号'
                         },
                         {
                         'custName':'客户名称',
                         }]"
        ></elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 10px 0">
                <el-button size="mini" type="primary" icon="el-icon-view" @click="viewItem">查看</el-button>
                <el-button size="mini" type="success" icon="el-icon-tickets" @click="viewRepayStream">借据还款流水</el-button>
                <el-button size="mini" type="danger" icon="el-icon-plus" @click="repaymentPlanView">还款计划查询</el-button>
                <el-button size="mini" type="danger" icon="el-icon-plus" @click="custAccountList">账户信息</el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <el-dialog
                    title="查看借据详情"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="70%">
                <duebill-view ref="duebillViewForm" :row="row"></duebill-view>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="viewVisible = false">返 回</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="查看借据还款流水"
                    :visible.sync="repayStreamVisible"
                    v-if="repayStreamVisible"
                    width="90%">
                <repay-list ref="repayListForm" :duebillNo="duebillNo"></repay-list>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="repayStreamVisible = false">返 回</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="还款计划查询"
                    :visible.sync="repaymentPlanVisible"
                    v-if="repaymentPlanVisible"
                    width="60%">
                <repayment-plan-list ref="repaymentPlanList" :duebillNo="duebillNo"></repayment-plan-list>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="repaymentPlanVisible = false">返 回</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="账户信息"
                    :visible.sync="custAccountDialog"
                    v-if="custAccountDialog"
                    width="60%">
                <biz-cust-account-list :row="row"></biz-cust-account-list>
            </el-dialog>

        </el-card>
    </div>
</template>
<script>
    import duebillView from './duebillView';
    import repayList from '@/views/pls/repay/repayList';
    import repaymentPlanList from '@/views/pls/repay/repaymentPlanList'
    import bizCustAccountList from './bizCustAccountList.vue'

    export default {
        name: "duebillList",
        components: {
            "duebill-view": duebillView,
            repayList,
            repaymentPlanList,
            bizCustAccountList
        },
        data() {
            return {
                url: "/loan/loanDuebillAction.do?_md=selectBySelectiveLoanDuebillList",
                row: {},
                viewVisible: false,
                repayStreamVisible: false,
                repaymentPlanVisible: false,
                custAccountDialog: false,
                duebillNo: "",
                loanAcctNo: "",
                columns: [{
                    prop: "duebillNo",
                    label: "借据编号",
                }, {
                    prop: "contNo",
                    label: "合同编号"
                }, {
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "productName",
                    label: "产品名称"
                }, {
                    prop: "term",
                    label: "期限"
                }, {
                    prop: "termType",
                    label: "期限单位",
                    selectKey: "TERM_UNIT"
                }, {
                    prop: "loanAmt",
                    label: "放款金额(元)",
                    formatter: (row, column, cellValue, index) => {
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "payoutDate",
                    label: "放款时间"
                }],
                searchParams: {
                    duebillNo: '',
                    contNo: '',
                    payoutNo: '',
                    custNo: '',
                    custName: ''
                },
                initParams: {},
            };
        },
        methods: {
            custAccountList(){
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length === 0) {
                    this.$warning("请选择一行！")
                    return;
                }
                this.row = {...rows[0]}
                this.custAccountDialog = true
            },
            searchItem: function () {
                this.$refs.table.search();
            },
            viewItem: function () {
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$warning("请选择一行！")
                } else {
                    this.row = {...rows[0]};
                    this.viewVisible = true;
                }
            },
            viewRepayStream() {
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$warning("请选择一行！")
                } else {
                    this.duebillNo = rows[0].duebillNo;
                    this.repayStreamVisible = true;
                }
            },
            repaymentPlanView() {
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$warning("请选择一行！")
                } else {
                    this.duebillNo = rows[0].duebillNo;
                    this.repaymentPlanVisible = true;
                }
            },
            refresh: function () {
                this.$refs.table.refresh();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeDialog: function () {
                this.viewVisible = false;
            }
        }
    };
</script>