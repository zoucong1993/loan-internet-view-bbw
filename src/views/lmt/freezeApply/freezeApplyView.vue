<template>
    <div>
        <el-form ref="viewForm" :model="data" label-width="120px" disabled>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="客户编码" prop="custNo">
                        <el-input v-model="data.custNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户姓名" prop="custName">
                        <el-input v-model="data.custName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="申请编号" prop="applyNo">
                        <el-input v-model="data.applyNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="协议编号" prop="agrNo">
                        <el-input v-model="data.agrNo"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="授信币种" prop="ccy">
                        <elx-select v-model="data.ccy" selectKey="STD_ZX_CUR_TYPE"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="冻结/解冻类型" prop="bizType">
                        <elx-select v-model="data.bizType" selectKey="STD_DJJD"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="授信金额" prop="agrAmt">
                        <el-input v-model="data.agrAmt"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="调整后金额" prop="bizAmt">
                        <el-input v-model="data.bizAmt"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="办结日期" prop="endDate">
                        <el-input v-model="data.endDate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="冻结/解冻原因" prop="bizReason">
                        <el-input v-model="data.bizReason"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="流程实例" prop="instNo">
                        <el-input v-model="data.instNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请状态" prop="approveSts">
                        <elx-select v-model="data.approveSts" selectKey="SQZT"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'freezeApplyView',
        props: {
            data:Object
        },
        data() {
            return {

            }
        },
        methods: {}
    };
</script>