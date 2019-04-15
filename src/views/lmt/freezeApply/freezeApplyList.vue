<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编码',
                                           'custName':'客户名称',
                                           'applyNo':'申请编号'
                                           },{
                                            'approveSts':{
                                                'label':'审批状态',
                                                'component':'elx-select',
                                                'selectKey':'WF_SP_STATUS'
                                            }
                                           }]"
        >
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="success" icon="el-icon-plus" @click="freezeVisible=true">冻结</el-button>
                <el-button size="mini" type="success" icon="el-icon-plus" @click="chooseToUnFreeze">解冻</el-button>
                <el-button size="mini" type="primary" icon="el-icon-view" @click="viewData">查看</el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <el-dialog
                    title="冻结信息选择"
                    :visible.sync="freezeVisible"
                    v-if="freezeVisible"
                    width="70%"
                    :close-on-click-modal="false"
                    v-drag>
                <credit-agree-list ref="creditAgreeList"
                                  @closeDialog="freezeVisible = false"
                                  flag="freeze"></credit-agree-list>
                <div align="center" style="margin-top: 15px">
                    <el-button type="primary" @click="chooseToFreeze()">冻结</el-button>
                    <el-button type="danger" @click="freezeVisible=false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%" :close-on-click-modal="false" v-drag>
                <freeze-apply-view
                        @closeDialog="viewVisible = false"
                        :data="row"></freeze-apply-view>
            </el-dialog>

            <el-dialog
                    title="解冻申请"
                    :visible.sync="unfreezeApproveVisible"
                    v-if="unfreezeApproveVisible"
                    width="60%" :close-on-click-modal="false"
                    v-drag>
                <content-tab ref="contentTab" @refreshTable="refreshTable" @closeDialog="unfreezeApproveVisible = false"
                             :rowData="rowData" flag="todo"></content-tab>

            </el-dialog>
        </el-card>

    </div>
</template>
<script>

    import freezeApplyView from './freezeApplyView';
    import creditAgreeList from '../creditAgree/creditAgreeList'
    import contentTab from "./contentTab";

    export default {
        name: 'freezeApplyList',
        components: {
            contentTab,
            freezeApplyView,
            creditAgreeList,
//            freezeApplyList
        },
        props: {
            flag: String
        },
        data() {
            return {
                url: "/loan/freezeApplyAction.do?_md=selectForPage",
                columns: [{
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户姓名"
                }, {
                    prop: "applyNo",
                    label: "申请编号"
                }, {
                    prop: "agrNo",
                    label: "协议编号"
                }, {
                    prop: "ccy",
                    label: "授信币种",
                    selectKey: "STD_ZX_CUR_TYPE"
                }, {
                    prop: "agrAmt",
                    label: "授信金额(元)",
                    formatter: (row, column, cellValue, index) => {
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "bizType",
                    label: "类型",
                    selectKey: "STD_DJJD"
                }, {
                    prop: "bizReason",
                    label: "原因"
                }, {
                    prop: "approveSts",
                    label: "申请状态",
                    selectKey: "WF_SP_STATUS"
                }],
                initParams: {},
                searchParams: {},
                viewVisible: false,
                freezeVisible: false,
                unfreezeApproveVisible: false,
                row: {},
                freezeApply: {},
                rowData: {},

            }
        },
        mounted: function () {
        },
        methods: {
            freezeApproveData: function () {
                const _this = this;
                //获取需要冻结的数据
                const rows = this.$refs.creditAgreeList.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.$http.post("/loan/freezeApplyAction.do?_md=initApprove", {
                    processDefinitionKey: "xd-freeze-list",
                    businessKey: rows[0].applyNo,
                    title: "额度冻结",
                    assignee: this.$sessionStorage.getLoginUser().user.userName
                })
                    .then((response) => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog');
                            _this.rowData = response.data;
                            _this.approveVisible = true;
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch((error) => {
                        _this.$error(error.message);
                    });

            },
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
            chooseToFreeze() {
                const _this = this;
                //获取需要冻结的数据
                const rows = this.$refs.creditAgreeList.getSelectRows();
                //判断非空
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                //准备冻结数据
                this.freezeApply.applyNo = rows[0].applyNo;
                this.freezeApply.custNo = rows[0].custNo;
                this.freezeApply.custName = rows[0].custName;
                this.freezeApply.agrNo = rows[0].agrNo;
                this.freezeApply.ccy = rows[0].ccy;
                this.freezeApply.agrAmt = rows[0].agrAmt;
                this.freezeApply.bizType = '01';
                this.freezeApply.approveSts = '01';
                this.freezeApply.createUser = this.$sessionStorage.getLoginUser().user.userName;
                this.freezeApply.createOrg = this.$sessionStorage.getLoginUser().user.orgId;
                this.freezeApply.freezeFlag = '1';


                //发送请求冻结数据，保存到冻结表
                this.$http.post("/loan/freezeApplyAction.do?_md=freezeApply", _this.freezeApply)
                    .then((response) => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.freezeVisible = false;
                            _this.freezeApproveData();
                            _this.refreshTable();
                        }
                    })
                    .catch((error) => {
                        _this.$error(error.message);
                    });

            },
            chooseToUnFreeze() {
                const _this = this;
                //获取需要解冻的数据
                const rows = this.getSelectRows();
                //判断非空
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                if (rows[0].approveSts !== '03') {
                    this.$error("此状态不能解冻！")
                    return;
                }
                if (rows[0].bizType === '02') {
                    this.$error("该额度已经是解冻状态，不能重复解冻");
                    return;
                }
                this.$http.post("/loan/freezeApplyAction.do?_md=unfreezeInitApprove", {
                    processDefinitionKey: "xd-unfreeze-list",
                    businessKey: rows[0].id,
                    busiInfo: "额度解冻",
                    assignee: this.$sessionStorage.getLoginUser().user.userName
                })
                    .then((response) => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog');
                            _this.rowData = response.data;
                            this.unfreezeApproveVisible = true;
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch((error) => {
                        _this.$error(error.message);
                    });

            },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = {...rows[0]};
                this.viewVisible = true;
            },
            unFreezeData: function () {

            }
        }
    }
    ;
</script>