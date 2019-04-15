<template>
    <el-form ref="form" :model="data" label-width="100px" disabled>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="流水号" prop="seriNo">
                    <el-input v-model="data.seriNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="交易号" prop="tranCode">
                    <el-input v-model="data.tranCode"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="子交易号" prop="subTranCode">
                    <el-input v-model="data.subTranCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="序号" prop="orderNo">
                    <el-input v-model="data.orderNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="返回码" prop="retCode">
                    <el-input v-model="data.retCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="返回信息" prop="retMsg">
                    <el-input v-model="data.retMsg"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="开始时间" prop="startTime">
                    <el-input v-model="data.startTime"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="结束时间" prop="endTime">
                    <el-input v-model="data.endTime"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="交易类型" prop="tranType">
                    <elx-select v-model="data.tranType" selectKey="JYZT"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: "tranRecordView",
        props: {
            data: Object
        },
        method: {}
    };
</script>