<template>
    <div>
        <!--<el-card class="box-card" shadow="never">
            <el-form ref="searchForm" :model="searchParams" label-width="100px">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="模板编号" prop="modelNo">
                            <el-input type="text" v-model="searchParams.modelNo" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="模板类型" prop="modelType">
                            <elx-select type="text" v-model="searchParams.modelType" size="small"
                                        selectKey="HTMBLX"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="7">
                        <el-button type="primary" icon="el-icon-search" @click.native="searchItem">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm('searchForm')">重置
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>-->
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'modelNo':'模板编号',
                         'modelName':'模板名称',
                         'modelType':{
                         'label':'模板类别',
                         'component':'elx-select',
                         'selectKey':'HTMBLX'
                         }}
                         ]"
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
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewModel">预览合同pdf
                </el-button>
                <el-button v-if="$route.meta.btns.downloadBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="downloadItem">下载合同模板
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
                    width="30%"
                    :close-on-click-modal="false"
                    v-drag>
                <contractModel-add ref="contractModelAddForm" @refreshTable="searchItem"
                                   @addContractModelDialog="closeDialog"></contractModel-add>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('contractModelAddForm')">确 定</el-button>
                    <el-button type="danger" @click="addVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="50%">
                <contractModel-update ref="contractModelUpdateForm" @refreshTable="refresh"
                                      @updateContractModelDialog="closeDialog"
                                      :row="row" :operate="operate"></contractModel-update>
                <div v-if='this.operate === "update"' slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="submitForm('contractModelUpdateForm')">确 定</el-button>
                    <el-button type="danger" @click="updateVisible = false">取 消</el-button>
                </div>
                <div v-else slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="updateVisible = false">返 回</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="合同pdf"
                    :visible.sync="pdfVisible"
                    v-if="pdfVisible"
                    :close-on-click-modal="false"
                    width="50%">
                <pdf-view ref="contractModelPdf" :filePath="filePath"></pdf-view>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import contractModelAdd from './contractModelAdd';
    import contractModelUpdate from './contractModelUpdate';
    import pdfView from './pdfView';

    export default {
        name: "prdOrgRelList",
        components: {
            "contractModel-add": contractModelAdd,
            "contractModel-update": contractModelUpdate,
            "pdf-view": pdfView
        },
        data() {
            return {
                url: "/loan/contractModelAction.do?_md=findContractModelList",
                row: {},
                operate: "",
                dialogTitle: "",
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                pdfVisible: false,
                filePath: "",
                columns: [{
                    prop: "modelNo",
                    label: "模板编号"
                }, {
                    prop: "modelName",
                    label: "模板名称"
                }, {
                    prop: "modelType",
                    label: "模板类型",
                    selectKey: 'HTMBLX'
                }, {
                    prop: "fileName",
                    label: "模板文件名",
                    ok: true
                }, {
                    prop: "filePath",
                    label: "模板文件路径"
                }, {
                    prop: "curVers",
                    label: "版本号"
                }],
                searchParams: {
                    curVers: ""
                },
                initParams: {
                    curVers: ""
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
                        _this.$http.post("/loan/contractModelAction.do?_md=deleteContractModelById", {id: rows[0].id})
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
                    this.row = {...rows[0]};
                    this.operate = "view";
                    this.dialogTitle = "查 看";
                    this.updateVisible = true;
                }
            },
            viewModel: function () {
                let rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$warning("请选择一行！")
                } else {
                    this.filePath = rows[0].filePath;
                    this.pdfVisible = true;
                }
            },
            downloadItem: function () {
                const _this = this;
                this.$http({
                    method: "get",
                    url: "/loan/downloadFileAction.do?_md=downloadContractTemplate",
                    responseType: 'blob',
                }).then(function (response) {
                    if (!response) {
                        return;
                    }
                    let url = window.URL.createObjectURL(response);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    document.body.appendChild(link);
                    link.setAttribute('download', "合同模板.pdf");
                    link.click();
                }).catch(function (error) {
                    _this.$error(error.message);
                })

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