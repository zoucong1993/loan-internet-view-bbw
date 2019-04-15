<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>方案修改</span>
            </div>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <el-form-item label="方案编号" prop="schemeId">
                        <el-input type="text" v-model="form.schemeId" disabled>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="方案描述" prop="schemeDesc">
                        <el-input type="text" v-model="form.schemeDesc">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <el-form-item v-if="false" label="方案分类" prop="itemType">
                        <elx-select selectKey="STD_ZB_ITEM_TYPE" v-model="form.itemType">
                        </elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                </el-col>
            </el-row>
        </el-card>

        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>方案明细</span>
            </div>

            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="success" icon="el-icon-plus"
                           @click="addDetailVisible=true">新增
                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete"
                           @click="deleteData">删除
                </el-button>
                <el-button size="mini" type="warning" icon="el-icon-edit"
                           @click="updateData">修改
                </el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看
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
        <el-dialog
                title="新增"
                :visible.sync="addDetailVisible"
                :close-on-click-modal="false"
                v-if="addDetailVisible"
                :appendToBody="true"
                width="65%"
                v-drag>
            <prd-file-scheme-detail-add ref="prdFileSchemeDetailAdd"
                                        @refreshTable="refreshTable"
                                        :schemeId="schemeId"
                                        @closeDialog="addSuccess"
            ></prd-file-scheme-detail-add>
            <div align="center" style="margin-top: 15px">
                <el-button type="primary" @click="confirmed('prdFileSchemeDetailAdd')">保存</el-button>
                <el-button type="danger" @click="onCancel">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="修改"
                :visible.sync="updateDetailVisible"
                :close-on-click-modal="false"
                v-if="updateDetailVisible"
                :appendToBody="true"
                width="65%"
                v-drag>
            <prd-file-scheme-detail-update ref="prdFileSchemeDetailUpdate"
                                           @refreshTable="search"
                                           @closeDialog="updateDetailVisible=false"
                                           :data="row"
            ></prd-file-scheme-detail-update>
        </el-dialog>
        <el-dialog
                title="查看"
                :visible.sync="viewDetailVisible"
                :close-on-click-modal="false"
                v-if="viewDetailVisible"
                :appendToBody="true"
                width="65%"
                v-drag>
            <prd-file-scheme-detail-view ref="prdFileSchemeDetailView"
                                         :data="row"
                                         @closeDialog="viewDetailVisible=false">
            </prd-file-scheme-detail-view>
        </el-dialog>


        <div align="center" style="margin-top: 15px">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>

    </el-form>
</template>
<script>

    import prdFileSchemeDetailAdd from "~/views/prd/proManagement/prdFileSchemeDetailAdd";
    import prdFileSchemeDetailUpdate from "~/views/prd/proManagement/prdFileSchemeDetailUpdate";
    import prdFileSchemeDetailView from "~/views/prd/proManagement/prdFileSchemeDetailView";

    export default {
        name: 'prdFileManSchemeUpdate',
        props:
            {
                updateUrl: String,
                data: {}
            },
        components: {
            prdFileSchemeDetailView,
            prdFileSchemeDetailUpdate,
            prdFileSchemeDetailAdd
        },
        data() {
            return {
                url: "/loan/prdFileSchemeDetailAction.do?_md=selectPrdFileSchemeDetailByPage",
                updateVisible: false,
                form: this.$props.data,
                schemeId: this.$props.data.schemeId,
                rules: {
                    schemeId: [{
                        required: true, message: '方案编号不能为空'
                    }],
                    schemeDesc: [{
                        required: true, message: '方案描述不能为空'
                    }],
                    itemType: [{
                        required: true, message: '方案分类不能为空'
                    }],
                },
                initParams: {
                    schemeId: this.$props.data.schemeId
                },
                searchParams: {},
                addDetailVisible: false,
                updateDetailVisible: false,
                viewDetailVisible: false,
                row: {},
                columns: [
                    {
                        prop: "schemeId",
                        label: "方案编号",
                    }, {
                        prop: "itemId",
                        label: "项目编号",
                    }, {
                        prop: "isCheck",
                        label: "是否检查",
                        selectKey: "STD_YES_NO"
                    },
                    {
                        prop: "fileType",
                        label: "文档类型",
                        selectKey: "WDLX"
                    },
                    {
                        prop: "isValid",
                        label: "是否有效",
                        selectKey: "STD_YES_NO"
                    }],
            }
        },
        mounted: function () {

        },
        methods: {
            confirmed(dialog) {
                const _this = this;
                _this.$refs[dialog].onSubmit();
                _this.refreshTable();
            },
            onSubmit() {
                const _this = this;
                this.$refs.form.validate(valid => {

                    if (!valid) {
                        return false;
                    }
                    this.$http.post(_this.updateUrl, _this.form)
                        .then((response) => {
                            if (response.success) {
                                _this.$success(response.msg);
                                _this.$emit('refreshTable');
                                _this.$emit('closeDialog');
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                        .catch((error) => {
                            _this.$error(error.message);
                        });
                });
            },

            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            },

            getSelectedRows() {
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
            deleteData: function () {
                const _self = this;
                _self.$confirm("是否删除此信息", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    const rows = this.getSelectedRows();
                    if (rows.length !== 1) {
                        this.$error("请选择一行数据");
                        return;
                    }
                    let id = rows[0].id;
                    _self.$http.post("/loan/prdFileSchemeDetailAction.do?_md=deletePrdFileSchemeDetailByPrimaryKey",
                        {"id": id})
                        .then(function (response) {
                            if (response.success) {
                                _self.$success(response.msg);
                                _self.$refs.table.refresh();
                            } else {
                                _self.$error(response.msg);
                            }
                        }).catch(function (error) {
                        _self.$error(error.message);
                    })
                }).catch(() => {
                    return false;
                })
            },
            updateData: function () {
                const rows = this.getSelectedRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = rows[0];
                this.updateDetailVisible = true;
            },
            viewData: function () {
                const rows = this.getSelectedRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = rows[0];
                this.viewDetailVisible = true;
            },
            addSuccess() {
                let _this = this;
                this.row = this.$refs.prdFileSchemeDetailAdd.addResult;
                this.addDetailVisible = false;
                setTimeout(function () {
                    _this.updateDetailVisible = true;
                }, 10)
            },
        }
    };
</script>