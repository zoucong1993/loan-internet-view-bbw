<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px" :prop="searchParams">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="流程key" prop="key">
                            <el-input type="text" v-model="searchParams.key" size="small"></el-input>
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
                <el-button size="mini" type="warning" icon="el-icon-sort" @click="hangUpProcdef">挂起/激活</el-button>
                <el-button size="mini" type="success" icon="el-icon-view" @click="xmlRead">xml查看</el-button>
                <el-button size="mini" type="success" icon="el-icon-view" @click="pngRead">png查看</el-button>
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
                    title="xml内容"
                    :visible.sync="xmlVisible"
                    v-if="xmlVisible"
                    width="60%">
                <xmp>
                   {{ xmlData }}
                </xmp>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="danger" @click="xmlVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    title="png内容"
                    :visible.sync="pngVisible"
                    v-if="pngVisible"
                    width="60%">
                <img :src="pngUrl">
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="danger" @click="pngVisible = false, pngUrl = null">取消</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'procdefList',
        components: {},
        data() {
            return {
                url: "/flow/procdefAction/getProcdefPage",
                columns: [{
                    prop: "name",
                    label: "流程名称"
                }, {
                    prop: "key",
                    label: "流程KEY"
                }, {
                    prop: "version",
                    label: "版本号"
                }, {
                    prop: "resourceName",
                    label: "xml名称"
                }, {
                    prop: "diagramResourceName",
                    label: "png名称",
                }, {
                    prop: "suspensionState",
                    label: "流程状态",
                    formatter:  (row, column, cellValue) => {
                       return this.convertCell(cellValue);
                    }
                }],
                searchParams: {
                    key: '',
                },
                initParams: {},
                row: {},
                xmlVisible: false,
                xmlData: null,
                pngVisible: false,
                pngUrl: null,
            }
        },
        mounted() {
        },
        methods: {
            getSelectRows() {
               return this.$refs.table.getSelectedRows();
            },
            search(){
                this.$refs.table.search();
            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            refresh(){
                this.$refs.table.refresh();
            },
            hangUpProcdef() {
                const rows = this.getSelectRows();
                const _this = this;
                if(rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                this.$http.get("/flow/procdefAction/hangUp/" + id,)
                    .then(function (response) {
                        if(response.success) {
                            _this.$success(response.msg);
                            _this.$refs.table.refresh();
                        }
                    }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            deleteProcdef() {
                const rows = this.getSelectRows();
                const _this = this;
                if(rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const deploymentId = rows[0].deploymentId;
                this.$http.get("/flow/procdefAction/delete/" + deploymentId)
                    .then(function (response) {
                    if(response.success) {
                        _this.$success(response.msg);
                        _this.$refs.table.refresh();
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            xmlRead() {
                const rows = this.getSelectRows();
                if(rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                const _self = this;
                this.$http.get("/flow/procdefAction/readXml/" + id)
                    .then(function (response) {
                        if(response) {
                            _self.xmlVisible = true;
                            _self.xmlData = response;
                        }
                }).catch(function (error) {
                    console.log(error);
                    _self.$error(error.message);
                })
            },
            pngRead() {
                const rows = this.getSelectRows();
                if(rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                this.pngVisible = true;
                this.pngUrl = "/flow/procdefAction/readPng/" + id;
            },
            dialogOnSubmit(dialog){
                this.$refs[dialog].onSubmit();
            },
            convertCell(cellValue) {
                if(cellValue === 1) {
                    return "激活";
                }
                if(cellValue === 2) {
                    return "挂起";
                }
    }
        }
    };
</script>