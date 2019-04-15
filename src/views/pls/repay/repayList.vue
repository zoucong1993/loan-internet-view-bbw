<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'contNo':'合同编号','custNo':'客户号','applyNo':'业务编号'},{

                                             'contSts':{'label':'合同状态',
                                                            'component':'elx-select',
                                                             'selectKey':'STD_ZB_CTRLOANCONT_TYPE',},'duebillNo':'借据编号'}]">
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewItem">查看
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
                    title="查看流水详情"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    append-to-body
                    width="60%">
                <repay-view ref="repayViewForm" :row="row"></repay-view>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="viewVisible = false">返 回</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import repayView from './repayView';

    export default {
        name: "loanContractList",
        components: {
            "repay-view": repayView
        },
        props: {
            duebillNo: String
        },
        data() {
            return {
                url: "/loan/repayAction.do?_md=findRepayList",
                row: {},
                viewVisible: false,
                columns: [{
                    prop: "duebillNo",
                    label: "借据编号",
                }, {
                    prop: "contNo",
                    label: "合同编号"
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "productName",
                    label: "产品名称"
                }, {
                    prop: "repayType",
                    label: "还款类型",
                    selectKey: 'STD_HKJYLX'
                }, {
                    prop: "repayAmt",
                    label: "还款金额(元)"
                }, {
                    prop: "sts",
                    label: "还款状态",
                    selectKey: 'STD_HKZT'
                }, {
                    prop: "transTime",
                    label: "交易日期"
                },],
                searchParams: {},
                initParams: {
                    duebillNo: this.duebillNo
                },
            };
        },
        methods: {
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
            closeDialog: function () {
                this.viewVisible = false;
            }
        }
    };
</script>