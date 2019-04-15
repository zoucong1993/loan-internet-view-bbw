<template>
    <div>
        <el-form ref="viewForm" :model="viewForm" label-width="120px" disabled>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="客户编码" prop="custNo">
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
                    <el-form-item label="协议编号" prop="agrNo">
                        <el-input v-model="viewForm.agrNo"></el-input>
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
                    <el-form-item label="申请币种" prop="ccy">
                        <elx-select v-model="viewForm.ccy" selectKey="STD_CCY_TYPE"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="协议金额" prop="agrAmt">
                        <el-input v-model="viewForm.agrAmt">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="协议期限" prop="agrTerm">
                        <el-input v-model="viewForm.agrTerm"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="利率类型" prop="rateType">
                        <elx-select v-model="viewForm.rateType" selectKey="STD_RATE_FLAG"></elx-select>
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
                    <el-form-item label="申请日期" prop="agrDate">
                        <el-input v-model="viewForm.agrDate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请时间" prop="agrTime">
                        <el-input v-model="viewForm.agrTime"></el-input>
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
                    <el-form-item label="贷款用途" prop="loanUse">
                        <elx-select v-model="viewForm.loanUse" selectKey="LOAN_USE"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="产品编号" prop="prdCode">
                        <elx-select-tree v-model="viewForm.prdCode" :url="selectPrdTreeUrl"></elx-select-tree>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="额度状态" prop="agrSts">
                        <elx-select v-model="viewForm.agrSts" selectKey="KHEDZT"></elx-select>
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
                    <el-form-item label="是否预授信" prop="preLmtFlag">
                        <elx-select v-model="viewForm.preLmtFlag" selectKey="STD_YES_NO"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="额度循环标志" prop="lmtCycleFlag">
                        <elx-select v-model="viewForm.lmtCycleFlag" selectKey="STD_YES_NO"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="协议生效日期" prop="lmtBeginDate">
                        <el-input v-model="viewForm.lmtBeginDate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="协议到期日期" prop="lmtEndDate">
                        <el-input v-model="viewForm.lmtEndDate"></el-input>
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
                    <el-form-item label="管户经理" prop="custMgrName">
                        <el-input v-model="viewForm.custMgrName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="管户机构" prop="custOrgName">
                        <el-input v-model="viewForm.custOrgName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <div align="center" style="margin-top: 10px;" v-show="stop">
            <el-button type="primary" @click="onSubmit">终止</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'creditAgreeView',
        props: {
            creditAgree: {},
            stop: Boolean
        },
        data() {
            return {
                selectPrdTreeUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                viewForm: this.creditAgree,
            }
        },
        methods: {
            onSubmit() {
                console.log(this.stop);
                const _this = this;
                if(_this.agrSts === '00' ||  _this.agrSts === '10'){
                    _this.$error("只有待确认，正常状态的才可以终止");
                    return;
                }
                this.$http.post("/loan/creditAgreeAction.do?_md=stopAgree",{"agrNo": agrNo,"agrSts":"30"})
                    .then((response) => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog');
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch((error) => {
                        _this.$error(error.message);
                    });

            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            },
        }
    };
</script>