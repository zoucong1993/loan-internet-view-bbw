<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin-bottom: 10px">
                <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="addItem">新增
                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteItem">删除
                </el-button>
                <el-button size="mini" type="warning" icon="el-icon-edit" @click="updateItem">修改
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-view" @click="viewItem">查看</el-button>
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
                <prdTermOpt-add ref="prdTermOptAddForm" @refreshTable="searchItem" :termCode="this.termCode"
                                @addTermOptDialog="closeDialog"></prdTermOpt-add>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('prdTermOptAddForm')">确 定</el-button>
                    <el-button type="danger" @click="addVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    append-to-body
                    width="30%">
                <prdTermOpt-update ref="prdTermOptUpdateForm" @refreshTable="refresh"
                                   @updatePrdTermOptDialog="closeDialog"
                                   :row="row" :operate="operate1"></prdTermOpt-update>
                <div v-if='this.operate1 === "update"' slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('prdTermOptUpdateForm')">确 定</el-button>
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
    import prdTermOptAdd from './prdTermOptAdd';
    import prdTermOptUpdate from './prdTermOptUpdate';

    export default {
        name: "prdRateBaseList",
        components: {
            "prdTermOpt-add": prdTermOptAdd,
            "prdTermOpt-update": prdTermOptUpdate
        },
        props: {
            termCode: String
        },
        data() {
            return {
                url: "/loan/prdTermOptAction.do?_md=findPrdTermOptList",
                row: {},
                operate1: "",
                dialogTitle: "",
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                columns: [{
                    prop: "termCode",
                    label: "子产品编号"
                }, {
                    prop: "termOptCode",
                    label: "可选期限编号"
                }, {
                    prop: "term",
                    label: "可选期限"
                }],
                searchParams: {
                    termCode: this.termCode
                },
                initParams: {
                    termCode: this.termCode
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
                     _this.$http.post("/loan/prdTermOptAction.do?_md=deletePrdTermOptById", {"id": rows[0].id})
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