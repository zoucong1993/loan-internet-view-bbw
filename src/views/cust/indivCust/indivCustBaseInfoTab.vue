<template>
    <el-tabs v-model="indivCustBaseInfoTab" @tab-click="handleClick">
        <el-tab-pane label="客户概况信息" name="first">
            <cust-base-info ref="indivCustBaseInfoUpdateForm" :custNo="custNo1" :operate="operate1"></cust-base-info>
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button type="primary" @click="submitForm('indivCustBaseInfoUpdateForm')">保 存</el-button>-->
            <!--</span>-->
        </el-tab-pane>
        <el-tab-pane label="客户基本信息" name="second">
            <cust-info ref="indivCustUpdateForm" :custNo="custNo1" :operate="operate1"></cust-info>
            <!--<span slot="footer" class="dialog-footer"  v-if="operate === 'update'">-->
                <!--<el-button type="primary" @click="submitForm('indivCustUpdateForm')">保 存</el-button>-->
            <!--</span>-->
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import custBaseInfo from './indivCustBaseInfoUpdate';
    import custInfo from './indivCustInfoUpdate';

    export default {
        name: "indivCustBaseInfoTab",
        components: {
            'cust-base-info': custBaseInfo,
            'cust-info': custInfo
        },
        props:{
            custNo:String,
            operate:String
        },
        data() {

            return {
                indivCustBaseInfoTab: 'first',
                custNo1:this.custNo,
                operate1:this.operate

            };
        },
        methods: {
            // submitForm(formName){
            //     this.$refs[formName].submitForm();
            // },
            handleClick(tab, event) {

            }
        }
    };
</script>