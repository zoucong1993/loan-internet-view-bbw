<template>
    <div>
        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :initParams="initParams"
                   :searchParams="searchParams"
        >
        </elx-table>
    </div>
</template>

<script>
    export default {
        name: "bizCustAccountList",
        props:{
            row: Object
        },
        data(){
            return {
                url: '/loan/bizCustAccountAction.do?_md=selectListByDuebillNo',
                columns:[
                    {
                        label: "账户业务属性",
                        prop: "acctAttr",
                        selectKey: 'STD_PAY_ACCT_ATTR',
                    },

                    {
                        label: "账号",
                        prop: "acctNo",
                    },

                    {
                        label: "户名",
                        prop: "acctName",
                    },

                    {
                        label: "开户行行名",
                        prop: "openOrgName",
                    },

                    {
                        label: "开户行行号",
                        prop: "openOrgNo",
                    },

                    {
                        label: "支付金额",
                        prop: "payAmt",
                    }
                ],
                initParams:{
                    'duebillNo': this.row.duebillNo
                },
                searchParams:{},
            }
        },
        created(){
          console.info(this.row)
        },
        methods:{
        }
    }
</script>
