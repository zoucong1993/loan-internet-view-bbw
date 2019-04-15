<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编号',
                                           'custName':'客户姓名',
                                           'applyNo':'申请编号',
                                           },{
                                           'prdCode':{
                                               'label':'产品名称',
                                               'component':'elx-select-tree',
                                               'url':'/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree'
                                           },
                                           'approveSts':{
                                                'label':'申请状态',
                                                'component':'elx-select',
                                                'selectKey':'WF_SP_STATUS'
                                           }
                                           }]"
        >
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看
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
                <credit-apply-view ref="creditApplyView" :creditApply="creditApply" @closeDialog="viewVisible = false"></credit-apply-view>
            </el-dialog>
        </el-card>

    </div>
</template>
<script>

    import creditApplyView from './creditApplyView';

    export default {
        name: 'creditApplyList',
        components: {
            creditApplyView
        },
        data() {
            return {
                url: "/loan/creditApplyAction.do?_md=selectForPage",
                columns: [ {
                    prop: "applyNo",
                    label: "申请编号"
                },{
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户姓名"
                }, {
                    prop: "productName",
                    label: "产品名称"
                }, {
                    prop: "applyAmt",
                    label: "申请金额(元)",
                    formatter: (row, column, cellValue, index) => {
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "applyTerm",
                    label: "申请期限(月)"
                }, {
                    prop: "custMgrName",
                    label: "管户经理"
                }, {
                    prop: "approveSts",
                    label: "申请状态",
                    selectKey: "WF_SP_STATUS"
                }],
                initParams: {},
                searchParams: {},
                creditApply: {},
                viewVisible: false
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
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.creditApply = {...rows[0]};
                this.viewVisible = true;
            }
        }
    };
</script>