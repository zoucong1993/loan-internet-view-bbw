<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'chanCode':'渠道编码',
                                           'chanName':'渠道名称',
                                           'chanType':{
                                                'label':'渠道类型',
                                                'component':'elx-select',
                                                'selectKey':'STD_LYQD'
                                           }
                                           }]"
        >
        </elx-search-card>
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
                    width="60%"
                    :close-on-click-modal="false">
                <channel-add @skipUpdate="skipUpdate" @refreshTable="refreshTable"
                             @closeDialog="addVisible = false"></channel-add>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="60%">
                <channel-update
                        :channel="channel"
                        :chanCode="chanCode"
                        :chanName="chanName"
                        @closeDialog="updateVisible = false"
                ></channel-update>
            </el-dialog>

            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%">
                <channel-view
                        :channel="channel"
                        :chanCode="chanCode"
                        @closeDialog="viewVisible = false"
                ></channel-view>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>

    import channelAdd from './channelAdd.vue';
    import channelUpdate from './channelUpdate.vue';
    import channelView from './channelView.vue';

    export default {
        name: 'channelList',
        components: {
            channelAdd,
            channelUpdate,
            channelView
        },
        data() {
            return {
                url: "/loan/channelAction.do?_md=selectForPage",
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                columns: [{
                    prop: "chanCode",
                    label: "渠道编码"
                }, {
                    prop: "chanName",
                    label: "渠道名称"
                }, {
                    prop: "chanType",
                    label: "渠道类型",
                    selectKey: "STD_LYQD"
                }, {
                    prop: "sts",
                    label: "渠道状态",
                    selectKey: "STD_QDSNZT"
                }, {
                    prop: "remark",
                    label: "备注"
                }],
                searchParams: {},
                channel: {},
                chanCode: "",
                chanName: "",
                initParams: {}
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
            skipUpdate(data, chanCode) {
                this.channel = data;
                this.chanCode = chanCode;
                this.updateVisible = true;
            },
            updateData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.channel = {...rows[0]};
                this.chanCode = rows[0].chanCode;
                this.chanName = rows[0].chanName;
                this.updateVisible = true;
            },
            viewData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.channel = {...rows[0]};
                this.chanCode = rows[0].chanCode;
                this.viewVisible = true;
            },
            deleteData() {

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
                    let chanCode = rows[0].chanCode;
                    this.$http.post("/loan/channelAction.do?_md=deleteChannelDetail",
                        {"id": id, "chanCode": chanCode})
                        .then(function (response) {
                            if (response.success) {
                                _self.$success(response.msg);
                                _self.$refs.table.refresh();
                            }
                        }).catch(function (error) {
                        _self.$error(error.message);
                    })
                }).catch(() => {
                    return false;
                })

            }
        }
    };
</script>