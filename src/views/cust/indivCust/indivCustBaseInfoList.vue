<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编号',
                                           'custName':'客户名称',
                                           'certNo':'证件号码'
                                           }]":searchParams="searchParams"
        >
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <!--<el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-circle-plus" @click="addItem">新增</el-button>-->
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete" @click="deleteItem">删除</el-button>
                <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="warning" icon="el-icon-edit" @click="updateItem">修改</el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view" @click="viewItem">查看</el-button>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :checkbox=false
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <el-dialog
                    title="新增对私客户"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    width="60%">
                <cust-add ref="indivCustAddForm" @refreshTable="searchItem" @addCustDialog="closeDialog"></cust-add>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('indivCustAddForm')">确 定</el-button>
                    <el-button type="danger" @click="addVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="80%">
                <custInfo-tree ref="indivCustTree" :custNo = "custNo" :operate="operate"></custInfo-tree>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import custAdd from './indivCustBaseInfoAdd';
    import custInfoTree from './indivCustInfoTree';

    export default {
        name: "custIndivList",
        components: {
            custAdd,custInfoTree
        },
        data() {
            return {
                url: "/loan/cusBaseInfoAction.do?_md=findCusBaseInfoList",
                addVisible: false,
                updateVisible: false,
                columns: [{
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "certType",
                    label: "证件类型",
                    selectKey: 'STD_ZJLX'
                }, {
                    prop: "certNo",
                    label: "证件编号"
                }, {
                    prop: "custOrgName",
                    label: "主管机构",
                }],
                searchParams: {
                },
                initParams: {
                },
                custNo:"",
                dialogTitle:"",
                operate:""
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
                    this.$confirm("是否删除此客户？", "温馨提示", {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        _this.$http.post("/loan/cusBaseInfoAction.do?_md=deleteCustByCustNo", {custNo: rows[0].custNo})
                            .then(function (response) {
                                if (response.success) {
                                    _this.searchItem();
                                    _this.$success("删除成功!");
                                } else {
                                    _this.$error(response.msg)
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    }).catch(() => {
                        return;
                    })

                } else {
                    console.log("请选择一行！")
                }
            },
            updateItem: function () {
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$warning("请选择一行！")
                } else {
                    this.custNo = rows[0].custNo;
                    this.operate = "update";
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
                    this.custNo = rows[0].custNo;
                    this.operate = "view";
                    this.dialogTitle = "查 看";
                    this.updateVisible = true;
                }
            },
            submitForm(formName) {
                this.$refs[formName].submitForm();
            },
            closeDialog: function () {
                this.addVisible = false;
                this.updateVisible = false;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    };
</script>