<template>
    <el-form :model="prdTermRepayModeAddForm" :rules="rules" ref="prdTermRepayModeAddForm" label-width="140px">
        <el-form-item label="还款方式" prop="repayMode">
            <elx-select type="text" v-model="prdTermRepayModeAddForm.repayMode" selectKey="STD_REPAY_METHOD">
            </elx-select>
        </el-form-item>
        <el-form-item label="是否可以提前还款" prop="prepayFlag">
            <elx-select type="text" v-model="prdTermRepayModeAddForm.prepayFlag" selectKey="STD_YES_NO">
            </elx-select>
        </el-form-item>
        <el-form-item label="利率模型" prop="rateCode">
            <el-select v-model="prdTermRepayModeAddForm.rateCode" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input type="text" v-model="prdTermRepayModeAddForm.remark">
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdTermRepayModeAddForm',
        props: {
            termOptionCode: String
        },
        data() {
            return {
                prdTermRepayModeAddForm: {
                    termOptId: this.termOptionCode
                },
                rules: {
                    prepayFlag: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ],
                    repayMode: [
                        {required: true, message: '请输选择还款方式', trigger: 'blur'}
                    ],
                    rateCode: [
                        {required: true, message: '请选择利率模型', trigger: 'blur'}
                    ]
                },
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
                this.$refs.prdTermRepayModeAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/prdTermRepayModeAction.do?_md=addPrdTermRepayMode", _this.prdTermRepayModeAddForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("addPrdRepayRelDialog");
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
                this.$refs.prdTermRepayModeAddForm.resetFields();
            }
        }

    };
</script>