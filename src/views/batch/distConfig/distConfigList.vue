<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="job名称" prop="jobName">
                            <el-input type="text" v-model="searchParams.jobName" size="small"></el-input>
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
                <dist-config-add ref="distConfigAdd" @refreshTable="refreshTable" @closeDialog="addVisible = false"
                                 :addUrl="addUrl"></dist-config-add>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="60%">
                <dist-config-update ref="distConfigUpdate" @refreshTable="search" @closeDialog="updateVisible = false"
                                    :updateUrl="updateUrl" :distConfigList="distConfigList"></dist-config-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%">
                <dist-config-view ref="distConfigView" :distConfigList="distConfigList"></dist-config-view>
            </el-dialog>
        </el-card>

    </div>
</template>
<script>
    import distConfigAdd from './distConfigAdd';
    import distConfigUpdate from './distConfigUpdate';
    import distConfigView from './distConfigView';


    export default {

        name: 'distConfigList',
        components: {

            distConfigAdd,
            distConfigUpdate,
            distConfigView

        },
        data() {
            return {
                url: "/loan/batchDistAction.do?_md=selectForPage",
                updateUrl: "/loan/batchDistAction.do?_md=updateById",
                addUrl: "/loan/batchDistAction.do?_md=addDistConfig",
                deleteUrl: "/loan/batchDistAction.do?_md=deleteById",
                columns: [
                    {
                        prop: "jobName",
                        label: "job名称"
                    },
                    {
                        prop: "perCount",
                        label: "切分数据的步长"
                    }, {
                        prop: "createUser",
                        label: "创建人"
                    }, {
                        prop: "createTime",
                        label: "创建时间"
                    }, {
                        prop: "updateUser",
                        label: "更新人"
                    }, {
                        prop: "updateTime",
                        label: "更新时间"
                    }],
                initParams: {},
                searchParams: {},
                distConfigList: {},
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
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                _self.$confirm("是否删除此信息", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {

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
                else {
                    this.distConfigList = {...rows[0]};
                    this.updateVisible = true;

                }
            },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.distConfigList = {...rows[0]};
                this.viewVisible = true;
            }
        }
    };
</script>