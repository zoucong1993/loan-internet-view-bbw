<template>
    <el-form :model="contractModelUpdateForm" :rules="rules" ref="contractModelUpdateForm" label-width="140px">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="模板编号" prop="modelNo">
                    <el-select type="text" v-model="contractModelUpdateForm.modelNo" :disabled="true" size="mini">
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="模板类型" prop="modelType">
                    <elx-select type="text" v-model="contractModelUpdateForm.modelType" selectKey="HTMBLX"
                                :disabled="disabled" size="mini">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="模板名称" prop="modelName">
                    <el-input type="text" v-model="contractModelUpdateForm.modelName" :disabled="disabled" size="mini">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="模板状态" prop="sts">
                    <elx-select type="text" v-model="contractModelUpdateForm.sts" selectKey="HTMBZT"
                                :disabled="disabled" size="mini">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="24">
                <el-form-item label="模板文件路径" prop="filePath">
                    <el-input type="text" v-model="contractModelUpdateForm.filePath" :disabled="true" size="mini">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="模板文件名" prop="fileName">
                    <el-input type="text" v-model="contractModelUpdateForm.fileName" :disabled="true" size="mini">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="版本号" prop="curVers">
                    <el-input type="text" v-model="contractModelUpdateForm.curVers" :disabled="true" size="mini">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: 'contractModelUpdateForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
            operate: String
        },
        data() {
            return {
                contractModelUpdateForm: this.row,
                rules: {
                    modelType: [
                        {required: true, message: '请选择模板类型', trigger: 'blur'}
                    ],
                    modelName: [
                        {required: true, message: '请填写模板名称', trigger: 'blur'}
                    ]
                },
                disabled: this.operate === "view" ? true : false
            };
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.contractModelUpdateForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/contractModelAction.do?_md=updateContractModelById", _this.contractModelUpdateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("updateContractModelDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("修改成功！");
                                } else {
                                    _this.$error(response.msg);
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    } else {
                        return;
                    }
                });
            },
            resetForm() {
                this.$refs.contractModelUpdateForm.resetFields();
            }
        }

    };
</script>