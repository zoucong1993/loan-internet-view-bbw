<template>
    <el-form ref="viewForm" :model="viewForm" label-width="120px" disabled>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>业务申请基本信息</span>
            </div>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="客户编码" prop="custNo" disabled>
                        <el-input v-model="viewForm.custNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户姓名" prop="custName" disabled>
                        <el-input v-model="viewForm.custName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="申请编号" prop="applyNo" disabled>
                        <el-input v-model="viewForm.applyNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品编号" prop="prdCode" disabled>
                        <elx-select-tree v-model="viewForm.prdCode" :url="selectPrdTreeUrl"></elx-select-tree>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="申请类型" prop="applyType" disabled>
                        <elx-select v-model="viewForm.applyType" selectKey="STD_ZB_APP_TYPE"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请币种" prop="ccy" disabled>
                        <elx-select v-model="viewForm.ccy" selectKey="STD_ZX_CUR_TYPE"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="申请金额" prop="applyAmt">
                        <el-input v-model="viewForm.applyAmt"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请期限" prop="applyTerm" disabled>
                        <el-input v-model="viewForm.applyTerm"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="利率类型" prop="rateType" disabled>
                        <el-input v-model="viewForm.rateType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="执行利率" prop="actualRate" disabled>
                        <el-input v-model="viewForm.actualRate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="担保方式" prop="grtType" disabled>
                        <el-input v-model="viewForm.grtType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="贷款用途" prop="loanUse" disabled>
                        <el-input v-model="viewForm.loanUse"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="主原因" prop="firstReason" disabled>
                        <el-input v-model="viewForm.firstReason"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="子原因" prop="secondReason" disabled>
                        <el-input v-model="viewForm.secondReason"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="外部申请编号" prop="extApplyNo" disabled>
                        <el-input v-model="viewForm.extApplyNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="渠道编码" prop="chanCode" disabled>
                        <el-input v-model="viewForm.chanCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="8" :offset="2">
                    <el-form-item label="备注" prop="remark" disabled>
                        <el-input v-model="viewForm.remark" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>

    </el-form>
</template>
<script>
    export default {
        name: 'creditApplyApprove',
        props: {
            rowData: Object
        },
        data() {
            return {
                selectPrdTreeUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                viewForm: {},
            }
        },
        mounted: function () {
            this.initForm();
        },
        methods: {
            initForm() {
                const _this = this;
                this.$http.post("/loan/creditApplyAction.do?_md=findCreditApplyByApplyNo", {"applyNo": this.rowData.businessKey}
                ).then(function (response) {
                    if (response.success) {
                        _this.viewForm = response.data;
                    } else {
                        _this.$error(response.msg);
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                });
            },
        }
    };
</script>