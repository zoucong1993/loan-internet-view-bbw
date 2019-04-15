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
        name: 'listBatchErrorView',
        props: {
            batchNo: String
        },
        components: {
        },
        data() {
            return {
                url: "/loan/listBatchAction.do?_md=selectErrorForPage",
                columns: [{
                    prop: "batchNo",
                    label: "批次编号"
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "certType",
                    label: "证件类型"
                }, {
                    prop: "certNo",
                    label: "证件号码"
                }, {
                    prop: "remark",
                    label: "备注"
                }],
                initParams: {batchNo:this.batchNo},
                searchParams: {}
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
            }
        }
    };
</script>