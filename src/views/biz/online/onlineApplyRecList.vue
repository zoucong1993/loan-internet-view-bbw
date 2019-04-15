<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'seriNo':'交易流水号','custNo':'请求客户号',
                                            'prdCode':{
                                            'label':'产品名称',
                                            'component':'elx-select-tree',
                                            'url':'/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree',
                                             }},{'tranCode':'交易码','tranDate':{'label':'交易日期',
                                                                                 'component':'el-date-picker',
                                                                                 'value-format':'yyyy-MM-dd'},'chanCode':{'label':'来源渠道',
                                                                                                                         'component':'elx-select',
                                                                                                                         'selectKey':'STD_LYQD'}}]">
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 3px 0;padding-bottom: 10px">
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
                    title="查看详情"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="70%">
                <onlineApplyRec-view ref="onlineApplyRecViewForm" :row="row"></onlineApplyRec-view>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="viewVisible = false">返 回</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import onlineApplyRecView from './onlineApplyRecView';

    export default {
        name: "onlineApplyRecList",
        components: {
            "onlineApplyRec-view": onlineApplyRecView
        },
        data() {
            return {
                url: "/loan/onlineApplyRecAction.do?_md=findOnlineApplyRecList",
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                row: {},
                viewVisible: false,
                columns: [{
                    prop: "seriNo",
                    label: "交易流水号"
                }, {
                    prop: "custNo",
                    label: "请求客户号"
                }, {
                    prop: "productName",
                    label: "产品名称"
                }, {
                    prop: "tranCode",
                    label: "交易码"
                }, {
                    prop: "tranDate",
                    label: "交易日期"
                }, {
                    prop: "chanCode",
                    label: "来源渠道",
                    selectKey: "STD_LYQD"

                }, {
                    prop: "sysCode",
                    label: "接入系统标识",
                    selectKey: 'STD_OL_APP_SYS_CODE'
                }, {
                    prop: "reverseTran",
                    label: "正反交易标识",
                    selectKey: 'STD_TRADETYPE'
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