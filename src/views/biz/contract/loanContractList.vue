<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'contNo':'合同编号','custNo':'客户编号','applyNo':'业务编号'},
                         {  'contSts':{'label':'合同状态', 'component':'elx-select','selectKey':'STD_ZB_CTRLOANCONT_TYPE'},
                         'duebillNo':'借据编号','custName':'客户名称'}]">
        </elx-search-card>
        <!--<el-card class="box-card" shadow="never"> -->
        <!--<el-form ref="searchForm" :model="searchParams" label-width="100px">-->
        <!--<el-row type="flex" class="row-bg" justify="start">-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-form-item label="合同编号" prop="contNo">-->
        <!--<el-input type="text" v-model="searchParams.contNo" placeholder="请输入合同编号" size="small"></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-form-item label="客户编号" prop="custNo">-->
        <!--<el-input type="text" v-model="searchParams.custNo" placeholder="请输入客户号" size="small" ></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-form-item label="业务编号" prop="applyNo">-->
        <!--<el-input type="text" v-model="searchParams.applyNo" size="small" placeholder="请输入业务编号" ></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" class="row-bg" justify="start">-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-form-item label="业务类型" prop="bizType">-->
        <!--<elx-select type="text" v-model="searchParams.bizType" placeholder="请选择一种交易类型" size="small" selectKey="STD_ZB_BIZ_TYPE"></elx-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-form-item label="合同状态" prop="contSts">-->
        <!--<elx-select type="text" v-model="searchParams.contSts" placeholder="请选择合同状态" size="small" selectKey="STD_ZB_CTRLOANCONT_TYPE"></elx-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-form-item label="借据编号" prop="duebillNo">-->
        <!--<el-input type="text" v-model="searchParams.duebillNo" placeholder="请输入借据编号" size="small"></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-button type="primary" icon="el-icon-search" @click.native="searchItem">查询</el-button>-->
        <!--<el-button type="info" icon="el-icon-loan-reset" @click="resetForm('searchForm')">重置</el-button>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--</el-form>-->
        <!--</el-card>-->
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 3px 0;padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewItem">查看
                </el-button>
             <!--   <el-button size="mini" type="danger" icon="el-icon-edit" @click="orgChange">机构转换</el-button>-->
            </el-row>


            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :checkbox=false
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <el-dialog
                    title="查看详情"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="70%"
                    v-drag>
                <loanContract-view ref="loanContractViewForm" :row="row"></loanContract-view>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="viewVisible = false">返 回</el-button>
                </div>
            </el-dialog>

            <el-dialog
                    title="机构转换"
                    :visible.sync="orgVisible"
                    v-if="orgVisible"
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="30%"
                    v-drag>

                <loan-contract-org-change ref="loanContractOrgChange" @refreshTable="refresh"
                                          @closeDialog="orgVisible = false" :row="rows"></loan-contract-org-change>

            </el-dialog>

        </el-card>
    </div>
</template>
<script>
    import loanContractView from './loanContractView';
    import loanContractOrgChange from "./loanContractOrgChange";

    export default {
        name: "loanContractList",
        components: {
            loanContractOrgChange,
            "loanContract-view": loanContractView
        },
        data() {
            return {
                url: "/loan/loanContractAction.do?_md=findLoanContractList",
                row: {},
                rows: [],
                viewVisible: false,
                orgVisible: false,
                columns: [{
                    prop: "contNo",
                    label: "合同编号"
                }, {
                    prop: "productName",
                    label: "产品名称"
                },{
                    prop: "bizType",
                    label: "业务类型",
                    selectKey: 'STD_FSLX'
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "duebillNo",
                    label: "借据编号",
                }, {
                    prop: "contAmt",
                    label: "合同金额(元)",
                    formatter: (row, column, cellValue, index) => {
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "term",
                    label: "合同期限"
                }, {
                    prop: "termType",
                    label: "合同期限类型",
                    selectKey: "TERM_UNIT",
                }, {
                    prop: "contSts",
                    label: "合同状态",
                    selectKey: "STD_ZB_CTRLOANCONT_TYPE",
                }, {
                    prop: "custOrgName",
                    label: "受理机构"
                },{
                    prop: "custMgrName",
                    label: "客户经理"
                }],
                searchParams: {},
                initParams: {},
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

            orgChange: function () {
                const _this = this;
                let rows = _this.$refs.table.getSelectedRows();
                if (rows.length === 0) {
                    _this.$warning("请至少选择一行！")
                } else {
                    _this.rows = rows;
                    _this.orgVisible = true;
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