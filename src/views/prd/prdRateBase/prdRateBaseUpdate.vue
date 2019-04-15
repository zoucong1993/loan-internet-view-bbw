<template>
    <el-form :model="prdRateBaseUpdateForm" :rules="rules" ref="prdRateBaseUpdateForm" label-width="140px">
        <el-form-item label="利率模型名称" prop="rateName">
            <el-input type="text" v-model="prdRateBaseUpdateForm.rateName" :disabled="disabled">
            </el-input>
        </el-form-item>
        <el-form-item label="利率标志" prop="rateFlag">
            <elx-select type="text" v-model="prdRateBaseUpdateForm.rateFlag" selectKey="STD_RATE_FLAG" :disabled="disabled">
            </elx-select>
        </el-form-item>
        <el-form-item label="利率方式" prop="rateMode">
            <elx-select type="text" v-model="prdRateBaseUpdateForm.rateMode" selectKey="STD_RATE_FIX_FLOAT"
                        @input="rateModeChange"
                        :disabled="disabled">
            </elx-select>
        </el-form-item>
        <el-form-item label="执行利率值" prop="rate" v-if="rateFiag">
            <el-input type="text" v-model.number="prdRateBaseUpdateForm.rate" :disabled="disabled">
            </el-input>
        </el-form-item>
        <el-form-item label="浮动类型" prop="floatType" v-if="visible">
            <elx-select type="text" v-model="prdRateBaseUpdateForm.floatType" selectKey="STD_RATE_FLOAT_TYPE"
                        :disabled="disabled">
            </elx-select>
        </el-form-item>
        <el-form-item label="浮动值" prop="floatValue" v-if="visible">
            <el-input type="text" v-model="prdRateBaseUpdateForm.floatValue" :disabled="disabled">
            </el-input>
        </el-form-item>
        <el-form-item label="罚息利率方式" prop="fineRateMode">
            <elx-select type="text" v-model="prdRateBaseUpdateForm.fineRateMode" selectKey="STD_RATE_FIX_FLOAT"
                        @input="fineRateModeChange" disabled>
            </elx-select>
        </el-form-item>
        <el-form-item label="罚息浮动类型" prop="fineFloatType">
            <elx-select type="text" v-model="prdRateBaseUpdateForm.fineFloatType" selectKey="STD_RATE_FLOAT_TYPE"
                        :disabled="disabled">
            </elx-select>
        </el-form-item>
        <el-form-item label="罚息浮动值" prop="fineFloatValue">
            <el-input type="text" v-model="prdRateBaseUpdateForm.fineFloatValue" :disabled="disabled">
            </el-input>
        </el-form-item>
        <el-form-item label="复利利率方式" prop="compRateMode" >
            <elx-select type="text" v-model="prdRateBaseUpdateForm.compRateMode" selectKey="STD_RATE_FIX_FLOAT"
                        disabled
                        @input="compRateModeChange">
            </elx-select>
        </el-form-item>
        <el-form-item label="复利浮动类型" prop="compFloatType">
            <elx-select type="text" v-model="prdRateBaseUpdateForm.compFloatType"
                        :disabled="disabled"
                        selectKey="STD_RATE_FLOAT_TYPE">
            </elx-select>
        </el-form-item>
        <el-form-item label="复利浮动值" prop="compFloatValue">
            <el-input type="text" v-model.number="prdRateBaseUpdateForm.compFloatValue"
                      :disabled="disabled">
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>

    import * as regex from "@/utils/regex";

    export default {
        name: 'prdRateBaseUpdateForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
            operate: String,
            rateModelCode: String,
        },
        data() {
            return {
                prdRateBaseUpdateForm: {
                    floatType: '',
                    floatValue: '',
                    fineFloatValue: '',
                    fineFloatType: '',
                    compFloatType: '',
                    compFloatValue: '',
                    rate: '',
                },
                rules: {
                    rateName: [
                        {required: true, message: '请填写利率模型名称', trigger: 'blur'}
                    ],
                    rate: [
                        {required: true, message: '请输入基准利率', trigger: 'blur'},
                        {type: 'number', message: '基准利率必须为数字值'}
                    ],
                    rateMode: [
                        {required: true, message: '请选择利率方式', trigger: 'blur'}
                    ],
                    floatType: [
                        {required: true, message: '请选择浮动类型', trigger: 'blur'}
                    ],
                    floatValue: [
                        {required: true, message: '请输入浮动值', trigger: 'blur'},
                        {pattern: regex.numExp, message: "浮动值必须为数字值"}
                    ],
                    fineRateMode: [
                        {required: true, message: '请选择罚息利率方式', trigger: 'blur'}
                    ],
                    fineFloatType: [
                        {required: true, message: '请选择罚息浮动类型', trigger: 'blur'}
                    ],
                    fineFloatValue: [
                        {required: true, message: '请输入罚息浮动值', trigger: 'blur'},
                        {pattern: regex.numExp, message: "罚息浮动值必须为数字值"}
                    ],
                    compRateMode: [
                        {required: true, message: '请选择复利利率方式', trigger: 'blur'},
                    ],
                    compFloatType: [
                        {required: true, message: '请选择复利浮动类型', trigger: 'blur'}
                    ],
                    compFloatValue: [
                        {required: true, message: '请输入复利浮动值'},
                        {type: 'number', message: '复利浮动值必须为数字值'}
                    ],
                    rateFlag: [
                        {required: true, message: '请选择利率标志'},
                    ]
                },
                disabled: this.operate === "view" ? true : false,
                visible: true,
                fineVisible: true,
                compVisible: true,
                rateFiag: true,
            };
        },
        watch: {},
        created(){
            if (this.rateModelCode !== undefined) {
                this.initOptions()
            } else {
                this.initForm();
            }
        },
        methods: {
            initForm() {
                if (this.row.rateMode === "1") {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
                if (this.row.rateMode === "0") {
                    this.rateFiag = true
                } else {
                    this.rateFiag = false
                }
                if (this.row.fineRateMode === "1") {
                    this.fineVisible = true;
                } else {
                    this.fineVisible = false;
                }
                if (this.row.compRateMode === "1") {
                    this.compVisible = true;
                } else {
                    this.compVisible = false;
                }
                this.prdRateBaseUpdateForm = {...this.prdRateBaseUpdateForm, ...this.row}
            },
            submitForm() {
                const _this = this;
                this.$refs.prdRateBaseUpdateForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/prdRateBaseAction.do?_md=updateRateBaseById", _this.prdRateBaseUpdateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("updatePrdRateBaseDialog");
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
            initOptions() {
                const _this = this;
                this.$http.post("/loan/prdRateBaseAction.do?_md=findRateBaseByRateCode",{"rateCode":this.rateModelCode})
                    .then(function (response) {
                        if (response.success) {
                            if (response.data.rateMode ==="1") {
                                _this.visible = true;
                            } else {
                                _this.visible = false;

                            }
                            if (response.data.rateMode === "0") {
                                _this.rateFiag = true
                            } else {
                                _this.rateFiag = false
                            }
                            if (response.data.fineRateMode === "1") {
                                _this.fineVisible = true;
                            } else {
                                _this.fineVisible = false;
                            }
                            if (response.data.compRateMode === "1") {
                                _this.compVisible = true;
                            } else {
                                _this.compVisible = false;
                            }
                            _this.prdRateBaseUpdateForm = response.data;

                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch(function (error) {
                    _this.$error(error);
                });
            },
            rateModeChange(value) {
                this.prdRateBaseUpdateForm.floatType = "";
                this.prdRateBaseUpdateForm.floatValue = "";
                this.prdRateBaseUpdateForm.rate = '';
                if (value === "1") {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
                if (value === "0") {
                    this.rateFiag = true
                } else {
                    this.rateFiag = false
                }

            },
            fineRateModeChange(value) {
                this.prdRateBaseUpdateForm.fineFloatType = "";
                this.prdRateBaseUpdateForm.fineFloatValue = "";
                if (value === "1") {
                    this.fineVisible = true;
                } else {
                    this.fineVisible = false;
                }
            },
            compRateModeChange(value) {
                this.prdRateBaseUpdateForm.compFloatType = '';
                this.prdRateBaseUpdateForm.compFloatValue = '';
                if (value === "1") {
                    this.compVisible = true;
                } else {
                    this.compVisible = false;
                }
            },
            resetForm() {
                this.$refs.prdRateBaseUpdateForm.resetFields();
            }
        }

    }
    ;
</script>