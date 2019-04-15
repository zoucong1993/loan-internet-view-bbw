<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编码',
                                           'custName':'客户名称',
                                           'applyNo':'申请编码'
                                           },{
                                            'agrSts':{
                                                'label':'额度状态',
                                                'component':'elx-select',
                                                'selectKey':'STD_LMT_STATUS'
                                            }
                                           }]"
        >
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看
                </el-button>
                <el-button v-if="$route.meta.btns.stopBtn" size="mini" type="danger" icon="el-icon-edit"
                           @click="stopAgree">终止
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
                    width="70%"
                    append-to-body>
                <credit-agree-view ref="creditAgreeView" @refreshTable="refreshTable"
                                  @closeDialog="viewVisible = false" :stop="stop"
                                  :creditAgree="creditAgree"></credit-agree-view>
            </el-dialog>
        </el-card>

    </div>
</template>
<script>

    import creditAgreeView from './creditAgreeView';

    export default {
        name: 'creditAgreeList',
        components: {
            creditAgreeView
        },
        props:{
            flag:'',
        },
        created:function () {
            if(this.flag==='freeze'){
                this.url="/loan/creditAgreeAction.do?_md=selectFreezeAble";
            }
        },
        data() {
            return {
                url: "/loan/creditAgreeAction.do?_md=selectForPage",
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
                    prop: "productName",
                    label: "产品名称"
                }, {
                    prop: "agrAmt",
                    label: "协议金额(元)",
                    formatter:(row, column, cellValue, index) =>{
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "custOrgName",
                    label: "管户经理"
                }, {
                    prop: "agrSts",
                    label: "额度状态",
                    selectKey: "STD_LMT_STATUS"
                }],
                initParams: {},
                searchParams: {
                },
                creditAgree: {},
                stop: false,
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
                this.stop = false;
                this.creditAgree = {...rows[0]};
                this.viewVisible = true;
            },
            stopAgree() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.stop = true;
                this.creditAgree = {...rows[0]};
                this.viewVisible = true;
            }
        }
    };
</script>