<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'acctNo':'收款账户账号','acctName':'收款账户名称',
                                       'acctType':{
                                            'label':'收款账户类型',
                                            'component':'elx-select',
                                            'selectKey':'STD_ACTYPE',
                                             }},{'prdCode':{'label':'产品名称',
                                                            'component':'elx-select-tree',
                                                             'url':'/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree',},'sts':{'label':'生效状态',
                                                                                                                                      'component':'elx-select',
                                                                                                                                      'selectKey':'STD_ZB_STATUS'}}]">
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-plus"
                           @click="addVisible = true">新增
                </el-button>
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                           @click="deleteData">删除
                </el-button>
                <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="warning" icon="el-icon-edit"
                           @click="updateData">修改
                </el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看
                </el-button>
                <el-button v-if="$route.meta.btns.approveBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="approveDate">审批
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
                    title="新增"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    :close-on-click-modal="false"
                    width="60%"
                    v-drag>
                <account-add ref="accountAdd" @refreshTable="search" @closeDialog="addVisible = false"></account-add>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('accountAdd')">保存</el-button>
                    <el-button type="danger" @click="addVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    :close-on-click-modal="false"
                    width="60%"
                    v-drag>
                <account-update ref="accountUpdate" @refreshTable="refreshTable" @closeDialog="updateVisible = false"
                                :accountInfo="row"></account-update>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('accountUpdate')">保存</el-button>
                    <el-button type="danger" @click="updateVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    :close-on-click-modal="false"
                    width="60%"
                    v-drag>
                <account-view ref="accountView" @closeDialog="updateVisible = false"
                              :accountInfo="row"></account-view>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="viewVisible = false">返 回</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="审批"
                    :visible.sync="approveVisible"
                    v-if="approveVisible"
                    :close-on-click-modal="false"
                    width="60%"
                    v-drag>
                <content-tab @refreshTable="refreshTable"
                             @closeDialog="approveVisible = false" :rowData="row" flag="todo"
                ></content-tab>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import accountAdd from "~/views/biz/fnc/accountAdd";
    import AccountUpdate from "~/views/biz/fnc/accountUpdate";
    import AccountView from "~/views/biz/fnc/accountView";
    import ContentTab from "./contentTab";

    export default {
        name: "accountList",
        components: {ContentTab, AccountView, AccountUpdate, accountAdd},
        data() {
            return {
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                approveVisible: false,
                row: {},
                url: '/loan/accountAction.do?_md=findAccountList',
                columns: [{
                    prop: "applyNo",
                    label: "业务编号"
                }, {
                    prop: "acctNo",
                    label: "收款账户账号"
                }, {
                    prop: "acctName",
                    label: "收款账户名称"
                }, {
                    prop: "acctType",
                    label: "收款账户类型",
                    selectKey: "STD_ACTYPE",
                }, {
                    prop: "acctPhone",
                    label: "收款账户预留手机号",
                }, {
                    prop: "productName",
                    label: "产品名称"
                }, {
                    prop: "sts",
                    label: "生效状态",
                    selectKey: "STD_ZB_STATUS",
                }, {
                    prop: "approveSts",
                    label: "审批状态",
                    selectKey: "WF_SP_STATUS",
                }],
                initParams: {},
                searchParams: {
                    acctNo: '',
                    acctName: '',
                    acctType: '',
                },
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
            dialogOnSubmit(dialog) {
                this.$refs[dialog].onSubmit();
            },
            deleteData() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                this.$http.post("/loan/accountAction.do?_md=deleteAccount",
                    {"id": id}).then(function (response) {
                    if (response.success) {
                        _this.$success(response.msg);
                        _this.$refs.table.refresh();
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            updateData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = rows[0];
                this.updateVisible = true;
            },
            viewData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = rows[0];
                this.viewVisible = true;
            },
            approveDate() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                if (rows[0].approveSts === "02") {
                    this.$error("该流程正在审批中");
                    return;
                }
                if (rows[0].approveSts === "03") {
                    this.$error("该流程已经审批通过");
                    return;
                }
                this.row = rows[0];
                const _this = this;
                this.$http.post("/loan/activityAction.do?_md=publisActiviti", {
                        processDefinitionKey: "account_manager",
                    businessKey: rows[0].applyNo,
                        busiInfo: "账号管理审批",
                        assignee: this.$sessionStorage.getLoginUser().user.userName,
                        custNo: this.$sessionStorage.getLoginUser().user.userName,
                        custName: this.$sessionStorage.getLoginUser().user.empName,
                    }
                ).then(response => {
                    if (response.success) {
                        _this.$success(response.msg);
                        _this.refreshTable();
                        _this.row = response.data;
                        _this.approveVisible = true;
                    }
                }).catch((error) => {
                    _this.$error(error.message);
                });
            }
        }
    }
</script>
