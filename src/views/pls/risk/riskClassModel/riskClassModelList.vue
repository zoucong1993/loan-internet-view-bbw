<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="产品编码" prop="prdCode">
                            <elx-select-tree v-model="searchParams.prdCode" size="small" :url="prdUrl"
                            ></elx-select-tree>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="13">
                        <el-button type="primary" icon="el-icon-search" @click.native="search">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
       <!-- <elx-search-card searchTargetRef="table"
                         :searchItem="[
                                       {'prdCode':{
                                                   'label':'产品编码',
                                                   'component':'elx-select-tree',
                                                   ':url':'prdUrl'}}]"/>-->
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-plus"
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
                    width="60%">
                <risk-class-model-add ref="riskClassModelAdd" @refreshTable="refreshTable"
                                      @closeDialog="addVisible = false"
                                      :addUrl="addUrl"></risk-class-model-add>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="60%">
                <risk-class-model-update ref="riskClassModelUpdate" @refreshTable="search"
                                         @closeDialog="updateVisible = false"
                                         :updateUrl="updateUrl" :classModel="classModel"></risk-class-model-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%">
                <risk-class-model-view ref="riskClassModelView" :classModel="classModel"></risk-class-model-view>
            </el-dialog>
        </el-card>

    </div>
</template>
<script>
    import riskClassModelAdd from './riskClassModelAdd';
    import riskClassModelUpdate from './riskClassModelUpdate';
    import riskClassModelView from './riskClassModelView';

    export default {
        name: 'riskClassModelList',
        components: {
            riskClassModelAdd,
            riskClassModelUpdate,
            riskClassModelView
        },
        data() {
            return {
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                url: "/loan/riskClassModelAction.do?_md=selectForPage",
                updateUrl: "/loan/riskClassModelAction.do?_md=updateModel",
                addUrl: "/loan/riskClassModelAction.do?_md=addModelDetail",
                deleteUrl: "/loan/riskClassModelAction.do?_md=deleteModel",
                columns: [{
                    prop: "prdCode",
                    label: "产品编号"
                }, {
                    prop: "overMin",
                    label: "最小逾期天数"
                }, {
                    prop: "overMax",
                    label: "最大逾期天数"
                }, {
                    prop: "grtType",
                    label: "担保方式",
                    selectKey: "STD_ZB_ASSURE_MEANS"
                }, {
                    prop: "classLevel",
                    label: "分类级别",
                    selectKey: 'STD_ZB_FIVE_SORT'
                }],
                initParams: {},
                searchParams: {},
                classModel: {},
                addVisible: false,
                updateVisible: false,
                viewVisible: false
            }
        },
        mounted: function () {
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
                this.classModel = {...rows[0]};
                this.updateVisible = true;
            },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.classModel = {...rows[0]};
                this.viewVisible = true;
            }
        }
    };
</script>