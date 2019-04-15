<template>
    <div style="height:720px;">
        <el-tabs v-model="productInfoTabs" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <prd-base-info :productNo="productNo1" :operate="operate1" @closeDialog="closeDia"></prd-base-info>
            </el-tab-pane>
            <el-tab-pane label="核心产品" name="second">
                <prdCorePrdConf-list :productNo="productNo1" :operate="operate1"></prdCorePrdConf-list>
            </el-tab-pane>
            <!--<el-tab-pane label="还款方式" name="third">-->
                <!--<prd-repay-list :productNo="productNo" :operate="operate1"></prd-repay-list>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="机构" name="fourth">-->
            <!--<prd-org-list :productNo="productNo1" :operate="operate1"></prd-org-list>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="渠道" name="third">
                <prd-channel-list :productNo="productNo1" :view="true"></prd-channel-list>
            </el-tab-pane>
            <el-tab-pane label="合同" name="fourth">
                <prd-contract-list :productNo="productNo1" :operate="operate1"></prd-contract-list>
            </el-tab-pane>
            <el-tab-pane label="产品期限配置" name="fifth">
                <prdTermOption-list :productNo="productNo1" :operate="operate1" :productName="productName1"></prdTermOption-list>
            </el-tab-pane>
            <el-tab-pane label="短信模板" name="sixth">
                <message-template :prdNo="productNo" :prdName="productName"></message-template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import productBaseInfoUpdate from './productBaseInfoUpdate';
    import prdRepayRelList from '../repayMode/prdTermRepayModeList';
    import prdOrgRelList from '../prdOrgRel/prdOrgRelList';
    import prdContactRelList from '../prdContractRel/prdContactRelList';
    import channelPrdRelList from '@/views/biz/cus/channelPrdRelList';
    import prdCorePrdConfList from '../prdCorePrdConf/prdCorePrdConfList';
    import prdTermOptionList from '../prdTermOption/prdTermOptionList';
    import messageTemplate from './messageTemplate';
    export default {
        name: "productInfoTabs",
        components: {
            'prd-base-info': productBaseInfoUpdate,
            'prd-repay-list': prdRepayRelList,
            'prd-org-list': prdOrgRelList,
            'prd-contract-list': prdContactRelList,
            'prd-channel-list': channelPrdRelList,
            'prdCorePrdConf-list': prdCorePrdConfList,
            'prdTermOption-list': prdTermOptionList,
            'message-template': messageTemplate,
        },
        data() {
            return {
                productInfoTabs: 'first',
                operate1: this.operate,
                productNo1: this.productNo,
                productName1: this.productName
            };
        },
        props: {
            productNo: String,
            productName: String,
            operate: String
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            closeDia() {
                this.$emit('refreshTable');
                this.$emit('closeDialog');
            }
        }
    };
</script>