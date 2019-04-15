<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编号'
                                           }]":searchParams="searchParams"
        >
        </elx-search-card>



        <el-card class="box-card" shadow="never">
            <el-button size="mini" type="primary" icon="el-icon-view"
                       @click="bizFileViewData">影像查看
            </el-button>
            <el-button size="mini" type="primary" icon="el-icon-view"
                       @click="queryBaseInfo">查看
            </el-button>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>

            <el-dialog
                    title="影像查看"
                    :visible.sync="yingViewVisible"
                    :close-on-click-modal="false"
                    v-if="yingViewVisible"
                    :appendToBody="true"
                    width="65%"
                    v-drag>
                <biz-file-manage-list-View ref="bizFileManageListView" :params1="params1" :params="params" :params2="params2"
                                           @closeDialog="yingViewVisible=false"></biz-file-manage-list-View>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="baseInfoDialog"
                    :close-on-click-modal="false"
                    v-if="baseInfoDialog"
                    :appendToBody="true"
                    width="65%"
                    v-drag>
                <white-list-view :whiteList = "whiteList"></white-list-view>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import bizFileManageList from "~/views/prd/proManagement/BizFileManageList";
    import bizFileManageListView from "~/views/prd/proManagement/BizFileManageListView";
    import whiteListView from '~/views/cust/whiteList/whiteListView.vue';

    export default {
        name: 'listBatchApproveList',
        props: {
            batchNo: String
        },
        components: {bizFileManageList,bizFileManageListView,whiteListView},
        data() {
            return {
                url: "/loan/listBatchAction.do?_md=selectApproveListByBatchNo",
                columns: [{
                    prop: "custName",
                    label: "客户姓名"
                }, {
                    prop: "certType",
                    label: "证件类型",
                    selectKey: 'STD_ZJLX'
                }, {
                    prop: "certNo",
                    label: "证件号码"
                }, {
                    prop: "actualRate",
                    label: "执行利率"
                },{
                    prop: "lmtAmt",
                    label: "授信额度"
                }],
                initParams: {
                    "batchNo": this.batchNo
                },
                params:{},
                searchParams: {},
                whiteList: {},
                params1: "",
                params2:[],
                yingViewVisible: false,
                yingVisible: false,
                baseInfoDialog: false,
            }
        },
        mounted: function () {
            console.info(this.$sessionStorage.getLoginUser().user);
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
            queryBaseInfo(){
                let rows = this.getSelectRows()
                if (rows.length === 0) {
                    this.$error('请选择一条数据')
                    return
                }
                this.baseInfoDialog = true
                this.whiteList = rows[0]

            },
            bizFileViewData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.params1 = '[{"custNo":' + '\"' + rows[0].certNo + '\"' + ',"applyNo":' + '\"' + rows[0].certNo + '\"' + ',"custName":' +
                    '\"' + rows[0].custName + '\"' + ',"schemeId":"WL00001"}]';
                this.params1 = encodeURIComponent(this.params1);
                this.params2  = [{"custNo": rows[0].certNo,"applyNo":rows[0].certNo,"custName":rows[0].custName,"schemeId":"WL00001"}];
                this.params.custNo = rows[0].certNo,
                this.params.applyNo = rows[0].certNo,
                this.params.custName = rows[0].custName,
                this.params.schemeId = "WL00001";
                this.yingViewVisible = true;
            },
        }
    };
</script>