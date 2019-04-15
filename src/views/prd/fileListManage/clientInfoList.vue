<template>
    <div>

        <el-card class="box-card" shadow="never">

            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>

        </el-card>
    </div>


</template>

<script>


    export default {
        name: "clientInfoList",
        components: {},
        data() {
            return {
                url: "/loan/cusBaseInfoAction.do?_md=findCustBaseInfoList",
                columns: [
                    {
                    prop: "custNo",
                    label: "客户编号",
                        width:"200"
                }, {
                    prop: "custName",
                    label: "客户名称"
                },
                    {
                    prop: "certType",
                    label: "证件类型",
                        selectKey: 'ENT_CERT_TYPE',
                        width:"150"
                },
                    {
                    prop: "certNo",
                    label: "证件号码",
                        width:"200"
                },
                    {
                        prop: "custOrgName",
                        label: "主管机构"
                    },
                ],
                initParams: {},
                searchParams: {},
                clientInfoList: {},
                addVisible: false,
                updateVisible: false,
                viewVisible: false
            }
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
            handSuccess(response, file, fileList) {

                if (response.success) {
                    this.$notify({
                        title: '成功',
                        message: response.msg,
                        type: 'success'
                    });
                    this.refreshTable();
                } else {
                    this.$notify({
                        title: '失败',
                        message: response.msg,
                        type: 'error'
                    });
                }
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
                    this.$http.post("/loan/blacklistApplyAction.do?_md=deleteBlacklistApplyByPrimaryKey",
                        {"id": id})
                        .then(function (response) {
                            if (response.success) {
                                _self.$success(response.msg);
                                _self.$refs.table.refresh();
                            }
                        }).catch(function (error) {
                        _self.$error(error);
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
                this.clientInfoList = {...rows[0]};
                this.updateVisible = true;
            },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.clientInfoList = {...rows[0]};
                this.viewVisible = true;
            }
        }
    };
</script>