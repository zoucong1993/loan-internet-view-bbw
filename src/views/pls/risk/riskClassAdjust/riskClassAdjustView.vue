<template>
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
                <el-form-item label="合同编号" prop="contNo">
                    <el-input v-model="viewForm.contNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="借据编号" prop="duebillNo">
                    <el-input v-model="viewForm.duebillNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="贷款金额" prop="loanAmt">
                    <el-input v-model="viewForm.loanAmt"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="本金余额" prop="loanBalance">
                    <el-input v-model="viewForm.loanBalance"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="逾期本金" prop="overdueBalance">
                    <el-input v-model="viewForm.overdueBalance"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="分类月份" prop="classMonth">
                    <el-input v-model="viewForm.classMonth"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="流程实例" prop="instNo">
                    <el-input v-model="viewForm.instNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="状态" prop="sts">
                    <elx-select v-model="viewForm.sts" selectKey="WF_SP_STATUS"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="系统认定结果" prop="sysLevel">
                    <elx-select v-model="viewForm.sysLevel" selectKey="STD_ZB_FIVE_SORT"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="人工认定结果" prop="manLevel">
                    <elx-select v-model="viewForm.manLevel" selectKey="STD_ZB_FIVE_SORT"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="上次分类结果" prop="lastLevel">
                    <elx-select v-model="viewForm.lastLevel" selectKey="STD_ZB_FIVE_SORT"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="最终认定结果" prop="finalLevel">
                    <elx-select v-model="viewForm.finalLevel" selectKey="STD_ZB_FIVE_SORT"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
</template>
<script>
    export default {
        name: 'riskClassAdjustView',
        props: {
            classAdjust: {}
        },
        data() {
            return {
                viewForm: this.classAdjust,
            }
        },
        methods: {}
    };
</script>