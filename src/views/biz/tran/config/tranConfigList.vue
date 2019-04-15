<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'tranCode':'交易号',
                         'tranName':'交易名称',
                         'tranStatus':{
                         'label':'交易状态',
                         'component':'elx-select',
                         'selectKey':'STD_START_STOP'
                         }
                         }]"
        ></elx-search-card>
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
                <el-button size="mini" type="warning" icon="el-icon-sort" @click="scheduleClick">交易配置</el-button>
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
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="60%"
                    v-drag>
                <tran-config-add ref="tranConfigAdd" @refreshTable="refreshTable" @closeDialog="addVisible = false"
                                 :addUrl="addUrl"></tran-config-add>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="60%"
                    v-drag>
                <tran-config-update ref="tranConfigUpdate" @refreshTable="search" @closeDialog="updateVisible = false"
                                    :tranConfig="tranConfig"></tran-config-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="60%"
                    v-drag>
                <tran-config-view ref="tranConfigView" :tranConfig="tranConfig"></tran-config-view>
            </el-dialog>
            <el-dialog
                    title="任务配置"
                    :visible.sync="scheduleVisible"
                    v-if="scheduleVisible"
                    :close-on-click-modal="false"
                    :appendToBody="true"
                    width="75%">
                <tran-config-schedule ref="tranCofigSchedule" :tranCode="tranCode" :jsonData="jsonData"
                                      :curVers="curVers" @refreshTable="search" @closeDialog="scheduleVisible = false"/>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="dialogOnSubmit('tranCofigSchedule')">保存</el-button>
                    <el-button type="danger" @click="scheduleVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
    import tranConfigAdd from './tranConfigAdd';
    import tranConfigUpdate from './tranConfigUpdate';
    import tranConfigView from './tranConfigView';
    import tranConfigSchedule from './tranConfigSchedule';

    export default {
        name: 'tranConfigList',
        components: {
            tranConfigAdd,
            tranConfigUpdate,
            tranConfigView,
            tranConfigSchedule
        },
        data() {
            return {
                url: "/loan/tranConfigAction.do?_md=selectForPage",
                addUrl: "/loan/tranConfigAction.do?_md=addConfig",
                deleteUrl: "/loan/tranConfigAction.do?_md=deleteConfig",
                columns: [{
                    prop: "tranCode",
                    label: "交易号"
                }, {
                    prop: "tranName",
                    label: "交易名称"
                }, {
                    prop: "curVers",
                    label: "版本号"
                }, {
                    prop: "tranStatus",
                    label: "交易状态",
                    selectKey: "STD_START_STOP"
                }],
                initParams: {},
                searchParams: {
                    tranCode: '',
                    tranName: '',
                    tranStatus: '',
                },
                tranCode: "",
                jsonData: "",
                curVers: 1,
                tranConfig: {},
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                scheduleVisible: false,
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
                this.tranConfig = {...rows[0]};
                this.updateVisible = true;
            },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.tranConfig = {...rows[0]};
                this.viewVisible = true;
            },
            dialogOnSubmit(dialog) {
                this.$refs[dialog].onSubmit();
            },
            scheduleClick() {
                const rows = this.getSelectRows();
                this.tranCode = rows[0].tranCode;
                this.jsonData = rows[0].jsonRes;
                this.curVers = rows[0].curVers;
                this.scheduleVisible = true;
            }
        }
    }
</script>