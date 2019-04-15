<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="模型KEY" prop="key">
            <el-input v-model="form.key" placeholder="请输入模型KEY"></el-input>
        </el-form-item>
        <el-form-item label="模型名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入模型名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="form.description" placeholder="身份证号"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'modelAdd',
        data() {
            return {
                form: {},
                rules: {
                    key: [
                        {required: true, message: 'key不能为空'}
                    ],
                    name: [
                        {required: true, message: '模型名称不能为空'}
                    ],
                    description: [
                        {required: true, message: '描述信息不能为空'}
                    ],
                }
            }
        },
        mounted() {},
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.saveModel();
                    } else {
                        return false;
                    }
                });
            },
            saveModel() {
                const _this = this;
                this.$http.post("/flow/modelAction/createModel",
                    this.form).then(
                    function (response) {
                        if(response.success) {
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