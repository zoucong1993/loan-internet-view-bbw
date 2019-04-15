<template>
    <el-form :model="prdTermOptUpdateForm" :rules="rules" ref="prdTermOptUpdateForm" label-width="170px"
             :disabled="disabled">
        <el-form-item label="子产品编号" prop="termCode">
            <el-input type="text" v-model="prdTermOptUpdateForm.termCode" :disabled="true">
            </el-input>
        </el-form-item>
        <el-form-item label="可选期限编码" prop="termOptCode">
            <el-input type="text" v-model="prdTermOptUpdateForm.termOptCode" :disabled="true">
            </el-input>
        </el-form-item>
        <el-form-item label="可选期限" prop="term">
            <el-input type="text" v-model.number="prdTermOptUpdateForm.term">
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdTermOptUpdateForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
            operate: String
        },
        data() {
            return {
                prdTermOptUpdateForm: this.row,
                rules: {
                    term: [
                        {required: true, message: '请输入期限', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}
                    ]
                },
                disabled: this.operate === "view" ? true : false
            };
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.prdTermOptUpdateForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/prdTermOptAction.do?_md=updatePrdTermOptById", _this.prdTermOptUpdateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("updatePrdTermOptDialog");
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
                        _this.$error("表单填写不正确，请重新确认！");
                    }
                });
            },
            resetForm() {
                this.$refs.prdTermOptUpdateForm.resetFields();
            }
        }

    }
    ;
</script>