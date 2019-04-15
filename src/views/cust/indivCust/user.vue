<template>

        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :initParams="initParams"
                   :searchParams="searchParams"
                   :checkbox="false"
        >
        </elx-table>

</template>
<script>
    export default {
        name: 'userList',
        data() {
            return {
                url: "/loan/userAction.do?_md=findUserList",
                columns: [{
                    prop: "userName",
                    label: "登录名称"
                }, {
                    prop: "empName",
                    label: "用户名称"
                }, {
                    prop: "mobilePhone",
                    label: "电话"
                }, {
                    prop: "certNo",
                    label: "证件号码"
                }, {
                    prop: "marryStatus",
                    label: "婚姻状态",
                    selectKey: 'STD_ZB_MARITAL_STATUS'
                }],
                searchParams: {},
                initParams: {},
                row: {}
            }
        },
        mounted: function () {
        },
        methods: {
            getSelectRows() {
               return this.$refs.table.getSelectedRows()[0];
            }
        }
    };
</script>