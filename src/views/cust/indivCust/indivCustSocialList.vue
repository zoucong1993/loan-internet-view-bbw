<template>
    <div>
        <el-card class="box-card" shadow="never">
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
                       :checkbox="false"
            >
            </elx-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'indivCustSocialList',
        props: {
            custNo:String,
            operate:String,
        },
        data() {
            return {
                url: "/loan/bizCusIndivSocialAction.do?_md=selectByCustNo",
                columns: [
                    {
                    prop: "applyNo",
                    label: "业务编号"
                }, {
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户名称"
                }, {
                    prop: "relCustType",
                    label: "与客户关系",
                    selectKey: 'STD_CUS_REL'
                }, {
                    prop: "relCustNo",
                    label: "关联客户编号"
                }, {
                    prop: "relCustName",
                    label: "关联客户名称"
                }, {
                    prop: "relCustPhone",
                    label: "关联客户电话"
                }, {
                    prop: "familyMemary",
                    label: "是否家庭成员",
                    selectKey: 'STD_YES_NO'
                }, {
                    prop: "mgrType",
                    label: "高管类别",
                    selectKey: 'STD_MGR_TYPE'
                }, {
                    prop: "createTime",
                    label: "登记日期"
                }],
                searchParams: {},
                initParams: {
                    'custNo':this.custNo
                },
            };
        },

    };
</script>
