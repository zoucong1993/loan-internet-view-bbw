<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px" :prop="searchParams">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="流程KEY" prop="processKey">
                            <el-input type="text" v-model="searchParams.processKey" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="13">
                        <el-button type="primary" icon="el-icon-search" @click.native="search">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.commitBtn" size="mini" type="success" icon="el-icon-edit-outline"
                           @click="oprateBreakRecovery">处理
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
        </el-card>
    </div>
</template>
<script>

    export default {
        name: 'breakRecoveryList',
        components: {},
        data() {
            return {
                uploadData: {},
                url: "/loan/breakRecoveryAction.do?_md=selectPageList",
                columns: [{
                    prop: "businessKey",
                    label: "业务主键",
                    showOverflowTooltip:true,
                }, {
                    prop: "instNo",
                    label: "流程实例ID",
                    showOverflowTooltip:true,
                }, {
                    prop: "processKey",
                    label: "流程KEY",
                    showOverflowTooltip:true,
                }, {
                    prop: "requestData",
                    label: "请求参数",
                    showOverflowTooltip:true,
                }, {
                    prop: "exceptionMessage",
                    label: "异常信息",
                    showOverflowTooltip:true,
                }, {
                    prop: "createTime",
                    label: "开始时间",
                    showOverflowTooltip:true,
                },{
                    prop: "updateTime",
                    label: "更新时间",
                    showOverflowTooltip:true,
                }, {
                    prop: "status",
                    label: "状态",
                    selectKey: "FLOW_BUSI_STATUS"
                }],
                searchParams: {

                },
                initParams: {},
                row: {},
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
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            refresh() {
                this.$refs.table.refresh();
            },
            oprateBreakRecovery() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                const status = rows[0].status;
                if(status === '1') {
                    this.$error("该笔业务已经处理成功");
                    return;
                }
                this.$http.post("/loan/activityAction.do?_md=breakeRecoverProcess",
                    {"id": id}).then(function (response) {
                    if (response.success) {
                        _this.$success(response.msg);
                        _this.$refs.table.refresh();
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
        }
    };
</script>