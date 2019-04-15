<template>
    <el-form :model="prdTermOptionAddForm" :rules="rules" ref="prdTermOptionAddForm" label-width="180px">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="主产品名称">
                    <elx-select-tree type="text" v-model="prdTermOptionAddForm.prdCode" size="small" :url="prdUrl"
                                     :disabled="true"></elx-select-tree>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="主产品编号" prop="prdCode">
                    <el-input type="text" v-model="prdTermOptionAddForm.prdCode" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="期限名称" prop="termName">
                    <el-input type="text" v-model="prdTermOptionAddForm.termName">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="期限" prop="term">
                    <el-input type="text" v-model="prdTermOptionAddForm.term">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="序号" prop="sortNo">
                    <el-input type="text" v-model="prdTermOptionAddForm.sortNo">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注" prop="remark">
                    <el-input type="text" v-model="prdTermOptionAddForm.remark">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdTermOptionAddForm',
        props: {
            prdCode: String
        },
        data() {
            return {
                prdTermOptionAddForm: {
                    prdCode: this.prdCode,
                    grtType: "40",
                    rateBasic: "1"
                },
                rules: {
                    prdCode: [
                        {required: true, message: '请填写产品', trigger: 'blur'}
                    ],
                    term: [
                        {required: true, message: '请输入期限', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}

                    ],
                    sortNo: [
                        {required: true, message: '请输入序号', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}

                    ],
                    termName: [
                        {required: true, message: '请输入对应期限名称', trigger: 'blur'}
                    ]
                },
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree"
            };
        },
        mounted: function () {
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.prdTermOptionAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/prdTermOptionAction.do?_md=addTermOption", _this.prdTermOptionAddForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("addPrdTermOptionDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("新增成功！")
                                } else {
                                    _this.$error("期限值不合法，请重新输入");
                                    _this.prdTermOptionAddForm.term = "";
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    }
                });
            },
            resetForm() {
                this.$refs.prdTermOptionAddForm.resetFields();
            }
        }

    }
    ;
</script>