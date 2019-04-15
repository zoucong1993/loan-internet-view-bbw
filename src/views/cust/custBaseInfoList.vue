<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编号',
                                           'custName':'客户名称',
                                           'certNo':'证件号码'
                                           }]"
        >
        </elx-search-card>
        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :checkbox=false
                   :initParams="initParams"
                   :searchParams="searchParams"
        >
        </elx-table>
        <div align="center" style="margin-top: 10px;">
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </div>
</template>
<script>

    export default {
        name: "custBaseInfoList",
        components: {},
        data() {
            return {
                url: "/loan/cusBaseInfoAction.do?_md=findCusBaseInfoList",
                columns: [{
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "certType",
                    label: "证件类型",
                    selectKey: 'STD_ZJLX'
                }, {
                    prop: "certNo",
                    label: "证件编号"
                }, {
                    prop: "custMgr",
                    label: "主管经理",
                }, {
                    prop: "custOrg",
                    label: "主管机构",
                }],
                searchParams: {},
                initParams: {}
            };
        },
        methods: {
            searchItem: function () {
                this.$refs.table.search();
            },
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            onSubmit() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.$emit('getRows', rows[0]);
            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            }
        }
    };
</script>