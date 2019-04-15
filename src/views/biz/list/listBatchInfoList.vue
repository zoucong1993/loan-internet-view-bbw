<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'batchNo':'批次编号',
                                           'listType':{
                                                'label':'名单类型',
                                                'component':'elx-select',
                                                'selectKey':'STD_MDLX'
                                           }
                                           }]":searchParams="searchParams"
        >
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看详情
                </el-button>
                <el-button v-if="$route.meta.btns.viewErrorBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewErrorData">查看错误信息
                </el-button>
                <el-button v-if="$route.meta.btns.approveBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="approveData">审批
                </el-button>
                <el-button v-if="$route.meta.btns.approveBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="processData">查看审批进度
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
                    title="查看错误信息"
                    :visible.sync="viewErrorVisible"
                    v-if="viewErrorVisible"
                    width="60%">
                <list-batch-error-view ref="listBatchErrorView" :batchNo="batchNo"></list-batch-error-view>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%">
                <list-batch-info-view ref="listBatchInfoView" :listBatchInfo="listBatchInfo"></list-batch-info-view>
            </el-dialog>
            <el-dialog
                    title="审批"
                    :visible.sync="approveVisible"
                    v-if="approveVisible"
                    width="60%">
                <content-tab ref="contentTab" @refreshTable="refreshTable" @closeDialog="approveVisible = false"
                             :rowData="rowData" flag="pre"></content-tab>
            </el-dialog>
            <el-dialog
                    title="审批进度"
                    :visible.sync="processVisible"
                    v-if="processVisible"
                    width="60%">
                <content-tab @refreshTable="refreshTable" @closeDialog="processVisible = false"
                             :rowData="rowData" flag="done"></content-tab>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import listBatchErrorView from './listBatchErrorView';
    import listBatchInfoView from './listBatchInfoView';
    import contentTab from './contentTab';

    export default {
        name: 'listBatchInfoList',
        components: {
            listBatchInfoView,
            listBatchErrorView,
            contentTab
        },
        data() {
            return {
                url: "/loan/listBatchAction.do?_md=selectForPage",
                columns: [{
                    prop: "batchNo",
                    label: "批次编号"
                }, {
                    prop: "listType",
                    label: "名单类型",
                    selectKey: "STD_MDLX"
                }, {
                    prop: "fileName",
                    label: "文件名称"
                }, {
                    prop: "uploadTime",
                    label: "上传时间"
                }, {
                    prop: "approveSts",
                    label: "审批状态",
                    selectKey: 'APPLY_STS'
                }, {
                    prop: "succCnt",
                    label: "成功笔数"
                }, {
                    prop: "failCnt",
                    label: "失败笔数"
                }],
                initParams: {},
                searchParams: {},
                batchNo:"",
                listBatchInfo:{},
                rowData: {},
                viewVisible:false,
                viewErrorVisible: false,
                approveVisible: false,
                processVisible: false,
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
                this.listBatchInfo = {...rows[0]};
                this.viewVisible = true;
            },
            viewErrorData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }

                this.batchNo = rows[0].batchNo;

                this.viewErrorVisible = true;
            },
            approveData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                if (rows[0].approveSts !== '01') {
                    this.$error("该用户已经审批完成或者正在审批中,请勿重复提交请求");
                    return;
                }
                this.rowData.processDefinitionKey = "biz-list-batchInfo";
                this.rowData.businessKey =  rows[0].batchNo;
                this.rowData.busiInfo = "白名单批次审批";
                this.rowData.assignee = this.$sessionStorage.getLoginUser().user.userName;
                this.approveVisible = true;
            },

            processData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                let instNo = rows[0].instNo;
                this.$http.post("/flow/taskAction/getDoneTaskByInstNo", {
                    "instNo": instNo
                }).then((response) => {
                    if(response.success) {
                        this.processVisible = true;
                        this.rowData = response.data;
                    } else {
                        this.$error(response.msg);
                    }
                }).catch((error) => {
                    this.$error(error.message);
                })
            }
        }
    };
</script>