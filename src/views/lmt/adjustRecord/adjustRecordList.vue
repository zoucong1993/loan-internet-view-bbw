<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编码',
                                           'custName':'客户名称',
                                           'applyNo':'申请编码'
                                           },{
                                            'approveSts':{
                                                'label':'审批状态',
                                                'component':'elx-select',
                                                'selectKey':'WF_SP_STATUS'
                                            }
                                           }]"
        >
        </elx-search-card>
        <!--<el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="客户编码" prop="custNo">
                            <el-input type="text" v-model="searchParams.custNo" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="客户名称" prop="custName">
                            <el-input type="text" v-model="searchParams.custName" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="申请编码" prop="applyNo">
                            <el-input type="text" v-model="searchParams.applyNo" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-button type="primary" icon="el-icon-search" @click.native="search">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>-->
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
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
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%" :close-on-click-modal="false" v-drag append-to-body>
                    <adjust-record-view
                            @closeDialog="viewVisible = false"
                            :data="row"></adjust-record-view>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>

    import adjustRecordView from './adjustRecordView';

    export default {
        name: 'adjustRecordList',
        components: {
            adjustRecordView
        },
        data() {
            return {
                url: "/loan/adjustRecordAction.do?_md=selectForPage",
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
                    prop: "beforeAmt",
                    label: "调整前金额(元)",
                    formatter:(row, column, cellValue, index) =>{
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "afterAmt",
                    label: "调整后金额(元)",
                    formatter:(row, column, cellValue, index) =>{
                        return this.$moneyUtil.thousandsChange(cellValue);
                    },
                }, {
                    prop: "adjustReason",
                    label: "调整原因",
                },{
                    prop: "approveSts",
                    label: "申请状态",
                    selectKey: "WF_SP_STATUS"
                }],
                initParams: {},
                searchParams: {
                    custNo: '',
                    agrNo: '',
                    applyNo: ''
                },
                viewVisible: false,
                row:{}
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
                this.row = { ...rows[0]};
                this.viewVisible = true;
            }
        }
    };
</script>