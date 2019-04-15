<template>
    <el-form ref="form" :model="data" label-width="100px" disabled>
        <el-form-item label="子交易编码" prop="subTranCode">
            <el-input v-model="data.subTranCode"></el-input>
        </el-form-item>
        <el-form-item label="子交易名称" prop="subTranName">
            <el-input v-model="data.subTranName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <elx-select v-model="form.status" placeholder="请输入状态" selectKey="JYZT"></elx-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input v-model="data.remark"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: "tranSubView",
        props: {
            data: Object
        },
        method: {}
    };
</script>