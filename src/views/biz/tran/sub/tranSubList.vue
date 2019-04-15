<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px" :prop="searchParams">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="子交易编码" prop="subTranCode">
                            <el-input type="text" v-model="searchParams.subTranCode" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="子交易名称" prop="subTranName">
                            <el-input type="text" v-model="searchParams.subTranName" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="7">
                        <el-button type="primary" icon="el-icon-search" @click.native="search">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
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
                    title="新增交易关系"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    width="30%">
                <tran-sub-add ref="tranSubAdd" @refreshTable="search" @closeDialog="addVisible = false"></tran-sub-add>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('tranSubAdd')">保存</el-button>
                    <el-button type="danger" @click="addVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="查看交易关系"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="30%">
                <tran-sub-view @closeDialog="viewVisible = false" :data="row"></tran-sub-view>
            </el-dialog>
            <el-dialog
                    title="修改交易关系"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="30%">
                <tran-sub-update ref="tranSubUpdate" @refreshTable="refresh" @closeDialog="updateVisible = false"
                                 :data="row"></tran-sub-update>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('tranSubUpdate')">保存</el-button>
                    <el-button type="danger" @click="updateVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>

    import tranSubAdd from './tranSubAdd';
    import tranSubView from './tranSubView';
    import tranSubUpdate from './tranSubUpdate';

    export default {
        name: 'tranSubList',
        components: {tranSubAdd, tranSubView, tranSubUpdate},
        data() {
            return {
                uploadData: {},
                url: "/loan/tranSubAction.do?_md=findTranSubList",
                addVisible: false,
                viewVisible: false,
                updateVisible: false,
                columns: [{
                    prop: "subTranCode",
                    label: "子交易编码"
                }, {
                    prop: "subTranName",
                    label: "子交易名称"
                }, {
                    prop: "status",
                    label: "状态",
                    selectKey: "JYZT"
                }, {
                    prop: "remark",
                    label: "备注"
                }],
                searchParams: {
                    subTranCode: '',
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
                const _this = this;
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                this.$http.post("/loan/tranSubAction.do?_md=deleteTranSubById",
                    {"id": id}).then(function (response) {
                    if (response.success) {
                        _this.$success(response.msg);
                        _this.$refs.table.refresh();
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
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