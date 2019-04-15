<template>
    <el-form ref="form" :model="data" label-width="100px" disabled>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="子交易名称" prop="subTranName">
                    <el-input v-model="data.subTranName" placeholder="请输入子交易名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="参数名称" prop="paramName">
                    <el-input v-model="data.paramName" placeholder="请输入参数名称"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="参数类型" prop="paramType">
                    <el-input v-model="data.paramType" placeholder="请输入参数类型"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="参数种类" prop="paramKind">
                    <el-input v-model="data.paramKind" placeholder="请输入参数种类"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="data.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: "tranSubParamView",
        props: {data: Object},
        method: {}
    };
</script>