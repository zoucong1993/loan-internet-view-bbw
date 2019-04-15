<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{

                        'itemId':{'label':'项目编号','component':'el-input','type':'text',},
                         'itemName':{'label':'项目名称','component':'el-input','type':'text',}

                         },

                         ]"
        >
        </elx-search-card>

        <el-card class="box-card" shadow="never">
            <div v-if="scheme">
                <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                    <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-circle-plus"
                               @click="addVisible = true">新增
                    </el-button>
                    <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                               @click="deleteData">删除
                    </el-button>
                    <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="warning" icon="el-icon-edit"
                               @click="updateData">修改
                    </el-button>
                    <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                               @click="viewData">查看
                    </el-button>
                </el-row>
            </div>
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
                    width="65%"
                    :close-on-click-modal="false">
                <prd-file-list-add ref="prdFileListAdd" @refreshTable="refreshTable"
                                   @closeDialog="addSuccess"
                                   :addUrl="addUrl"></prd-file-list-add>
                <div align="center" style="margin-top: 15px;">
                    <el-button type="primary" @click="confirmed('prdFileListAdd')">保存</el-button>
                    <el-button type="danger" @click="addVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="65%"
                    :close-on-click-modal="false">
                <prd-file-list-update ref="prdFileListUpdate" @refreshTable="search"
                                      @closeDialog="updateVisible = false"
                                      :updateUrl="updateUrl" :data="row"></prd-file-list-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="65%"
                    :close-on-click-modal="false">
                <prd-file-list-view ref="prdFileListView" :data="row"></prd-file-list-view>
            </el-dialog>
        </el-card>
    </div>


</template>

<script>
    import prdFileListAdd from './prdFileListAdd'
    import prdFileListUpdate from './prdFileListUpdate'
    import prdFileListView from './prdFileListView'

    export default {
        name: "prdFileList",
        props: {
            schemeId: String,
            flag: String,
        },
        components: {
            prdFileListAdd,
            prdFileListUpdate,
            prdFileListView
        },
        data() {
            return {
                url: "",
                updateUrl: "/loan/prdFileListAction.do?_md=updatePrdFileListByPrimaryKey",
                addUrl: "/loan/prdFileListAction.do?_md=insertPrdFileList",
                deleteUrl: "/loan/prdFileListAction.do?_md=deletePrdFileListByPrimaryKey",
                columns: [
                    {
                        prop: "itemId",
                        label: "项目编号",
                        width: "500"
                    }, {
                        prop: "itemName",
                        label: "项目名称",
                        width: "500"
                    },
                    {
                        prop: "itemDesc",
                        label: "检查说明",
                    }],
                row: {},
                initParams: {},
                searchParams: {},
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                form: {},
                scheme: true
            }
        },
        created: function () {
            let flag = this.$props.flag;
            if (flag == 'scheme') {
                this.url = '/loan/prdFileListAction.do?_md=findPrdFileSchemeItemList';
                this.searchParams.schemeId = this.$props.schemeId;
                this.scheme = false;
            } else {
                this.url = '/loan/prdFileListAction.do?_md=selectPrdFileByPage';
            }
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
            confirmed(dialog) {
                const _this = this;
                _this.$refs[dialog].onSubmit();
                _this.refreshTable();
            },
            deleteData: function () {
                const _self = this;
                _self.$confirm("是否删除此信息", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    const rows = this.getSelectRows();
                    if (rows.length !== 1) {
                        this.$error("请选择一行数据");
                        return;
                    }
                    let itemId =rows[0].itemId;
                    this.$http.post("/loan/prdFileListAction.do?_md=deletePrdFileListByItemId",
                        {"itemId": itemId})
                        .then(function (response) {
                            if (response.success) {
                                _self.$success(response.msg);
                                _self.$refs.table.refresh();
                            }
                        }).catch(function (error) {
                        _self.$error(error);
                    })
                }).catch(() => {
                    return false;
                })
            },
            updateData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = rows[0];
                this.updateVisible = true;
            },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = rows[0];
                this.viewVisible = true;
            },
            addSuccess() {
                this.row = this.$refs.prdFileListAdd.addResult;
                this.addVisible = false;
                this.updateVisible = true;
            },
            onSubmit() {
                const rows = this.getSelectRows();
                this.saveAdd(rows);
            },
            saveAdd(rows) {
                const _this = this;
                const schemeId = this.schemeId;
                const itemId = rows[0].itemId;

                _this.form.schemeId = schemeId;
                _this.form.itemId = itemId;

                this.$http.post("/loan/prdFileSchemeDetailAction.do?_md=insertPrdFileSchemeDetail",
                    _this.form).then(
                    function (response) {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog');
                        } else {
                            _this.$error(response.msg);
                        }
                    }
                ).catch(function (error) {
                    _this.$error(error.message);
                });
            },

        }
    };
</script>