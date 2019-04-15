<template>
    <el-form :model="duebillViewForm" ref="duebillViewForm"
             label-width="140px">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="借据编号" prop="duebillNo">
                            <el-input v-model="duebillViewForm.duebillNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="放款编号" prop="payoutNo">
                            <el-input v-model="duebillViewForm.payoutNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同编号" prop="contNo">
                            <el-input v-model="duebillViewForm.contNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品名称" prop="productName">
                            <el-input v-model="duebillViewForm.productName" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="客户编号" prop="custNo">
                            <el-input v-model="duebillViewForm.custNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称" prop="custName">
                            <el-input v-model="duebillViewForm.custName" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="币种" prop="ccy">
                            <elx-select v-model="duebillViewForm.ccy" selectKey="STD_CCY_TYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="期限" prop="term">
                            <el-input v-model="duebillViewForm.term" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="期限类型" prop="termType">
                            <elx-select v-model="duebillViewForm.termType" selectKey="TERM_UNIT"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="展期次数" prop="extendTimes">
                            <el-input v-model="duebillViewForm.extendTimes" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="担保方式" prop="grtType">
                            <elx-select v-model="duebillViewForm.grtType" selectKey="STD_ZB_ASSURE_MEANS"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出账方式" prop="payoutType">
                            <elx-select v-model="duebillViewForm.payoutType" selectKey="STD_ZB_PUTOUT_TYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="风险分类" prop="riskClassify">
                            <elx-select v-model="duebillViewForm.riskClassify" selectKey="STD_FIVE_CLASS"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="人工风险分类结果" prop="manRiskClassify">
                            <elx-select v-model="duebillViewForm.manRiskClassify" selectKey="STD_FIVE_CLASS"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="风险分类时间" prop="riskClassTime">
                            <el-input v-model="duebillViewForm.riskClassTime" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="不良资产标志" prop="npaFlag">
                            <elx-select v-model="duebillViewForm.npaFlag" selectKey="STD_ZB_ASSET_REGI_STATUS"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="不良资产管理员" prop="npaUser">
                            <el-input v-model="duebillViewForm.npaUser" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="不良资产管理机构" prop="npaOrg">
                            <el-input v-model="duebillViewForm.npaOrg" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="贷款形态" prop="bizSts">
                            <elx-select v-model="duebillViewForm.bizSts" selectKey="STD_DKXT" :disabled="true"
                                        size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="贷款状态" prop="loanAccSts">
                            <elx-select v-model="duebillViewForm.loanAccSts" selectKey="STD_DKZT"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="冲正标志" prop="reverseFlag">
                            <elx-select v-model="duebillViewForm.reverseFlag" selectKey="STD_CZ_FLAG"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结清标志" prop="payoffFlag">
                            <elx-select v-model="duebillViewForm.payoffFlag" selectKey="STD_JQBZ"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="年份" prop="acctYear">
                            <el-input v-model="duebillViewForm.acctYear" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="月份" prop="acctMonth">
                            <el-input v-model="duebillViewForm.acctMonth" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="日期" prop="acctDate">
                            <el-input v-model="duebillViewForm.acctDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="渠道号" prop="chanCode">
                            <el-input v-model="duebillViewForm.chanCode" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="法人编码" prop="bankCode">
                            <el-input v-model="duebillViewForm.bankCode" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="管户机构" prop="custOrg">
                            <el-input v-model="duebillViewForm.custOrg" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="账务机构" prop="finaOrg">
                            <el-input v-model="duebillViewForm.finaOrg" :disabled="true" size="mini"></el-input>
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
                        <el-form-item label="发放日期" prop="payoutDate">
                            <el-input v-model="duebillViewForm.payoutDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="到期日期" prop="endDate">
                            <el-input v-model="duebillViewForm.endDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="原到期日期" prop="oriEndDate">
                            <el-input v-model="duebillViewForm.oriEndDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="还款日" prop="repayDay">
                            <el-input v-model="duebillViewForm.repayDay" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="首期还款日" prop="firRepayDate">
                            <el-input v-model="duebillViewForm.firRepayDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="核销日期" prop="cancelDate">
                            <el-input v-model="duebillViewForm.cancelDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="结清日期" prop="payoffDate">
                            <el-input v-model="duebillViewForm.payoffDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="本金逾期日期" prop="overdueDate">
                            <el-input v-model="duebillViewForm.overdueDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="利息逾期日期" prop="intOverDate">
                            <el-input v-model="duebillViewForm.intOverDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="转垫款日" prop="paidDate">
                            <el-input v-model="duebillViewForm.paidDate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="本期到期日" prop="curRepayDate">
                            <el-input v-model="duebillViewForm.curRepayDate" :disabled="true" size="mini"></el-input>
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
                        <el-form-item label="基准年利率" prop="baseRate">
                            <el-input v-model="duebillViewForm.baseRate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="利率调整方式" prop="intAdjustType">
                            <elx-select v-model="duebillViewForm.intAdjustType" selectKey="STD_IR_ADJUST_TYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="利率浮动方式" prop="intFloatType">
                            <elx-select v-model="duebillViewForm.intFloatType" selectKey="STD_RATE_FLOAT_TYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="利率浮动比" prop="intFloatRate">
                            <el-input v-model="duebillViewForm.intFloatRate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="利率浮动点数" prop="intFloatPoint">
                            <el-input v-model="duebillViewForm.intFloatPoint" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="利率标志" prop="rateType">
                            <elx-select v-model="duebillViewForm.rateType" selectKey="STD_RATE_FLAG"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="执行利率" prop="actualRate">
                            <el-input v-model="duebillViewForm.actualRate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="逾期利率" prop="overRate">
                            <el-input v-model="duebillViewForm.overRate" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="违约利率" prop="defRate">
                            <el-input v-model="duebillViewForm.defRate" :disabled="true" size="mini"></el-input>
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
                        <el-form-item label="贷款金额" prop="loanAmt">
                            <el-input v-model="duebillViewForm.loanAmt" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="贷款余额" prop="loanBalance">
                            <el-input v-model="duebillViewForm.loanBalance" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="正常余额" prop="normalBalance">
                            <el-input v-model="duebillViewForm.normalBalance" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="逾期余额" prop="overdueBalance">
                            <el-input v-model="duebillViewForm.overdueBalance" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="呆滞余额" prop="deadBalance">
                            <el-input v-model="duebillViewForm.deadBalance" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="呆账余额" prop="badBalance">
                            <el-input v-model="duebillViewForm.badBalance" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="复利余额" prop="compIntBalance">
                            <el-input v-model="duebillViewForm.compIntBalance" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="贷款减值准备金额" prop="lossReserve">
                            <el-input v-model="duebillViewForm.lossReserve" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>利息信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="表内欠息" prop="innerOweInt">
                            <el-input v-model="duebillViewForm.innerOweInt" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="表外欠息" prop="outOweInt">
                            <el-input v-model="duebillViewForm.outOweInt" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="应收利息累计" prop="recIntAccum">
                            <el-input v-model="duebillViewForm.recIntAccum" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="实收利息累计" prop="paidIntAccum">
                            <el-input v-model="duebillViewForm.paidIntAccum" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="逾期本息合计" prop="overAllBalance">
                            <el-input v-model="duebillViewForm.overAllBalance" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="计息周期" prop="intCalCycle">
                            <el-input v-model="duebillViewForm.intCalCycle" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="利息合计" prop="intTotal">
                            <el-input v-model="duebillViewForm.intTotal" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="停息标志" prop="intStop">
                            <elx-select v-model="duebillViewForm.intStop" selectKey="" :disabled="true"
                                        size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>账号信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="放款账号" prop="payAccount">
                            <el-input v-model="duebillViewForm.payAccount" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="扣款账号交易类型" prop="repayAccType">
                            <elx-select v-model="duebillViewForm.repayAccType" selectKey="HKJYLX"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="核心贷款账号" prop="loanAcctNo">
                            <el-input v-model="duebillViewForm.loanAcctNo" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="放款账户户名" prop="payAccName">
                            <el-input v-model="duebillViewForm.payAccName" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="放款人开户行名称" prop="payAccBankName">
                            <el-tooltip class="item" effect="dark" :content="duebillViewForm.payAccBankName" placement="top">
                                <el-input v-model="duebillViewForm.payAccBankName" :disabled="true" size="mini"></el-input>
                            </el-tooltip>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="放款账号交易类型" prop="payAccType">
                            <elx-select v-model="duebillViewForm.payAccType" selectKey="TRADETYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="扣款账号" prop="repayAccount">
                            <el-input v-model="duebillViewForm.repayAccount" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="扣款人开户行名称" prop="repayAccBankName">
                            <el-tooltip class="item" effect="dark" :content="duebillViewForm.repayAccBankName" placement="top">
                                <el-input v-model="duebillViewForm.repayAccBankName" :disabled="true" size="mini"></el-input>
                            </el-tooltip>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="扣款账户户名" prop="repayAccName">
                            <el-input v-model="duebillViewForm.repayAccName" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>逾期信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="逾期期数" prop="overdueTerm">
                            <el-input v-model="duebillViewForm.overdueTerm" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="连续欠款期数" prop="continueOweTerm">
                            <el-input v-model="duebillViewForm.continueOweTerm" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="累计欠款期数" prop="accumOweTerm">
                            <el-input v-model="duebillViewForm.accumOweTerm" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="本金逾期天数" prop="overdueDays">
                            <el-input v-model="duebillViewForm.overdueDays" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="利息逾期天数" prop="intOweDays">
                            <el-input v-model="duebillViewForm.intOweDays" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="本金逾期天数" prop="overdueDays">
                            <el-input v-model="duebillViewForm.overdueDays" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="利息逾期天数" prop="intOweDays">
                            <el-input v-model="duebillViewForm.intOweDays" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>还款信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="还款方式" prop="repayMode">
                            <elx-select v-model="duebillViewForm.repayMode" selectKey="STD_REPAY_METHOD"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="当前还款期次" prop="curRepayTerm">
                            <el-input v-model="duebillViewForm.curRepayTerm" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="本期应还金额" prop="curTermAmt">
                            <el-input v-model="duebillViewForm.curTermAmt" :disabled="true" size="mini">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="支付方式" prop="payMode">
                            <elx-select v-model="duebillViewForm.payMode" selectKey="STD_IQP_PAY_TYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="提前还款标志" prop="prepayFlag">
                            <elx-select v-model="duebillViewForm.prepayFlag" selectKey="TQHKFS"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>

    </el-form>
</template>
<script>
    export default {
        name: 'duebillViewForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {
                duebillViewForm: this.row,
            };
        },
        mounted: function () {
            this.initForm();
        },
        methods: {
            initForm() {
                this.duebillViewForm.loanAmt = this.$moneyUtil.thousandsChange(this.duebillViewForm.loanAmt);
                this.duebillViewForm.loanBalance = this.$moneyUtil.thousandsChange(this.duebillViewForm.loanBalance);
                this.duebillViewForm.normalBalance = this.$moneyUtil.thousandsChange(this.duebillViewForm.normalBalance);
                this.duebillViewForm.overdueBalance = this.$moneyUtil.thousandsChange(this.duebillViewForm.overdueBalance);
                this.duebillViewForm.deadBalance = this.$moneyUtil.thousandsChange(this.duebillViewForm.deadBalance);
                this.duebillViewForm.badBalance = this.$moneyUtil.thousandsChange(this.duebillViewForm.badBalance);
                this.duebillViewForm.compIntBalance = this.$moneyUtil.thousandsChange(this.duebillViewForm.compIntBalance);
                this.duebillViewForm.intTotal = this.$moneyUtil.thousandsChange(this.duebillViewForm.intTotal);
                this.duebillViewForm.innerOweInt = this.$moneyUtil.thousandsChange(this.duebillViewForm.innerOweInt);
                this.duebillViewForm.outOweInt = this.$moneyUtil.thousandsChange(this.duebillViewForm.outOweInt);
                this.duebillViewForm.recIntAccum = this.$moneyUtil.thousandsChange(this.duebillViewForm.recIntAccum);
                this.duebillViewForm.paidIntAccum = this.$moneyUtil.thousandsChange(this.duebillViewForm.paidIntAccum);
                this.duebillViewForm.overAllBalance = this.$moneyUtil.thousandsChange(this.duebillViewForm.overAllBalance);
                this.duebillViewForm.curTermAmt = this.$moneyUtil.thousandsChange(this.duebillViewForm.curTermAmt);
            }
        }
    };
</script>