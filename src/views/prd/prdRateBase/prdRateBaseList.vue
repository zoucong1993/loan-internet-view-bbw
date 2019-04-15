<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'rateCode':'利率模型编号',
                         'rateName':'利率模型名称'
                         }]":searchParams="searchParams"
        ></elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 10px 0">
                <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-circle-plus"
                           @click="addItem">新增
                </el-button>
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                           @click="deleteItem">删除
                </el-button>
                <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="warning" icon="el-icon-edit"
                           @click="updateItem">修改
                </el-button>
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
                    title="新增"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    append-to-body
                    width="30%">
                <prdRateBase-add ref="prdRateBaseAddForm" @refreshTable="searchItem"
                                 @addPrdRateBaseDialog="closeDialog"></prdRateBase-add>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('prdRateBaseAddForm')">确 定</el-button>
                    <el-button type="danger" @click="addVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    append-to-body
                    width="30%">
                <prdRateBase-update ref="prdRateBaseUpdateForm" @refreshTable="refresh"
                                    @updatePrdRateBaseDialog="closeDialog"
                                    :row="row" :operate="operate1"></prdRateBase-update>
                <div v-if='this.operate1 === "update"' slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('prdRateBaseUpdateForm')">确 定</el-button>
                    <el-button type="danger" @click="updateVisible = false">取 消</el-button>
                </div>
                <div v-else slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="updateVisible = false">返 回</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import prdRateBaseAdd from './prdRateBaseAdd';
    import prdRateBaseUpdate from './prdRateBaseUpdate';

    export default {
        name: "prdRateBaseList",
        components: {
            "prdRateBase-add": prdRateBaseAdd,
            "prdRateBase-update": prdRateBaseUpdate
        },
        props: {
            productNo: String
        },
        data() {
            return {
                url: "/loan/prdRateBaseAction.do?_md=findRateBaseList",
                row: {},
                operate1: "",
                dialogTitle: "",
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                columns: [{
                    prop: "rateCode",
                    label: "利率模型编号",
                    showOverflowTooltip: true
                }, {
                    prop: "rateName",
                    label: "利率模型名称"
                },  {
                    prop: "rateFlag",
                    label: "利率标志",
                    selectKey: "STD_RATE_FLAG"
                }, {
                    prop: "rate",
                    label: "执行利率值"
                }, {
                    prop: "rateMode",
                    label: "利率方式",
                    selectKey: 'STD_RATE_FIX_FLOAT'
                }, {
                    prop: "floatType",
                    label: "浮动类型",
                    selectKey: 'STD_RATE_FLOAT_TYPE'
                }, {
                    prop: "floatValue",
                    label: "浮动值"
                }, {
                    prop: "fineFloatType",
                    label: "罚息浮动类型",
                    selectKey: 'STD_RATE_FLOAT_TYPE'
                }, {
                    prop: "fineFloatValue",
                    label: "罚息浮动值"
                }, {
                    prop: "compFloatType",
                    label: "复利浮动类型",
                    selectKey: 'STD_RATE_FLOAT_TYPE'
                }, {
                    prop: "compFloatValue",
                    label: "复利浮动值"
                }],
                searchParams: {
                    rateCode:'',
                    rateName:''
                },
                initParams: {
                },
            };
        },
        methods: {
            addItem: function () {
                this.addVisible = true
            },
            deleteItem: function () {
                let rows = this.$refs.table.getSelectedRows();
                const _this = this;
                if (rows.length === 1) {
                    this.$confirm("是否删除此条数据？", "温馨提示", {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        _this.$http.post("/loan/prdRateBaseAction.do?_md=deleteRateBaseById", {id: rows[0].id})
                            .then(function (response) {
                                if (response.success) {
                                    _this.refresh();
                                    _this.$success("删除成功！");
                                } else {
                                    _this.$error(response.msg)
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error.message);
                            });

                    }).catch(() => {
                        this.$info("取消删除！");
                    })
                } else {
                    this.$warning("请选择一行！");
                }
            },
            updateItem: function () {
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$warning("请选择一行！")
                } else {
                    this.row = {...rows[0]};
                    this.operate1 = "update";
                    this.dialogTitle = "修 改";
                    this.updateVisible = true;
                }
            },
            searchItem: function () {
                this.$refs.table.search();
            },
            viewItem: function () {
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$warning("请选择一行！")
                } else {
                    this.row = {...rows[0]};
                    this.operate1 = "view";
                    this.dialogTitle = "查 看";
                    this.updateVisible = true;
                }
            },
            refresh: function () {
                this.$refs.table.refresh();
            },
            search() {
                this.$refs.table.search();
            },
            resetFormCZ() {
                this.$refs.searchParams.resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].submitForm(formName);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeDialog: function () {
                this.addVisible = false;
                this.updateVisible = false;
            }
        }
    };
</script>