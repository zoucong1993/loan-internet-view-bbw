<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'batchNo':'批次编码'}]">
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看详情
                </el-button>
                <el-button v-if="$route.meta.btns.viewErrorBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewErrorData">查看错误信息
                </el-button>
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                           @click="deleteData">删除
                </el-button>
                <el-button v-if="$route.meta.btns.approveBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="approveData">审批
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
                    width="60%">
                <holiday-batch-view ref="holidayBatchView" :holidayBatchInfo="holidayBatchInfo"></holiday-batch-view>
            </el-dialog>
            <el-dialog
                    title="查看错误信息"
                    :visible.sync="viewErrorVisible"
                    v-if="viewErrorVisible"
                    width="60%">
                <holiday-error-list ref="holidayErrorList" :batchNo="batchNo"></holiday-error-list>
            </el-dialog>
            <el-dialog
                    title="审批"
                    :visible.sync="approveVisible"
                    v-if="approveVisible"
                    width="60%">
                <batch-content-tab ref="batchContentTab" @refreshTable="refreshTable"
                                   @closeDialog="approveVisible = false"
                                   :rowData="rowData" flag="todo"></batch-content-tab>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import HolidayErrorList from "~/views/biz/holiday/holidayErrorList";
    import HolidayBatchView from "~/views/biz/holiday/holidayBatchView";
    import BatchContentTab from "~/views/biz/holiday/batchContentTab";

    export default {
        name: 'holidayBatchList',
        components: {BatchContentTab, HolidayBatchView, HolidayErrorList},
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
                    selectKey: 'WF_SP_STATUS'
                }, {
                    prop: "succCnt",
                    label: "成功笔数"
                }, {
                    prop: "failCnt",
                    label: "失败笔数"
                }],
                initParams: {
                    listType: '10',
                },
                searchParams: {},
                batchNo: "",
                holidayBatchInfo: {},
                rowData: {},
                viewVisible: false,
                viewErrorVisible: false,
                approveVisible: false
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
                this.holidayBatchInfo = {...rows[0]};
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
            deleteData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一条数据!");
                    return;
                }
                if (rows[0].approveSts === "02") {
                    this.$error("该批次日期正在审批中!不可删除");
                    return;
                }
                if (rows[0].approveSts === "03") {
                    this.$error("该批次日期已审批通过!不可删除");
                    return;
                }
                const _this = this;
                _this.$confirm("是否删除此信息", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http.post("/loan/listBatchAction.do?_md=deleteByBatchNo",
                        {"batchNo": rows[0].batchNo}
                    ).then(response => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.refreshTable();
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                })
            },

            approveData: function () {
                const _this = this;
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                if (rows[0].approveSts === "02") {
                    this.$error("该批次日期正在审批中!不可再次审批");
                    return;
                }
                if (rows[0].approveSts === "03") {
                    this.$error("该批次日期已审批通过!不可再次审批");
                    return;
                }
                if (rows[0].succCnt === 0) {
                    this.$error("无成功笔数,不可审批");
                    return;
                }
                this.$http.post("/loan/activityAction.do?_md=publisActiviti", {
                    processDefinitionKey: "holiday_batch_manager",
                    businessKey: rows[0].batchNo,
                    busiInfo: "节假日批次审批",
                    assignee: this.$sessionStorage.getLoginUser().user.userName
                })
                    .then((response) => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.refreshTable();
                            _this.rowData = response.data;
                            _this.approveVisible = true;
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch((error) => {
                        _this.$error(error.message);
                    });

            }
        }
    };
</script>
