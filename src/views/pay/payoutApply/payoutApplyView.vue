<template>
    <el-form ref="viewPayoutApplyForm" :model="viewPayoutApplyForm" label-width="120px" size="small" disabled>
        <el-row type="flex" class="row-bg">
            <el-col :span="10">
                <el-form-item label="业务编号" prop="payoutNo">
                    <el-input v-model="viewPayoutApplyForm.payoutNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="产品编号" prop="prdCode">
                    <elx-select-tree v-model="viewPayoutApplyForm.prdCode" :url="selectPrdUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="客户编号" prop="custNo">
                    <el-input v-model="viewPayoutApplyForm.custNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="客户名称" prop="custName">
                    <el-input v-model="viewPayoutApplyForm.custName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="合同编号" prop="contNo">
                    <el-input v-model="viewPayoutApplyForm.contNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="借据编号" prop="duebillNo">
                    <el-input v-model="viewPayoutApplyForm.duebillNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="出账金额" prop="payAmt">
                    <el-input v-model="viewPayoutApplyForm.payAmt">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="币种" prop="ccy">
                    <elx-select v-model="viewPayoutApplyForm.ccy" selectKey="STD_CCY_TYPE"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="期限" prop="term">
                    <el-input v-model="viewPayoutApplyForm.term"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="期限类型" prop="termType">
                    <elx-select v-model="viewPayoutApplyForm.termType" selectKey="CREDIT_TERM_UNIT"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="利率类型" prop="rateType">
                    <elx-select v-model="viewPayoutApplyForm.rateType" selectKey="STD_RATE_FLAG"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="执行利率" prop="actualRate">
                    <el-input v-model="viewPayoutApplyForm.actualRate"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="放款日" prop="transDate">
                    <el-input v-model="viewPayoutApplyForm.transDate"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="到期日" prop="sts">
                    <elx-select v-model="viewPayoutApplyForm.Maturity" selectKey="STD_FKZT"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="交易时间" prop="transDate">
                    <el-input v-model="viewPayoutApplyForm.transTime"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="放款状态" prop="sts">
                    <elx-select v-model="viewPayoutApplyForm.sts" selectKey="STD_FKZT"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="是否节假日顺延" prop="holidayDelay">
                    <elx-select v-model="viewPayoutApplyForm.holidayDelay" selectKey="SF"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="还款方式" prop="repayMode">
                    <elx-select v-model="viewPayoutApplyForm.repayMode" selectKey="STD_REPAY_METHOD"></elx-select>
                </el-form-item>
            </el-col>

        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="受理机构" prop="custOrg">
                    <elx-select-tree v-model="viewPayoutApplyForm.custOrg" :url="selectOrgUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form-item label="客户经理" prop="custMgr">
                    <elx-select-tree v-model="viewPayoutApplyForm.custMgrName" :url="selectOrgUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10" :offset="2" :pull="2">
                <el-form-item label="入账机构" prop="finaOrg">
                    <elx-select-tree v-model="viewPayoutApplyForm.finaOrg" :url="selectOrgUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: 'payoutApplyView',
        props: {
            row: Object,
            viewPayoutApplyUrl: String,
        },
        data() {
            return {
                viewPayoutApplyForm: this.row,
                selectPrdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                selectOrgUrl: '/loan/orgAction.do?_md=findAllVueTree',
            }
        },
        methods: {
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            }
        }
    }
</script>