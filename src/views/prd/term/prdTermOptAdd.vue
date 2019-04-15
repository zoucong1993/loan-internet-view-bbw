<template>
    <el-form :model="prdTermOptAddForm" :rules="rules" ref="prdTermOptAddForm" label-width="170px">
        <el-form-item label="子产品编号" prop="termCode">
            <el-input type="text" v-model="prdTermOptAddForm.termCode" :disabled="true">
            </el-input>
        </el-form-item>
        <el-form-item label="可选期限" prop="term">
            <el-input type="text" v-model.number="prdTermOptAddForm.term">
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdTermOptAddForm',
        props: {
            termCode: String
        },
        data() {
            return {
                prdTermOptAddForm: {
                    termCode: this.termCode
                },
                rules: {
                    termCode: [
                        {required: true, message: '请填写产品', trigger: 'blur'}
                    ],
                    term: [
                        {required: true, message: '请输入期限', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}
                    ]
                }
            };
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.prdTermOptAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/prdTermOptAction.do?_md=addPrdTermOpt", _this.prdTermOptAddForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("addTermOptDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("新增成功！")
                                } else {
                                    _this.$error(response.msg);
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    }
                });
            },
            resetForm() {
                this.$refs.prdTermOptAddForm.resetFields();
            }
        }

    }
    ;
</script>