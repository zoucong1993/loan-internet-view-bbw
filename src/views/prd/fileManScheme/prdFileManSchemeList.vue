<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{'schemeId':'方案编号','itemId':'项目编号'}
             ]"
        ></elx-search-card>

        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="success" icon="el-icon-plus"
                           @click="addVisible=true" >新增
                </el-button>
                <el-button  size="mini" type="danger" icon="el-icon-delete"
                            @click="deleteData"  >删除
                </el-button>
                <el-button  size="mini" type="warning" icon="el-icon-edit"
                            @click="updateData" >修改
                </el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData" >查看
                </el-button>
            </el-row>
            <el-dialog
                    title="新增"
                    :visible.sync="addVisible"
                    :close-on-click-modal="false"
                    v-if="addVisible"
                    :appendToBody="true"
                    width="65%"
                    v-drag>
                <prd-file-man-scheme-add ref="prdFileManSchemeAdd" @refreshTable="refreshTable"
                                         @closeDialog="addSuccess" :addUrl="addUrl"
                ></prd-file-man-scheme-add>
                <div align="center" style="margin-top: 15px">
                    <el-button type="primary" @click="confirmed('prdFileManSchemeAdd')">确认</el-button>
                    <el-button type="danger" @click="addVisible=false">取消</el-button>
                </div>
            </el-dialog>

            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    :close-on-click-modal="false"
                    v-if="updateVisible"
                    :appendToBody="true"
                    width="65%"
                    v-drag>
                <prd-file-man-scheme-update ref="prdFileManSchemeUpdate" @refreshTable="search"
                                            @closeDialog="updateVisible=false"
                                            :updateUrl="updateUrl" :data="row"
                ></prd-file-man-scheme-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    :close-on-click-modal="false"
                    v-if="viewVisible"
                    :appendToBody="true"
                    width="65%"
                    v-drag>
                <prd-file-man-scheme-view ref="prdFileManSchemeView" :data="row"
                                          @closeDialog="viewVisible=false"></prd-file-man-scheme-view>
            </el-dialog>
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
    import prdFileManSchemeAdd from "./prdFileManSchemeAdd";
    import prdFileManSchemeUpdate from "./prdFileManSchemeUpdate";
    import prdFileManSchemeView from "./prdFileManSchemeView";

    export default {
        name: "prdFileManSchemeList",
        components: {
            prdFileManSchemeView,
            prdFileManSchemeUpdate,
            prdFileManSchemeAdd
        },

        data() {
            return {
                url: "/loan/prdFileManSchemeAction.do?_md=selectPrdFileManSchemeByPage",
                addUrl: "/loan/prdFileManSchemeAction.do?_md=insertPrdFileManScheme",
                deleteUrl: "/loan/prdFileManSchemeAction.do?_md=deletePrdFileManSchemeByPrimaryKey",
                updateUrl: "/loan/prdFileManSchemeAction.do?_md=updatePrdFileManSchemeByPrimaryKey",
                initParams: {},
                searchParams: {},
                row: {},
                addVisible:false,
                updateVisible:false,
                viewVisible:false,
                columns: [{
                    prop: "schemeId",
                    label: "方案编号",
                    width: "500"
                }, {
                    prop: "schemeDesc",
                    label: "方案描述",
                    width: "500"
                }, {
                        prop: "createUserName",
                        label: "登记人",
                    }, {
                        prop: "createOrgName",
                        label: "登记机构",
                    },/*{
                    prop: "itemType",
                    label: "方案分类",
                    selectKey:'STD_ZB_ITEM_TYPE'
                }*/],
            }
        },

        methods: {
            getSelectedRows(){
                return this.$refs.table.getSelectedRows();
            },
            search(){
                this.$refs.table.search();
            },
            refreshTable(){
                this.$refs.table.refresh();
            },
            resetForm(){
                this.$refs.searchParams.resetFields();
            },
            deleteData:function () {

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
                    _self.$http.post(_self.deleteUrl,
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
                    });

                }).catch(() => {
                    _self.$error(error.message);
                })
            },
            confirmed(dialog) {
                const _this = this;
                _this.$refs[dialog].onSubmit();
                _this.refreshTable();
            },
            updateData:function () {
                const rows=this.getSelectedRows();
                if(rows.length!==1)
                {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = {...rows[0]};
                this.updateVisible=true;
            },
            viewData:function () {
                const rows=this.getSelectedRows();
                if(rows.length!==1)
                {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = {...rows[0]};
                this.viewVisible=true;
            },
            addSuccess() {
                this.row = this.$refs.prdFileManSchemeAdd.addResult;
                this.addVisible = false;
                this.updateVisible = true;
            }

        }
    }
</script>