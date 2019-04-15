<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="primary" icon="el-icon-view" @click="download">文件下载</el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
                </elx-table>
            <!--<el-dialog
                    title="新增"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    append-to-body
                    width="60%">
                <channel-prd-rel-add
                        @refreshTable="refreshTable"
                        @closeDialog="addVisible = false"
                        :chanCode="chanCode" :chanName="chanName"></channel-prd-rel-add>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    append-to-body
                    width="60%">
                <channel-prd-rel-update
                        :channelPrdRel="channelPrdRel"
                        @refreshTable="refreshTable"
                        @closeDialog="updateVisible = false"></channel-prd-rel-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    append-to-body
                    width="60%">
                <channel-prd-rel-view
                        :channelPrdRel="channelPrdRel" @closeDialog="viewVisible = false"
                ></channel-prd-rel-view>
            </el-dialog>-->
        </el-card>
    </div>
</template>
<script>

  /*  import channelPrdRelAdd from './channelPrdRelAdd.vue';
    import channelPrdRelUpdate from './channelPrdRelUpdate.vue';
    import channelPrdRelView from './channelPrdRelView.vue';*/

    export default {
        name: 'loanDetailedList',
        props: {

        },
        components: {

        },
        data() {
            return {
                url: "/loan/loanDuebillAction.do?_md=selectBySelectiveLoanDuebillList",
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                list:[],
                columns: [{
                    prop: "custName",
                    label: "借款人"
                }, {
                    prop: "loanAmt",
                    label: "放款金额(元)"
                }, {
                    prop: "loanBalance",
                    label: "贷款余额(元)"
                }, {
                    prop: "prdCode",
                    label: "产品种类"
                },{
                    prop: "payoutDate",
                    label: "放款日"
                }, {
                    prop: "endDate",
                    label: "到期日"
                }, {
                    prop: "actualRate",
                    label: "利率"
                }, {
                    prop: "repayMode",
                    label: "还款方式",
                    selectKey: "STD_REPAY_METHOD"
                }, {
                    prop: "grtType",
                    label: "担保方式",
                    selectKey: "STD_ZB_ASSURE_MEANS"
                }, {
                    prop: "bizSts",
                    label: "贷款形态",
                    selectKey: "STD_DKXT"
                }, {
                    prop: "overdueBalance",
                    label: "部分逾期金额(元)"
                }, {
                    prop: "riskClassify",
                    label: "五级分类",
                    selectKey: "STD_FIVE_CLASS"
                }, {
                    prop: "",
                    label: "是否欠息"
                }, {
                    prop: "intTotal",
                    label: "欠息金额(元)"
                }, {
                    prop: "createUser",
                    label: "客户经理"
                }],
                searchParams: {
                },
                channelPrdRel: {
                    "prdCode": this.productNo
                },
                initParams: {
                    "chanCode": this.chanCode,
                    "prdCode": this.productNo
                }
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
            download(){
                const _this = this;
                // const _list = this.list;
               _this.$http.post("/loan/loanDuebillAction.do?_md=exportExcelForDuebill")
                    .then(function (response) {
                        if (response.success){
                            _this.list = response.data;
                        }
                    })
                require.ensure([], () => {
                    const {export_json_to_excel} = require('../../vendor/Export2Excel');
                    const tHeader = ['借款人', '放款金额', '贷款余额', '产品种类', '放款日', '到期日', '利率','费率','担保方式','欠息金额','客户经理','利率',];
                    const filterVal = ['custName', 'loanAmt', 'loanBalance', 'prdCode', 'payoutDate', 'endDate', 'actualRate', 'repayMode', 'grtType', 'bizSts', 'overdueBalance', 'riskClassify', 'intTotal','createUser'];
                    let _list = this.list;
                    //_list=this.change2Chinese(_list);
                    const data = this.formatJson(filterVal, _list);
                    export_json_to_excel(tHeader, data, '贷款明细报表');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }
    };
</script>