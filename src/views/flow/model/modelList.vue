<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px" :prop="searchParams">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="模型key" prop="modelKey">
                            <el-input type="text" v-model="searchParams.modelKey" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="13">
                        <el-button type="primary" icon="el-icon-search" @click.native="search">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="success" icon="el-icon-plus" @click="addVisiable = true">新增</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteModel">删除</el-button>
                <el-button size="mini" type="warning" icon="el-icon-edit" @click="editModel">编辑流程</el-button>
                <el-button size="mini" type="success" icon="el-icon-service" @click="deployModel">部署</el-button>
                <el-button size="mini" type="success" icon="el-icon-download" @click="downloadModel">下载</el-button>
                <el-upload class="upload-demo" :on-success="handleUploandSucess" action="/flow/modelAction/uploadBpmnXml" :show-file-list="false" >
                    <el-button size="small" type="primary" icon="el-icon-upload2">上传</el-button>
                </el-upload>
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
                    title="新增模型"
                    :visible.sync="addVisiable"
                    v-if="addVisiable"
                    width="30%">
                <model-add ref="modelAdd" @refreshTable="search" @closeDialog="addVisiable = false"></model-add>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('modelAdd')">保存</el-button>
                    <el-button type="danger" @click="addVisiable = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="编辑流程"
                    :visible.sync="editVisiable"
                    v-if="editVisiable"
                    width="100%" class="editModeler" id="editProcess">
                <model-edit ref="modelEdit" :modelId="modelId" @refreshTable="search" @closeDialog="editVisiable = false"></model-edit>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import modelAdd from "@/views/flow/model/modelAdd"
    import modelEdit from "@/views/flow/model/modelEdit"
    export default {
        name: 'modelList',
        components: {modelAdd, modelEdit},
        data() {
            return {
                url: "/flow/modelAction/getReModelPage",
                columns: [{
                    prop: "key",
                    label: "模型KEY"
                }, {
                    prop: "name",
                    label: "模型名称"
                }, {
                    prop: "createTime",
                    label: "创建时间"
                }, {
                    prop: "lastUpdateTime",
                    label: "最后更新时间"
                }, {
                    prop: "version",
                    label: "版本"
                }],
                searchParams: {
                    modelKey: '',
                },
                initParams: {},
                row: {},
                addVisiable: false,
                editVisiable: false,
                modelId: null,
            }
        },
        mounted: function () {
        },
        methods: {
            getSelectRows() {
               return this.$refs.table.getSelectedRows();
            },
            search(){
                this.$refs.table.search();
            },
            resetForm(){
                this.$refs.searchParams.resetFields();
            },
            refresh(){
                this.$refs.table.refresh();
            },
            deployModel() {
                const rows = this.getSelectRows();
                const _this = this;
                if(rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                this.$http.get("/flow/modelAction/deployModel/" + id)
                    .then(function (response) {
                        if(response.success) {
                            _this.$success(response.msg);
                            _this.$refs.table.refresh();
                        }
                    }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            deleteModel() {
                const rows = this.getSelectRows();
                const _this = this;
                if(rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                this.$http.get("/flow/modelAction/deleteModel/" + id)
                    .then(function (response) {
                    if(response.success) {
                        _this.$success(response.msg);
                        _this.$refs.table.refresh();
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            downloadModel() {
                const rows = this.getSelectRows();
                const _this = this;
                if(rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                const key = rows[0].key;
                _this.$http({
                    method: "get",
                    url: "/flow/modelAction/downLoadBpmnXml/" + id,
                    responseType:'blob',
                })
                .then(function (response) {
                    if(!response) {
                        return;
                    }
                    let url = window.URL.createObjectURL(response);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    document.body.appendChild(link);
                    link.setAttribute('download', key + ".xml")
                    link.click();
                })
                .catch(function (error) {
                    _this.$error(error.message);
                })
            },
            editModel() {
                const rows = this.getSelectRows();
                if(rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.modelId = rows[0].id;
                this.editVisiable = true;
            },
            dialogOnSubmit(dialog){
                this.$refs[dialog].onSubmit();
            },
            handleUploandSucess(response, file, fileList) {
                if(response.success) {
                    this.$success(response.msg);
                    this.search();
                } else {
                    this.$error(response.msg);
                }
            }
        }
    };
</script>
<style>
    .editModeler .el-dialog__body {
        padding: 0px 0px;
    }
</style>