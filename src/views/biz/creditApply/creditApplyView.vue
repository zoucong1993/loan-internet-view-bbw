<template>

    <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
            <div>

            <el-form  ref="viewForm" :model="viewForm" label-width="120px" disabled>
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                <dev>
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
                        <el-form-item label="申请金额" prop="applyAmt">
                            <el-input v-model="viewForm.applyAmt">
                                <template slot="append">元</template>
                            </el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="币种" prop="ccy">
                            <elx-select v-model="viewForm.ccy" selectKey="STD_CCY_TYPE"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">

                    <el-col :span="8">
                        <el-form-item label="申请期限" prop="applyTerm">
                            <el-input v-model="viewForm.applyTerm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="担保方式" prop="grtType">
                            <elx-select v-model="viewForm.grtType" selectKey="STD_ZB_ASSURE_MEANS"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="申请时间" prop="applyTime">
                            <el-input v-model="viewForm.applyTime" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="贷款用途" prop="loanUse">
                            <elx-select v-model="viewForm.loanUse" selectKey="LOAN_USE"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">

                    <el-col :span="8">
                        <el-form-item label="额度协议编号" prop="agrNo">
                            <el-input v-model="viewForm.agrNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="推荐人" prop="referrer">
                            <el-input v-model="viewForm.referrer"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row type="flex" class="row-bg" justify="space-around">

                    <el-col :span="8">
                        <el-form-item label="授权协议编号" prop="cusAuthAgrNo">
                            <el-input v-model="viewForm.cusAuthAgrNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否白名单" prop="whiteFlag">
                            <elx-select v-model="viewForm.whiteFlag" selectKey="STD_YES_NO"></elx-select>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row type="flex" class="row-bg" justify="space-around" >
                    <el-col :span="8" :pull="6" >
                        <el-form-item label="备注" prop="remark">
                            <el-input  type="textarea" v-model="viewForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                </dev>
                </el-card>
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>审批信息</span>
                    </div>
                    <dev>
                        <el-row type="flex" class="row-bg" justify="space-around" >
                            <el-col :span="8">
                                <el-form-item label="流程实例" prop="instNo">
                                    <el-input   v-model="viewForm.instNo"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                               <el-form-item label="审批状态" prop="approveSts">
                                   <elx-select v-model="viewForm.approveSts" selectKey="APPLY_STS"></elx-select>
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
                    </dev>
                </el-card>
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>其他信息</span>
                    </div>
                    <dev>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="8">
                                <el-form-item label="客户经理" prop="custMgr">
                                    <el-input v-model="viewForm.custMgrName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="受理机构" prop="custOrg">
                                    <el-input v-model="viewForm.custOrgName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="8">
                                <el-form-item label="登记人员" prop="createUser">
                                    <el-input v-model="viewForm.createUserName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="登记机构" prop="createOrg">
                                    <el-input v-model="viewForm.createOrgName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="8">
                                <el-form-item label="更新机构" prop="updateOrg">
                                    <el-input v-model="viewForm.updateOrgName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="更新日期" prop="updateTime">
                                    <el-input v-model="viewForm.updateTime"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </dev>
                </el-card>

            </el-form>
            <div align="center" style="margin-top: 15px;">
                <el-button type="danger" @click="onCancel">关闭</el-button>
            </div>
        </div>
        </el-tab-pane>
        <el-tab-pane  v-if="tabPane" label="公积金信息" name="second">
            <fund-account ref="fundAccount" :applyNo1="creditApply.applyNo"> </fund-account>
        </el-tab-pane>

        <el-tab-pane  label="客户信息" name="indivView">
            <indiv-view ref="indivView" :applyNo1="creditApply.applyNo"> </indiv-view>
        </el-tab-pane>
        <el-tab-pane  label="决策信息" name="fundCreditInfoList">
            <fund-credit-info-list  ref="fundCreditInfoList"  :applyNo="creditApply.applyNo" ></fund-credit-info-list>
        </el-tab-pane>
    </el-tabs>

</template>
<script>
    import fundAccount from './fundAccount'
    import indivView from './indivView'
    import fundCreditInfoList from './fundCreditInfoList'
    export default {
        name: 'creditApplyView',
        components: {fundAccount,indivView,fundCreditInfoList},
        props: {
            creditApply: {}
        },


        data() {
            return {
                selectPrdTreeUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                viewForm:{},
                activeName:'first',
                tabPane: true,
            }
        },
        mounted(){

            this.selectInformation()
        },
        methods: {
            onCancel() {
                this.$emit('closeDialog');
            },
            selectInformation(){
                const _this = this
                this.$http.post(
                        "/loan/creditApplyAction.do?_md=findCreditApplyByApplyNo",
                        {
                        "applyNo": _this.creditApply.applyNo
                        }
                    ).then((response) => {
                        if (response.success) {
                            //测试用
                            if('1001' === response.data.prdCode){
                                _this.tabPane = false
                            }
                           _this.viewForm = response.data
                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch((error) => {
                    _this.$error(error.message);
                });
            },
        }
    };
</script>