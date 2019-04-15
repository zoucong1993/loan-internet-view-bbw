<template>
    <div>
        <el-form ref="viewForm" :model="viewForm" label-width="120px" disabled>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="客户编号" prop="custNo">
                        <el-input v-model="viewForm.custNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户姓名" prop="custName">
                        <el-input v-model="viewForm.custName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="申请编号" prop="applyNo">
                        <el-input v-model="viewForm.applyNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品名称" prop="prdCode">
                        <elx-select-tree v-model="viewForm.prdCode" :url="selectPrdTreeUrl"></elx-select-tree>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="申请类型" prop="applyType">
                        <elx-select v-model="viewForm.applyType" selectKey="STD_ZB_APP_TYPE"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请金额(元)" prop="applyAmt">
                        <el-input v-model="viewForm.applyAmt"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="币种" prop="ccy">
                        <elx-select v-model="viewForm.ccy" selectKey="STD_ZX_CUR_TYPE"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请期限" prop="applyTerm">
                        <el-input v-model="viewForm.applyTerm"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="利率类型" prop="rateType">
                        <elx-select v-model="viewForm.rateType" selectKey="STD_RATE_TYPE"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="执行利率" prop="actualRate">
                        <el-input v-model="viewForm.actualRate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="担保方式" prop="grtType">
                        <elx-select v-model="viewForm.grtType" selectKey="STD_ZB_ASSURE_MEANS"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="审批状态" prop="approveSts">
                        <elx-select v-model="viewForm.approveSts" selectKey="WF_SP_STATUS"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="20">
                    <el-form-item label="贷款用途" prop="loanUse">
                        <elx-select v-model="viewForm.loanUse" selectKey="STD_ZB_DKYT"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="主原因" prop="firstReason">
                        <el-input v-model="viewForm.firstReason"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="子原因" prop="secondReason">
                        <el-input v-model="viewForm.secondReason"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="外部申请编号" prop="extApplyNo">
                        <el-input v-model="viewForm.extApplyNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="渠道编码" prop="chanCode">
                        <el-input v-model="viewForm.chanCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="法人编码" prop="bankCode">
                        <el-input v-model="viewForm.bankCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="viewForm.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="管户经理" prop="custMgr">
                        <el-input v-model="viewForm.custMgrName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="管户机构" prop="custOrg">
                        <el-input v-model="viewForm.custOrgName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div align="center" style="margin-top: 15px;">
            <el-button type="danger" @click="onCancel">关闭</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'creditApplyView',
        props: {
            creditApply: {}
        },
        data() {
            return {
                selectPrdTreeUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                viewForm: this.creditApply,
            }
        },
        methods: {
            onCancel() {
                this.$emit('closeDialog');
            }
        }
    };
</script>