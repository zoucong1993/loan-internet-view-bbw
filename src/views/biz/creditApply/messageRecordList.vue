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
        name: "messageRecordList",
        props:{
            creditApply:Object,
        },
        data(){
            return {
                url: '/loan/bizMsgSendRecordAction.do?_md=selectListByBizKey',
                columns:[
                    {
                        prop: "custName",
                        label: "客户名称"
                    },

                    {
                        prop: "mobile",
                        label: "手机号码"
                    },

                    {
                        prop: "msgContent",
                        label: "短信内容"
                    },

                    {
                        prop: "sendTime",
                        label: "发送时间"
                    },

                    {
                        prop: "sendNum",
                        label: "发送次数"
                    },

                    {
                        prop: "sts",
                        label: "发送状态",
                        selectKey: "STD_DXZT",
                    },

                    {
                        prop: "remark",
                        label: "备注"
                    },
                ],
                initParams:{
                    'bizKey': this.creditApply.applyNo,
                    'msgScene': '02',
                },
                searchParams:{},

            }
        },
    }
</script>
