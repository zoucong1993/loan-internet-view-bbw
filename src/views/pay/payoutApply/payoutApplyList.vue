<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'custName':'客户名称','custNo':'客户编号',},
                                        {'prdCode':{'label':'产品名称',
                                                   'component':'elx-select-tree',
                                                   'url':'/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree'},
                                                   'transDate':{'label':'交易日期',
                                                                                 'component':'el-date-picker',
                                                                                 'value-format':'yyyy-MM-dd'}}]">
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-col>
                    <el-button size="mini" type="primary" icon="el-icon-view" @click="viewBtn">查看</el-button>
                </el-col>
            </el-row>
            <elx-table ref="table"
                       :url="selectPayoutApplyListUrl"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
                       :checkbox="false"
            >
            </elx-table>
        </el-card>

        <el-dialog title="放款出账查看"
                   :visible.sync="viewPayoutApplyVisible"
                   v-if="viewPayoutApplyVisible"
                   width="60%">
            <payout-apply-view @refreshTable="refreshTable"
                               @closeDialog="viewPayoutApplyVisible = false"
                               :viewPayoutApplyUrl="viewPayoutApplyUrl"
                               :row="row">
            </payout-apply-view>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button type="primary" @click="viewPayoutApplyVisible = false">返 回</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import payoutApplyView from './payoutApplyView.vue';

    export default {
        name: 'payoutApplyList',
        components: {
            payoutApplyView,
        },
        data() {
            return {
                searchForm: {},
                selectPayoutApplyListUrl: "/loan/payoutApplyAction.do?_md=selectLcAndPaByContNo",
                viewPayoutApplyUrl: "/loan/payoutApplyAction.do?_md=selectPayoutApplyByPrimaryKey",
                catalog: {},
                viewPayoutApplyVisible: false,
                columns: [{
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "contNo",
                    label: "合同编号"
                }, {
                    prop: "prdName",
                    label: "产品名称"
                }, {
                    prop: "payAmt",
                    label: "出账金额(元)",
                    formatter: (row, column, cellValue, index) => {
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "ccy",
                    label: "币种",
                    selectKey: 'STD_CCY_TYPE'
                }, {
                    prop: "term",
                    label: "期限"
                }, {
                    prop: "termType",
                    label: "期限类型",
                    selectKey: "CREDIT_TERM_UNIT"
                }, {
                    prop: "actualRate",
                    label: "执行利率"
                }, {
                    prop: "rateType",
                    label: "利率类型",
                    selectKey: "STD_RATE_FLAG"
                },  {
                    prop: "sts",
                    label: "状态",
                    selectKey: "STD_FKZT"
                },{
                    prop: "custMgrName",
                    label: "客户经理",
                }, {
                    prop: "name",
                    label: "受理机构",
                }, {
                    prop: "transDate",
                    label: "交易日期",
                }],
                searchParams: {
                    custName: '',
                    custNo: '',
                    prdCode: ''
                },
                initParams: {},
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
            viewBtn(data, node, store) {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.row = {...rows[0]};
                    _this.viewPayoutApplyVisible = true;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            refreshLeftTree() {
                this.$refs.leftTree.initTreeData();
            },
            refreshTable() {
                this.$refs.table.refresh();
            }
        }
    };
</script>