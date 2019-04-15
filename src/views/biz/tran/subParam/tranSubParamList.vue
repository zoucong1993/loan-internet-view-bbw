<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'subTranName':'子交易名称'
                         }]"
        ></elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-plus"
                           @click="addVisible = true">新增
                </el-button>
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                           @click="delTranSubData">删除
                </el-button>
                <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="warning" icon="el-icon-edit"
                           @click="updateTranSubData">修改
                </el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewTranSubData">查看
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
                    title="新增子交易参数"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="60%"
                    v-drag>
                <tran-sub-param-add ref="tranSubParamAdd" @refreshTable="search"
                                    @closeDialog="addVisible = false"></tran-sub-param-add>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('tranSubParamAdd')">保存</el-button>
                    <el-button type="danger" @click="addVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="查看子交易参数"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="60%"
                    v-drag>
                <tran-sub-param-view @closeDialog="viewVisible = false" :data="row"></tran-sub-param-view>
            </el-dialog>
            <el-dialog
                    title="修改子交易参数"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="60%"
                    v-drag>
                <tran-sub-param-update ref="tranSubParamUpdate" @refreshTable="refresh"
                                       @closeDialog="updateVisible = false"
                                       :data="row"></tran-sub-param-update>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('tranSubParamUpdate')">保存</el-button>
                    <el-button type="danger" @click="updateVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>

    import tranSubParamAdd from './tranSubParamAdd';
    import tranSubParamView from './tranSubParamView';
    import tranSubParamUpdate from './tranSubParamUpdate';

    export default {
        name: 'tranSubParamList',
        components: {tranSubParamAdd, tranSubParamView, tranSubParamUpdate},
        data() {
            return {
                uploadData: {},
                url: "/loan/tranSubParamAction.do?_md=findTranSubParamList",
                addVisible: false,
                viewVisible: false,
                updateVisible: false,
                columns: [{
                    prop: "subTranName",
                    label: "子交易名称"
                }, {
                    prop: "paramName",
                    label: "参数名称"
                }, {
                    prop: "paramType",
                    label: "参数类型"
                }, {
                    prop: "paramKind",
                    label: "参数种类"
                }, {
                    prop: "remark",
                    label: "备注"
                }],
                searchParams: {
                    subTranName: '',
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
            delTranSubData() {
                const rows = this.getSelectRows();
                const _self = this;
                const _this = this;
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                _self.$confirm("是否删除此信息", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    const id = rows[0].id;
                    this.$http.post("/loan/tranSubParamAction.do?_md=deleteTranSubParamById",
                        {"id": id}).then(function (response) {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$refs.table.refresh();
                        }
                    }).catch(function (error) {
                        _this.$error(error.message);
                    })
                }).catch(() => {
                    return false;
                })
            },
            viewTranSubData() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.row = {...rows[0]};
                    _this.viewVisible = true;
                }
            },
            updateTranSubData() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.row = {...rows[0]};
                    _this.updateVisible = true;
                }
            },
            dialogOnSubmit(dialog) {
                this.$refs[dialog].onSubmit();
            }
        }
    };
</script>