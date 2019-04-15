<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'prdCode':{'label':'产品名称',
                                     'component':'elx-select-tree',
                                     'url':'/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree'
                                     },
                         'chanCode':'渠道编码',
                         }]":searchParams="searchParams"
        ></elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin-bottom: 10px">
                <el-button v-if="this.operate === 'update'" size="mini" type="success" icon="el-icon-circle-plus"
                           @click="addItem">新增
                </el-button>
                <el-button v-if="this.operate === 'update'" size="mini" type="danger" icon="el-icon-delete"
                           @click="deleteItem">删除
                </el-button>
                <el-button v-if="this.operate === 'update'" size="mini" type="warning" icon="el-icon-edit"
                           @click="updateItem">修改
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-view" @click="viewItem">查看</el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :checkbox=true
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
                <prdContract-add ref="prdContractAddForm" @refreshTable="searchItem" :prdCode="productNo"
                                 @addPrdContractRelDialog="closeDialog"></prdContract-add>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('prdContractAddForm')">确 定</el-button>
                    <el-button type="danger" @click="addVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    append-to-body
                    width="30%">
                <prdContract-update ref="prdContractUpdateForm" @refreshTable="refresh"
                                    @updatePrdContractRelDialog="closeDialog"
                                    :row="row" :operate="operate1"></prdContract-update>
                <div v-if='this.operate1 === "update"' slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('prdContractUpdateForm')">确 定</el-button>
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
    import prdContractRelAdd from './prdContractRelAdd';
    import prdContractRelUpdate from './prdContractRelUpdate';

    export default {
        name: "prdOrgRelList",
        components: {
            "prdContract-add": prdContractRelAdd,
            "prdContract-update": prdContractRelUpdate
        },
        props: {
            operate: String,
            productNo: String
        },
        data() {
            return {
                url: "/loan/prdContModelRelAction.do?_md=findPrdContModelRelList",
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                row: {},
                operate1: "",
                dialogTitle: "",
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                columns: [{
                    prop: "prdCode",
                    label: "产品编号"
                }, {
                    prop: "modelNo",
                    label: "合同模板编号"
                }, {
                    prop: "chanCode",
                    label: "渠道编码"
                }],
                searchParams: {
                    prdCode: this.productNo,
                    modelNo: '',
                    chanCode: ''
                },
                initParams: {
                    prdCode: this.productNo
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
                        _this.$http.post("/loan/prdContModelRelAction.do?_md=deletePrdContModelRelById", {id: rows[0].id})
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
                        return;
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