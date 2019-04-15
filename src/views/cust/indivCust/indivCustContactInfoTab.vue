<template>
    <el-tabs v-model="indivCustContactInfoTab" @tab-click="handleClick">
        <el-tab-pane label="客户联系信息" name="first">
            <indivCustSocialList :custNo="custNo" :operate="operate"></indivCustSocialList>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import indivCustSocialList from './indivCustSocialList';

    export default {
        name: "indivCustContactInfoTab",
        props: {
            custNo:String,
            operate:String,
        },
        components: {
             indivCustSocialList,
        },
        data() {
            return {
                indivCustContactInfoTab: 'first',
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