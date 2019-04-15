<template>
    <el-form :model="prdTermOptionUpdateForm" :rules="rules" ref="prdTermOptionUpdateForm" label-width="170px"
             :disabled="disabled">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="主产品名称">
                    <elx-select-tree type="text" v-model="prdTermOptionUpdateForm.prdCode" size="small" :url="prdUrl"
                                     :disabled="true"></elx-select-tree>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="主产品编号" prop="prdCode">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.prdCode" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="期限名称" prop="termName">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.termName">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="期限" prop="term">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.term">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="登记人" prop="createUserName">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.createUserName" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="登记时间" prop="createTime">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.createTime" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="修改人" prop="updateUserName">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.updateUserName" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="修改时间" prop="updateTime">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.updateTime" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="序号" prop="sortNo">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.sortNo">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注" prop="remark">
                    <el-input type="text" v-model="prdTermOptionUpdateForm.remark">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdTermOptionUpdateForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
            operate: String
        },
        data() {
            return {
                prdTermOptionUpdateForm: this.row,
                rules: {
                    term: [
                        {required: true, message: '请输入期限', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}
                    ]
                },
                disabled: this.operate === "view" ? true : false,
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree"
            };
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.prdTermOptionUpdateForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/prdTermOptionAction.do?_md=updateBySelective", _this.prdTermOptionUpdateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("updatePrdTermOptDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("修改成功！");
                                } else {
                                    _this.prdTermOptionUpdateForm.term="";
                                    _this.$error("请输入正确期限区间");
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
                this.$refs.prdTermOptionUpdateForm.resetFields();
            }
        }

    }
    ;
</script>