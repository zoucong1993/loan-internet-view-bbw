<template>
    <el-form :model="prdTermRepayModeUpdateForm" :rules="rules" ref="prdTermRepayModeUpdateForm" label-width="140px"
             :disabled="disabled">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="还款方式" prop="repayMode">
                    <elx-select type="text" v-model="prdTermRepayModeUpdateForm.repayMode" selectKey="STD_REPAY_METHOD">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="利率模型" prop="rateCode">
                    <el-select v-model="prdTermRepayModeUpdateForm.rateCode" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="是否可以提前还款" prop="prepayFlag">
                    <elx-select type="text" v-model="prdTermRepayModeUpdateForm.prepayFlag" selectKey="STD_YES_NO">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注" >
                    <el-input type="text" v-model="prdTermRepayModeUpdateForm.remark">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="创建人" >
                    <el-input type="text" v-model="prdTermRepayModeUpdateForm.createUserName" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="创建时间" >
                    <el-input type="text" v-model="prdTermRepayModeUpdateForm.createTime" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="修改人" >
                    <el-input type="text" v-model="prdTermRepayModeUpdateForm.updateUserName" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="修改时间" >
                    <el-input type="text" v-model="prdTermRepayModeUpdateForm.updateTime" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdTermRepayModeUpdateForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
            operate: String
        },
        data() {
            return {
                prdTermRepayModeUpdateForm: this.row,
                rules: {

                    repayMode: [
                        {required: true, message: '请输选择还款方式', trigger: 'blur'}
                    ],
                    rateCode: [
                        {required: true, message: '请选择利率模型', trigger: 'blur'}
                    ],
                    prepayFlag: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ]
                },
                disabled: this.operate === "view" ? true : false,
                options: []
            };
        },
        mounted: function () {
            this.initOptions();
        },
        methods: {
            initOptions() {
                const _this = this;
                this.$http.post("/loan/prdRateBaseAction.do?_md=findAllRateBaseModels")
                    .then(function (response) {
                        if (response.success) {
                            _this.options = response.data;
                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch(function (error) {
                    _this.$error(error);
                });
            },
            submitForm() {
                const _this = this;
                this.$refs.prdTermRepayModeUpdateForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/prdTermRepayModeAction.do?_md=updateBySelective", _this.prdTermRepayModeUpdateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("updatePrdRepayRelDialog");
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
                this.$refs.prdTermRepayModeUpdateForm.resetFields();
            }
        }

    }
    ;
</script>