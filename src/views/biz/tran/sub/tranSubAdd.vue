<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="子交易编码" prop="subTranCode">
            <el-input v-model="form.subTranCode" placeholder="请输入子交易编码"></el-input>
        </el-form-item>
        <el-form-item label="子交易名称" prop="subTranName">
            <el-input v-model="form.subTranName" placeholder="请输入子交易名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <elx-select v-model="form.status" placeholder="请输入状态" selectKey="JYZT"></elx-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'tranSubAdd',
        data() {
            return {
                form: {},
                rules: {
                    subTranCode: [
                        {required: true, message: '子交易编码不能为空'},
                    ],
                    subTranName: [
                        {required: true, message: '子交易名称不能为空'}
                    ],
                    status: [
                        {required: true, message: '状态不能为空'},
                    ],
                    remark: [
                        {required: true, message: '备注不能为空'},
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.saveTranSub();
                    } else {
                        return false;
                    }
                });
            },
            saveTranSub() {
                const _this = this;
                this.$http.post("/loan/tranSubAction.do?_md=addTranSub",
                    this.form).then(
                    function (response) {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog');
                        } else {
                            _this.$error(response.msg);
                        }
                    }
                ).catch(function (error) {
                    _this.$error(error.message);
                });
            }
        }
    };
</script>