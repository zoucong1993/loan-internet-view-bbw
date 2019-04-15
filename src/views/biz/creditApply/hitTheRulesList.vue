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
        name: "hitTheRulesList",
        props:{
            id: '',
        },
        components: {},
        data(){
            return {
                url:'/loan/hitRuleAction.do?_md=selectInfoByInfoId',
                columns:[{
                    prop: "infoId",
                    label: "接口申请编号",
                }, {
                    prop: "ruleId",
                    label: "规则编号",
                }, {
                    prop: "ruleName",
                    label: "规则名称",
                }, {
                    prop: "ruleWeight",
                    label: "规则权重",
                }],
                initParams:{
                    'infoId': this.id
                },
                searchParams:{},
            }
        }
    }
</script>
