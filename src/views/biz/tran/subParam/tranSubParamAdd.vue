<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="子交易名称" prop="subTranName">
                    <el-input v-model="form.subTranName" placeholder="请输入子交易名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="参数名称" prop="paramName">
                    <el-input v-model="form.paramName" placeholder="请输入参数名称"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="参数类型" prop="paramType">
                    <el-input v-model="form.paramType" placeholder="请输入参数类型"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="参数种类" prop="paramKind">
                    <el-input v-model="form.paramKind" placeholder="请输入参数种类"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: 'tranSubParamAdd',
        data() {
            return {
                form: {},
                rules: {
                    subTranName: [
                        {required: true, message: '子交易名称不能为空'}
                    ],
                    paramName: [
                        {required: true, message: '参数名称不能为空'},
                    ],
                    paramType: [
                        {required: true, message: '参数类型不能为空'},
                    ],
                    paramKind: [
                        {required: true, message: '参数种类不能为空'},
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
                this.$http.post("/loan/tranSubParamAction.do?_md=addTranSubParam",
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