<template>
    <el-form :model="loanContractViewForm" :rules="rules" ref="loanContractViewForm"
             label-width="140px">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <!--<el-col :span="8">
                        <el-form-item label="合同编号" prop="contNo">
                            <el-tooltip class="item" effect="dark" :content="loanContractViewForm.contNo" placement="top">
                                <el-input v-model="loanContractViewForm.contNo" :disabled="true" size="mini"></el-input>
                            </el-tooltip>
                        </el-form-item>
                    </el-col>-->
                    <!--<el-col :span="8">
                        <el-form-item label="业务编号" prop="applyNo">
                            <el-input v-model="loanContractViewForm.applyNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>-->
                    <el-col :span="8">
                        <el-form-item label="合同编号" prop="contNo">
                            <el-input v-model="loanContractViewForm.contNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="业务类型" prop="bizType">
                            <elx-select v-model="loanContractViewForm.bizType" selectKey="STD_FSLX"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户编号" prop="custNo">
                            <el-input v-model="loanContractViewForm.custNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="客户名称" prop="custName">
                            <el-input v-model="loanContractViewForm.custName" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品名称" prop="prdCode">
                            <elx-select-tree v-model="loanContractViewForm.prdCode" :url="selectPrdUrl" :disabled="true"
                                             size="mini"></elx-select-tree>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同期限" prop="term">
                            <el-input v-model="loanContractViewForm.term" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="合同期限类型" prop="termType">
                            <elx-select v-model="loanContractViewForm.termType" selectKey="TERM_UNIT"
                                        :disabled="true"
                                        size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="模版编号" prop="modelNo">
                            <el-input v-model="loanContractViewForm.modelNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同状态" prop="contSts">
                            <elx-select v-model="loanContractViewForm.contSts" selectKey="STD_ZB_CTRLOANCONT_TYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="借据编号" prop="duebillNo">
                            <el-input v-model="loanContractViewForm.duebillNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="原合同编号" prop="oriContNo">
                            <el-input v-model="loanContractViewForm.oriContNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="文本合同编号" prop="textContNo">
                            <el-input v-model="loanContractViewForm.textContNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="合同地址" prop="contUrl">
                            <el-input v-model="loanContractViewForm.contUrl" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="贷款用途" prop="loanUse">
                            <elx-select v-model="loanContractViewForm.loanUse" selectKey="LOAN_USE"
                                        :disabled="true"
                                        size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同币种" prop="ccy">
                            <elx-select v-model="loanContractViewForm.ccy" selectKey="STD_CCY_TYPE" :disabled="true"
                                        size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="还款方式" prop="repayMode">
                            <elx-select v-model="loanContractViewForm.repayMode" selectKey="STD_REPAY_METHOD"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="支付方式" prop="payMode">
                            <elx-select v-model="loanContractViewForm.payMode" selectKey="STD_IQP_PAY_TYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="风险分类" prop="riskClass">
                            <elx-select v-model="loanContractViewForm.riskClass" selectKey="STD_FXDJ" :disabled="true"
                                        size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="协议编号" prop="agrNo">
                            <el-input v-model="loanContractViewForm.agrNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="担保方式" prop="grtType">
                            <elx-select v-model="loanContractViewForm.grtType" selectKey="STD_ZB_ASSURE_MEANS"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="还款日" prop="repayDay">
                            <el-input v-model="loanContractViewForm.repayDay" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">

                    <!--<el-col :span="8">
                        <el-form-item label="还款间隔" prop="repayInterval">
                            <el-input v-model="loanContractViewForm.repayInterval" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>-->
                    <!--<el-col :span="8">
                        <el-form-item label="还款间隔单位" prop="repayIntervalUnit">
                            <elx-select v-model="loanContractViewForm.repayIntervalUnit" selectKey="REPAY_TERM_UNIT"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>-->
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="签署状态" prop="signSts">
                            <elx-select v-model="loanContractViewForm.signSts" selectKey="STD_QSZT" :disabled="true"
                                        size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="8">
                        <el-form-item label="渠道编码" prop="chanCode">
                            <el-input v-model="loanContractViewForm.chanCode" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>-->
                    <el-col :span="8">
                        <el-form-item label="法人编码" prop="bankCode">
                            <el-input v-model="loanContractViewForm.bankCode" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">

                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="loanContractViewForm.remark" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>额度信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="合同金额" prop="contAmt">
                            <el-input v-model="loanContractViewForm.contAmt" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同余额" prop="contBalance">
                            <el-input v-model="loanContractViewForm.contBalance" :disabled="true"
                                      size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="借据余额" prop="duebillBalance">
                            <el-input v-model="loanContractViewForm.duebillBalance" :disabled="true"
                                      size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>利率信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="利率标志" prop="rateType">
                            <elx-select v-model="loanContractViewForm.rateType" selectKey="STD_RATE_FLAG"
                                        :disabled="true"
                                        size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="基准利率" prop="baseRate">
                            <el-input v-model="loanContractViewForm.baseRate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="执行利率" prop="actualRate">
                            <el-input v-model="loanContractViewForm.actualRate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="利率调整方式" prop="intAdjustType">
                            <elx-select v-model="loanContractViewForm.intAdjustType"
                                        selectKey="STD_IR_ADJUST_TYPE" :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="利率浮动方式" prop="intFloatType">
                            <elx-select v-model="loanContractViewForm.intFloatType"
                                        selectKey="STD_RATE_FLOAT_TYPE" :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="利率浮动值" prop="intFloat">
                            <el-input v-model="loanContractViewForm.intFloat" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">

                    <el-col :span="8">
                        <el-form-item label="逾期利率浮动方式" prop="overIntFloatType">
                            <elx-select v-model="loanContractViewForm.overIntFloatType"
                                        selectKey="STD_RATE_FLOAT_TYPE" :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="逾期利率浮动值" prop="overIntFloat">
                            <el-input v-model="loanContractViewForm.overIntFloat" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="计息周期" prop="intCalCycle">
                            <el-input v-model="loanContractViewForm.intCalCycle" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>日期信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="合同签订日期" prop="contSignDate">
                            <el-input v-model="loanContractViewForm.contSignDate" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同起始日期" prop="contBeginDate">
                            <el-input v-model="loanContractViewForm.contBeginDate" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同到期日期" prop="contEndDate">
                            <el-input v-model="loanContractViewForm.contEndDate" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="合同注销日期" prop="contCancelDate">
                            <el-input v-model="loanContractViewForm.contCancelDate" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="免息天数" prop="intFreeDays">
                            <el-input v-model="loanContractViewForm.intFreeDays" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>登记信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="客户经理" prop="custMgrName">
                            <el-input v-model="loanContractViewForm.custMgrName" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="受理机构" prop="custOrgName">
                            <el-input v-model="loanContractViewForm.custOrgName" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入账机构" prop="finaOrg">
                            <el-input v-model="loanContractViewForm.finaOrg" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </el-form>
</template>
<script>
    export default {
        name: 'loanContractOrgChange',
        props: {
            row: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {
                loanContractViewForm: this.row,
                rules: {},
                selectPrdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
            };
        },
        mounted: function () {
            this.initForm();
        },
        methods: {
            initForm() {
                this.loanContractViewForm.duebillBalance = this.$moneyUtil.thousandsChange(this.loanContractViewForm.duebillBalance);
                this.loanContractViewForm.contAmt = this.$moneyUtil.thousandsChange(this.loanContractViewForm.contAmt);
                this.loanContractViewForm.contBalance = this.$moneyUtil.thousandsChange(this.loanContractViewForm.contBalance);
            }
        }
    };
</script>