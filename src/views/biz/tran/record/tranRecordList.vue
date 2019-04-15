<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'seriNo':'流水号',
                         'tranCode':'交易号',
                         'subTranCode':'子交易号'
                         }]"
        ></elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewTranRecordData">查看
                </el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
                       :checkbox="false"
            >
            </elx-table>
            <el-dialog
                    title="查看交易关系"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="60%"
                    v-drag>
                <tran-Record-view @closeDialog="viewVisible = false" :data="row"></tran-Record-view>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import tranRecordView from './tranRecordView';

    export default {
        name: 'tranRecordList',
        components: {tranRecordView},
        data() {
            return {
                uploadData: {},
                url: "/loan/tranRecordAction.do?_md=findTranRecordList",
                viewVisible: false,
                columns: [{
                    prop: "seriNo",
                    label: "流水号"
                }, {
                    prop: "tranCode",
                    label: "交易号"
                }, {
                    prop: "subTranCode",
                    label: "子交易号"
                }, {
                    prop: "orderNo",
                    label: "序号"
                }, {
                    prop: "retCode",
                    label: "返回码"
                }, {
                    prop: "retMsg",
                    label: "返回信息"
                }, {
                    prop: "startTime",
                    label: "开始时间"
                }, {
                    prop: "endTime",
                    label: "结束时间"
                }, {
                    prop: "tranType",
                    label: "交易状态",
                    selectKey: "JYZT",
                }],
                searchParams: {
                    seriNo: '',
                    tranCode: '',
                    subTranCode: '',
                },
                initParams: {},
                row: {}
            }
        },
        mounted: function () {
            console.log(this.$route);
        },
        methods: {
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            search() {
                this.$refs.table.search();
            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            refresh() {
                this.$refs.table.refresh();
            },
            viewTranRecordData() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.row = {...rows[0]};
                    _this.viewVisible = true;
                }
            },
        }
    };
</script>