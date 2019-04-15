<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="success" icon="el-icon-plus" @click="addVisible = true" v-if="!view">新增
                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteData" v-if="!view">删除
                </el-button>
                <el-button size="mini" type="info" icon="el-icon-edit" @click="updateData" v-if="!view">修改</el-button>
                <el-button size="mini" type="primary" icon="el-icon-view" @click="viewData">查看</el-button>
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
                    append-to-body
                    width="60%">
                <channel-prd-rel-add
                        @refreshTable="refreshTable"
                        @closeDialog="addVisible = false"
                        :chanCode="chanCode" :chanName="chanName"></channel-prd-rel-add>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    append-to-body
                    width="60%">
                <channel-prd-rel-update
                        :channelPrdRel="channelPrdRel"
                        @refreshTable="refreshTable"
                        @closeDialog="updateVisible = false"></channel-prd-rel-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    append-to-body
                    width="60%">
                <channel-prd-rel-view
                        :channelPrdRel="channelPrdRel" @closeDialog="viewVisible = false"
                ></channel-prd-rel-view>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>

    import channelPrdRelAdd from './channelPrdRelAdd.vue';
    import channelPrdRelUpdate from './channelPrdRelUpdate.vue';
    import channelPrdRelView from './channelPrdRelView.vue';

    export default {
        name: 'channelPrdRelList',
        props: {
            view: {
                default: false
            },
            chanCode: String,
            chanName: String,
            productNo: String,
        },
        components: {
            channelPrdRelAdd,
            channelPrdRelUpdate,
            channelPrdRelView
        },
        data() {
            return {
                url: "/loan/channelAction.do?_md=selectPrdRelForPage",
                addVisible: false,
                updateVisible: false,
                viewVisible: false,
                columns: [{
                    prop: "chanName",
                    label: "渠道名称"
                }, {
                    prop: "productName",
                    label: "产品名称"
                }, {
                    prop: "sts",
                    label: "状态",
                    selectKey: 'STD_PRD_STATE'
                }, {
                    prop: "remark",
                    label: "备注"
                }],
                searchParams: {},
                channelPrdRel: {
                    "prdCode": this.productNo
                },
                initParams: {
                    "chanCode": this.chanCode,
                    "prdCode": this.productNo
                }
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
            updateData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.channelPrdRel = {...rows[0]};
                this.updateVisible = true;
            },
            viewData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.channelPrdRel = {...rows[0]};
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
                    this.$http.post("/loan/channelAction.do?_md=deleteChanPrdRelDetail",
                        {"id": id})
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