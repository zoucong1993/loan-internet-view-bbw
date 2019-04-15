<template>
    <div>
        <el-card class="box-card" shadow="never">
        <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 10px 0">
            <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-edit"
                       @click="addBtn">新增
            </el-button>
            <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="warning" icon="el-icon-edit"
                       @click="updateBtn">修改
            </el-button>
            <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                       @click="deleteBtn">删除
            </el-button>
            <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                       @click="viewBtn">查看
            </el-button>
        </el-row>
        <elx-table ref="table"
                    :url="url"
                    :columns="columns"
                    :initParams="initParams"
                    :searchParams="searchParams"
        >
        </elx-table>
        </el-card>
        <el-dialog title="新增"
                   :visible.sync="addBtnDialog"
                   v-if="addBtnDialog"
                   append-to-body="true"
                   width="70%"
        >
            <msg-model-rel-add @refresh="refreshTable" @closeDialog="addBtnDialog = false" :prdName="prdName" :prdCode="prdNo"></msg-model-rel-add>
        </el-dialog>
        <el-dialog title="修改"
                   :visible.sync="updateBtnDialog"
                   v-if="updateBtnDialog"
                   append-to-body="true"
                   width="70%"
        >
        <msg-model-rel-update :rows="rows" :prdName="prdName" @refresh="refreshTable"  @closeDialog = "updateBtnDialog = false"></msg-model-rel-update>
        </el-dialog>
        <el-dialog title="查看"
                   :visible.sync="viewBtnDialog"
                   v-if="viewBtnDialog"
                   append-to-body="true"
                   width="70%"
        >
        <msg-model-rel-view :prdName="prdName" :rows="rows" @closeDialog="viewBtnDialog = false"></msg-model-rel-view>
        </el-dialog>
    </div>
</template>

<script>

    import msgModelRelAdd from './messageRel/msgModelRelAdd';

    import msgModelRelUpdate from './messageRel/msgModelRelUpdate';

    import msgModelRelView from './messageRel/msgModelRelView';

    export default {
        name: "messageTemplate",
        props:{
            prdNo: String,
            prdName: String,
        },
        components:{
            msgModelRelAdd,
            msgModelRelUpdate,
            msgModelRelView
        },
        data(){
            return {
                url: '/loan/bizMsgModelRelAction.do?_md=selectMsgModelRel',
                columns: [
                    {
                        label: "产品编码",
                        prop: "prdCode",
                    },

                    {
                        label: "产品名称",
                        prop: "prdName",
                    },

                    {
                        label: "使用场景",
                        prop: "msgScene",
                        selectKey: "STD_MSG_SCENE"
                    },

                    {
                        label: "成功短信模板",
                        prop: "sucModelCode",
                    },

                    {
                        label: "失败短信模板",
                        prop: "failModelCode",
                    },

                    {
                        label: "备注",
                        prop: "remark",
                    },
                ],
                initParams: {
                    'prdCode': this.prdNo,
                    'prdName': this.prdName,
                },
                searchParams: {},
                addBtnDialog: false,
                updateBtnDialog: false,
                viewBtnDialog: false,
                rows: {}
            }
        },
        methods:{
            addBtn() {
                this.addBtnDialog = true
            },
            updateBtn() {
                let rows = this.$refs.table.getSelectedRows()
                if (rows.length === 0) {
                    this.$error('请选择一条数据')
                    return
                }
                this.rows = {...rows[0]}
                this.updateBtnDialog = true
            },
            deleteBtn() {
                const _this = this
                let rows = this.$refs.table.getSelectedRows()
                if (rows.length === 0) {
                    this.$error('请选择一条数据')
                    return
                }
                this.$confirm('确定要删除该条数据', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                        this.$http.post(
                            '/loan/bizMsgModelRelAction.do?_md=delMsgModeRel',
                            {'id': rows[0].id}
                        ).then(function (response) {
                                if (response.success) {
                                    _this.$success('修改成功')
                                    _this.refreshTable()
                                } else {
                                    _this.$error('修改成功')
                                }
                            }, function (error) {
                                _this.$error(error.message);
                            })
                    })
            },
            viewBtn() {
                let rows = this.$refs.table.getSelectedRows()
                if (rows.length === 0) {
                    this.$error('请选择一条数据')
                    return
                }
                this.rows = {...rows[0]}
                this.viewBtnDialog = true

            },
            refreshTable(){
                this.$refs.table.refresh()
            }
        }
    }
</script>