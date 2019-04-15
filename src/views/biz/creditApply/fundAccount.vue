<template>
    <dev>
        <el-form  ref="fundAccountFrom" :model="fundAccountFrom" label-width="120px" disabled>
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>公积金账户信息</span>
                </div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="客户编号" prop="custNo">
                            <el-input v-model="fundAccountFrom.custNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户姓名" prop="custName">
                            <el-input v-model="fundAccountFrom.custName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="证件类型" prop="certType">
                            <elx-select v-model="fundAccountFrom.certType" selectKey="STD_ZJLX" disabled></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="证件号码" prop="certNo">
                            <el-input v-model="fundAccountFrom.certNo" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input type="text" v-model="fundAccountFrom.phone">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="住宅电话" prop="homePhone">
                        <el-input type="text" v-model="fundAccountFrom.homePhone">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8" :pull="6">
                    <el-form-item label="家庭联系地址" prop="homeAddr">
                        <el-input type="textarea" v-model="fundAccountFrom.homeAddr">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="缴存地区" prop="regionCode">
                        <el-input type="text" v-model="fundAccountFrom.regionCode">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="个人开户日期" prop="perOpenDate">
                        <el-input type="text" v-model="fundAccountFrom.perOpenDate">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="公积金账号" prop="fundAcctNo">
                        <el-input type="text" v-model="fundAccountFrom.fundAcctNo">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="缴存单位名称" prop="compName">
                        <el-input type="text" v-model="fundAccountFrom.compName">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="缴存单位性质" prop="compNature">
                        <el-input type="text" v-model="fundAccountFrom.compNature">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="月缴存额" prop="payAmt">
                        <el-input type="text" v-model="fundAccountFrom.payAmt">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="个人账户余额" prop="perAcctBal">
                        <el-input type="text" v-model="fundAccountFrom.perAcctBal">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="累计提取额" prop="drawTotalAmt">
                        <el-input type="text" v-model="fundAccountFrom.drawTotalAmt">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="缴存状态" prop="paySts">
                        <elx-select v-model="fundAccountFrom.paySts" selectKey="JCZT"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="冻结金额" prop="frozenAmt">
                        <el-input type="text" v-model="fundAccountFrom.frozenAmt">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="初缴年月" prop="payBeginDate">
                        <el-input type="text" v-model="fundAccountFrom.payBeginDate">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="缴至年月" prop="payLastDate">
                        <el-input type="text" v-model="fundAccountFrom.payLastDate">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="最近一次缴存日期" prop="lastPayDate">
                        <el-input type="text" v-model="fundAccountFrom.lastPayDate">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="当前公积金年度" prop="curPayYear">
                        <el-input type="text" v-model="fundAccountFrom.curPayYear">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="公积金连续缴存期限" prop="payContTerm">
                        <el-input type="text" v-model="fundAccountFrom.payContTerm">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="公积金累计缴存期限" prop="payTotalTerm">
                        <el-input type="text" v-model="fundAccountFrom.payTotalTerm">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="最近12个月中断次数" prop="lastYearBreakNum">
                        <el-input type="text" v-model="fundAccountFrom.lastYearBreakNum">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最近12个月中断缴存月数" prop="lastYeaBreakMonth">
                        <el-input type="text" v-model="fundAccountFrom.lastYeaBreakMonth">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="个人账户状态" prop="perAcctSts">
                        <el-input type="text" v-model="fundAccountFrom.perAcctSts">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位缴存状态" prop="compAcctCts">
                        <el-input type="text" v-model="fundAccountFrom.compAcctCts">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="税前工资总额" prop="prTaxSalary">
                        <el-input type="text" v-model="fundAccountFrom.prTaxSalary">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="个人缴存基数" prop="perPayBase">
                        <el-input type="text" v-model="fundAccountFrom.perPayBase">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="个人缴存比例" prop="perPayPct">
                        <el-input type="text" v-model="fundAccountFrom.perPayPct">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="个人月缴存额" prop="perPayAmt">
                        <el-input type="text" v-model="fundAccountFrom.perPayAmt">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="单位缴存比例" prop="compPayPct">
                        <el-input type="text" v-model="fundAccountFrom.compPayPct">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位月缴存额" prop="compPayAmt">
                        <el-input type="text" v-model="fundAccountFrom.compPayAmt">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="开户管理部编号" prop="openDeptNo">
                        <el-input type="text" v-model="fundAccountFrom.openDeptNo">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位登记号" prop="compAcctNo">
                        <el-input type="text" v-model="fundAccountFrom.compAcctNo">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="单位组织机构代码" label-width="125px" prop="compOrgCode">
                        <el-input type="text" v-model="fundAccountFrom.compOrgCode">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="营业执照号码" prop="busiLicenseNo">
                        <el-input type="text" v-model="fundAccountFrom.busiLicenseNo">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8">
                    <el-form-item label="单位联系方式" prop="compPhone">
                        <el-input type="text" v-model="fundAccountFrom.compPhone">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位法定代表人" prop="compLegal">
                        <el-input type="text" v-model="fundAccountFrom.compLegal">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="8" :pull="6">
                    <el-form-item label="单位地址" prop="compAddr">
                        <el-input type="text" v-model="fundAccountFrom.compAddr">
                        </el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="12" :pull="5">
                    <el-form-item label-width="170px" label="近12个月缴存单位名称" prop="lastYearPayComp">
                        <el-input type="text" v-model="fundAccountFrom.lastYearPayComp">
                        </el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="12" :pull="5">
                    <el-form-item label-width="170px" label="近12个自然月单位缴存额" prop="lastYearCompAmt">
                        <el-input type="text" v-model="fundAccountFrom.lastYearCompAmt">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="12" :pull="5">
                    <el-form-item label-width="170px" label="近12个自然月个人缴存额" prop="lastYearPerAmt">
                        <el-input type="text" v-model="fundAccountFrom.lastYearPerAmt">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="12" :pull="5" >
                    <el-form-item label-width="170px" label="近12个自然月提取原因" prop="lastYearDrawReason">
                        <el-input type="text" v-model="fundAccountFrom.lastYearDrawReason">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="12" :pull="5">
                    <el-form-item label-width="170px" label="近12个自然月提取时间" prop="lastYearDrawDate">
                        <el-input type="text" v-model="fundAccountFrom.lastYearDrawDate">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="12" :pull="5">
                    <el-form-item label-width="170px" label="近12个自然月提取方式" prop="lastYearDrawMode">
                        <el-input type="text" v-model="fundAccountFrom.lastYearDrawMode">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" >
                <el-col :span="12" :pull="5">
                    <el-form-item label-width="170px" label="近12个自然月提取金额" prop="lastYearDrawAmt">
                        <el-input type="text" v-model="fundAccountFrom.lastYearDrawAmt">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-card>
        </el-form>
            <el-form  ref="fundLounFrom" :model="fundLounFrom" label-width="120px" disabled>
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>公积金贷款信息</span>
                </div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="公积金贷款编号" prop="loanNo">
                            <el-input v-model="fundLounFrom.loanNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公积金贷款金额" prop="loanAmt">
                            <el-input v-model="fundLounFrom.loanAmt"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="公积金贷款期限" prop="loanTerm">
                            <el-input v-model="fundLounFrom.loanTerm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公积金贷款还款方式" prop="repayMode">
                            <el-input v-model="fundLounFrom.repayMode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="公积金贷款月还款额" prop="monthPayAmt">
                            <el-input v-model="fundLounFrom.monthPayAmt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公积金贷款起始日期" prop="loanBeginDate">
                            <el-input v-model="fundLounFrom.loanBeginDate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="公积金贷款到期日期" prop="loanEndDate">
                            <el-input v-model="fundLounFrom.loanEndDate"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公积金贷款结清日期" prop="payOffDate">
                            <el-input v-model="fundLounFrom.payOffDate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="公积金贷款余额" prop="loanBalance">
                            <el-input v-model="fundLounFrom.loanBalance"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="共同贷款人姓名" prop="coName">
                            <el-input v-model="fundLounFrom.coName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="共同贷款人身份证号" prop="coCertNo">
                            <el-input v-model="fundLounFrom.coCertNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="共同贷款人是否建立公积金"  prop="coFundFlag">
                            <el-input  v-model="fundLounFrom.coFundFlag"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="贷款状态" prop="loanSts">
                            <elx-select selectKey="STD_DKZT" v-model="fundLounFrom.loanSts" ></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="还款状态" prop="repaySts">
                            <elx-select selectKey="STD_HKZT" v-model="fundLounFrom.repaySts" ></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="公积金贷款历史逾期次数" prop="hisOverNum">
                            <el-input v-model="fundLounFrom.hisOverNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最大连续逾期次数" prop="maxContOverNum">
                            <el-input v-model="fundLounFrom.maxContOverNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="个人购房地址" prop="houseAddr">
                            <el-input v-model="fundLounFrom.houseAddr"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房屋购买计税价格" prop="houseTaxAmt">
                            <el-input v-model="fundLounFrom.houseTaxAmt"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
        </el-form>

    </dev>
</template>

<script>
    export default {
        name: "fundAccount",
        components: {},
        props: {
            applyNo1:'',
        },
        data(){
            return {
                fundLounFrom:{},
                fundAccountFrom:{},
            }
        },
        created(){
            this.seleteBizCusFundLoan();
            this.seleteBizCusFundAccount();
        },
        methods:{
            async seleteBizCusFundLoan(){
                      const _this = this
                      this.$http.post(
                          '/loan/fundLoanAction.do?_md=selectFundLoanByApplyNo',
                          {
                              "applyNo": _this.applyNo1
                          }
                      ).then((response) => {
                          if (response.success) {
                             this.fundLounFrom = response.data
                          } else {
                              _this.$error(response.msg);
                          }
                      }).catch((error) => {
                          _this.$error(error.message);
                      });
            },
            async seleteBizCusFundAccount(){
                      const _this = this
                      this.$http.post(
                          '/loan/fundAccountAction.do?_md=selectFundAccountByApplyNo',
                          {
                              "applyNo": _this.applyNo1
                          }
                      ).then((response) => {
                          if (response.success) {

                              this.fundAccountFrom = response.data
                          } else {
                              _this.$error(response.msg);
                          }
                      }).catch((error) => {
                          _this.$error(error.message);
                      });
            },
        },
    }
</script>
