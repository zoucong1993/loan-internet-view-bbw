<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'msgModelName':'模板名称',
                                    'msgScene':{'label':'使用场景','component':'elx-select','selectKey': 'STD_MSG_SCENE'}}]">
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 10px 0">
                <div v-if="modelRelFlag">
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
                </div>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <div align="center" style="margin-top: 15px" v-if="msgModelRelFlag === 'rel'">
                <el-button type="primary"  @click="retRows">提交</el-button>
                <el-button type="danger" @click="closeRelDialog">取消</el-button>
            </div>
            <el-dialog
                    title="新增"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    append-to-body
                    width="50%">
                <msgModel-add ref="msgModelAddForm" @refreshTable="searchItem"
                                 @addMsgModelDialog="closeDialog"></msgModel-add>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('msgModelAddForm')">确 定</el-button>
                    <el-button type="danger" @click="addVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    append-to-body
                    width="50%">
                <msgModelView ref="msgModelViewForm" @refreshTable="refresh"
                                    @viewMsgModelDialog="closeDialog"
                                    :row="row" :operate="operate1"
                                    :disabled="disabled"
                 ></msgModelView>

               <div v-if='this.operate1 === "update"' slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('msgModelViewForm')">确 定</el-button>
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

    import msgModelAdd from './msgModelAdd';
    import msgModelView from './msgModelView';

    export default {
        name: "msgModel",
        components: {
            "msgModelAdd": msgModelAdd,
            msgModelView
        },
        props: {
            msgModelCode: String,
            msgModelRelFlag: String,
        },
        data() {
            return {
                url: "/loan/msgManageAction.do?_md=findMsgModelList",
                row: {},
                initParams:{},
                searchParams:{},
                operate1: "",
                dialogTitle: "",
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                modelRelFlag: this.msgModelRelFlag !== 'rel',
                disabled:'',
                columns: [{
                    prop: "msgModelCode",
                    label: "模板编号"
                }, {
                    prop: "msgModelName",
                    label: "模板名称",
                    showOverflowTooltip:true
                }, {
                    prop: "msgScene",
                    label: "使用场景",
                    selectKey: "STD_MSG_SCENE",
                    showOverflowTooltip:true
                }, {
                    prop: "msgContent",
                    label: "短信内容",
                    showOverflowTooltip:true
                }, {
                    prop: "remark",
                    label: "备注",
                    showOverflowTooltip:true
                },{
                    prop: "createUser",
                    label: "登记人员",
                    showOverflowTooltip:true
                },/* {
                    prop: "createOrg",
                    label: "登记机构",
                    showOverflowTooltip:true
                }, */{
                    prop: "createTime",
                    label: "登记日期",
                    showOverflowTooltip:true
                }, {
                    prop: "updateUser",
                    label: "修改人员",
                    showOverflowTooltip:true
                }, /*{
                    prop: "updateOrg",
                    label: "修改机构",
                    showOverflowTooltip:true
                },*/ {
                    prop: "updateTime",
                    label: "修改日期",
                    showOverflowTooltip:true
                }],
            };
        },
        methods: {
            searchItem: function () {
                this.$refs.table.search();
                this.value = event.target.value.trim()
            },
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
                        _this.$http.post("/loan/msgManageAction.do?_md=deleteMsgManageById", {msgModelCode: rows[0].msgModelCode})
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
                    console.info(rows)
                    this.operate1 = "update";
                    this.dialogTitle = "修 改";
                    this.updateVisible = true;
                }
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
            },
            retRows() {
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length === 0) {
                    this.$error('请选择一行数据')
                    return;
                }
                this.row = {...rows[0]}
                this.$emit('getRows',this.row)
                this.$emit('closeRelDialog')
            },
            closeRelDialog() {
                const _this = this
                _this.$emit('closeRelDialog')
            }
        }

    };
</script>