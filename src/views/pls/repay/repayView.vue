<template>
    <el-form :model="repayViewForm" :rules="rules" ref="repayViewForm"
             label-width="140px">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="借据编号" prop="duebillNo">
                    <el-input v-model="repayViewForm.duebillNo"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="合同编号" prop="contNo">
                    <el-input v-model="repayViewForm.contNo"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="产品编码" prop="prdCode">
                    <el-input v-model="repayViewForm.prdCode"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="客户编号" prop="custNo">
                    <el-input v-model="repayViewForm.custNo"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户名称" prop="custName">
                    <el-input v-model="repayViewForm.custName"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="还款类型" prop="repayType">
                    <elx-select v-model="repayViewForm.repayType"  selectKey="STD_REPAY_METHOD" :disabled="true"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="还款金额" prop="repayAmt">
                    <el-input v-model="repayViewForm.repayAmt"  :disabled="true">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="还款状态" prop="sts">
                    <elx-select v-model="repayViewForm.sts" selectKey="STD_HKZT" :disabled="true"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="交易日期" prop="transDate">
                    <el-input v-model="repayViewForm.transDate"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="交易时间" prop="transTime">
                    <el-input v-model="repayViewForm.transTime"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="交易流水" prop="transSeq">
                    <el-input v-model="repayViewForm.transSeq"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="还款本金" prop="acctCapi">
                    <el-input v-model="repayViewForm.acctCapi"  :disabled="true">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="还款利息" prop="acctInt">
                    <el-input v-model="repayViewForm.acctInt"  :disabled="true">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="还款费用" prop="acctFee">
                    <el-input v-model="repayViewForm.acctFee"  :disabled="true">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="还款罚息" prop="acctFineInt">
                    <el-input v-model="repayViewForm.acctFineInt"  :disabled="true">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="还款罚金" prop="acctFineCapi">
                    <el-input v-model="repayViewForm.acctFineCapi"  :disabled="true">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="还款渠道" prop="repayChan">
                    <el-input v-model="repayViewForm.repayChan" selectKey="STD_LYQD" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="渠道编码" prop="chanCode">
                    <el-input v-model="repayViewForm.chanCode" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="法人编码" prop="bankCode">
                    <el-input v-model="repayViewForm.bankCode"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="账务处理日期" prop="acctTransDate">
                    <el-input v-model="repayViewForm.acctTransDate"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="账务处理流水" prop="acctTransSeq">
                    <el-input v-model="repayViewForm.acctTransSeq"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="还款动作类型" prop="repayAct">
                    <elx-select v-model="repayViewForm.repayAct"  selectKey="STD_REPAY_ACT" :disabled="true"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: 'repayViewForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {
                repayViewForm: this.row,
                rules: {}
            };
        },
        mounted: function () {
            this.initForm();
        },
        methods: {
            initForm() {
                this.repayViewForm.repayAmt = this.$moneyUtil.thousandsChange(this.repayViewForm.repayAmt);
                this.repayViewForm.acctCapi = this.$moneyUtil.thousandsChange(this.repayViewForm.acctCapi);
                this.repayViewForm.acctInt = this.$moneyUtil.thousandsChange(this.repayViewForm.acctInt);
                this.repayViewForm.acctFee = this.$moneyUtil.thousandsChange(this.repayViewForm.acctFee);
                this.repayViewForm.acctFineInt = this.$moneyUtil.thousandsChange(this.repayViewForm.acctFineInt);
                this.repayViewForm.acctFineCapi = this.$moneyUtil.thousandsChange(this.repayViewForm.acctFineCapi);
            }
        }
    };
</script>