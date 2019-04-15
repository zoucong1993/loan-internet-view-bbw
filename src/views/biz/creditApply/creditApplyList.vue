<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编号',
                                           'custName':'客户姓名',

                                           },{
                                           'applyNo':'业务编号',
                                           'approveSts':{
                                                'label':'申请状态',
                                                'component':'elx-select',
                                                'selectKey':'APPLY_STS'
                                           }
                                           },
                                           { 'custMgr':'客户经理工号',
                                             'prdCode':{'label':'产品名称',
                                                   'component':'elx-select-tree',
                                                   'url':'/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree'}
                                           }]"
        >
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看
                </el-button>
                <el-button size="mini" type="info" icon="el-icon-view"
                           @click="messageRecord">短信记录
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
                    width="80%">
                <credit-apply-view ref="creditApplyView" :creditApply="creditApply" @closeDialog="viewVisible = false"></credit-apply-view>
            </el-dialog>


            <el-dialog
                    title="短信记录"
                    :visible.sync="messageRecordDialog"
                    v-if="messageRecordDialog"
                    width="80%">
                <message-record-list :creditApply="creditApply"></message-record-list>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>

    import creditApplyView from './creditApplyView';
    import messageRecordList from './messageRecordList'

    export default {
        name: 'creditApplyList',
        components: {
            creditApplyView,
            messageRecordList
        },
        data() {
            return {
                url: "/loan/creditApplyAction.do?_md=selectApplyAndAgree",
                columns: [ {
                    prop: "applyNo",
                    label: "业务编号"
                },{
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "prdName",
                    label: "产品名称"
                }, {
                    prop: "applyTime",
                    label: "申请时间",
                }, {
                    prop: "loanUse",
                    label: "贷款用途",
                    selectKey:"LOAN_USE"
                }, {
                    prop: "agrAmt",
                    label: "批复金额",
                }, {
                    prop: "approveSts",
                    label: "申请状态",
                    selectKey: "APPLY_STS"
                }, {
                    prop: "custMgr",
                    label: "客户经理工号",
                }, {
                    prop: "custMgrName",
                    label: "客户经理",
                }, {
                    prop: "custOrgName",
                    label: "受理机构",
                }],
                initParams: {},
                searchParams: {},
                creditApply: {},
                viewVisible: false,
                messageRecordDialog: false,

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
            },
            messageRecord(){
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.creditApply = {...rows[0]};
                this.messageRecordDialog = true;
            },
        }
    };
</script>