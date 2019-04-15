<template>
    <el-tabs v-model="indivCustWorkInfoTab" @tab-click="handleClick">
        <el-tab-pane label="客户工作信息" name="first">
            <cust-work-info :custNo="custNo" :operate="operate1"></cust-work-info>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import custWorkInfo from './indivCustWorkInfoUpdate';

    export default {
        name: "indivCustContactInfoTab",
        components: {
            'cust-work-info': custWorkInfo,
        },
        data() {
            return {
                indivCustWorkInfoTab: 'first',
                operate1:this.operate
            };
        },
        props:{
            custNo:String,
            operate:String
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>