<template>
    <el-form :model="prdRateBaseAddForm" :rules="rules" ref="prdRateBaseAddForm" label-width="120px">
        <el-form-item label="利率模型名称" prop="rateName">
            <el-input type="text" v-model="prdRateBaseAddForm.rateName">
            </el-input>
        </el-form-item>
        <el-form-item label="利率标志" prop="rateFlag">
            <elx-select type="text" v-model="prdRateBaseAddForm.rateFlag" selectKey="STD_RATE_FLAG">
            </elx-select>
        </el-form-item>
        <el-form-item label="利率方式" prop="rateMode">
            <elx-select type="text" v-model="prdRateBaseAddForm.rateMode" selectKey="STD_RATE_FIX_FLOAT"
                        @input="rateModeChange">
            </elx-select>
        </el-form-item>
        <el-form-item label="执行利率值" prop="rate" v-if="rateFiag">
            <el-input type="text" v-model.number="prdRateBaseAddForm.rate">
            </el-input>
        </el-form-item>
        <el-form-item label="浮动类型" prop="floatType" v-if="visible">
            <elx-select type="text" v-model="prdRateBaseAddForm.floatType" selectKey="STD_RATE_FLOAT_TYPE">
            </elx-select>
        </el-form-item>
        <el-form-item label="浮动值" prop="floatValue" v-if="visible">
            <el-input type="text" v-model.number="prdRateBaseAddForm.floatValue">
            </el-input>
        </el-form-item>
        <el-form-item label="罚息利率方式" prop="fineRateMode">
            <elx-select type="text" v-model="prdRateBaseAddForm.fineRateMode" selectKey="STD_RATE_FIX_FLOAT"
                        @input="fineRateModeChange"
                        disabled>
            </elx-select>
        </el-form-item>
        <el-form-item label="罚息浮动类型" prop="fineFloatType">
            <elx-select type="text" v-model="prdRateBaseAddForm.fineFloatType" selectKey="STD_RATE_FLOAT_TYPE">
            </elx-select>
        </el-form-item>
        <el-form-item label="罚息浮动值" prop="fineFloatValue">
            <el-input type="text" v-model.number="prdRateBaseAddForm.fineFloatValue">
            </el-input>
        </el-form-item>
        <el-form-item label="复利利率方式" prop="compRateMode" >
            <elx-select type="text" v-model="prdRateBaseAddForm.compRateMode" selectKey="STD_RATE_FIX_FLOAT"
                        @input="compRateModeChange"
                        disabled>
            </elx-select>
        </el-form-item>
        <el-form-item label="复利浮动类型" prop="compFloatType">
            <elx-select type="text" v-model="prdRateBaseAddForm.compFloatType" selectKey="STD_RATE_FLOAT_TYPE">
            </elx-select>
        </el-form-item>
        <el-form-item label="复利浮动值" prop="compFloatValue">
            <el-input type="text" v-model.number="prdRateBaseAddForm.compFloatValue">
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'prdRateBaseAddForm',
        props: {},
        data() {
            return {
                prdRateBaseAddForm: {
                    fineRateMode:'1',
                    compRateMode:'1',
                    fineFloatValue:'',
                    floatValue:'',
                    compFloatType:'',
                    compFloatValue:'',
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
                    fineRateMode: [
                        {required: true, message: '请选择罚息利率方式', trigger: 'blur'}
                    ],
                    floatType: [
                        {required: true, message: '请选择浮动类型', trigger: 'blur'}
                    ],
                    floatValue: [
                        {required: true, message: '请输入浮动值', trigger: 'blur'},
                        {type: 'number', message: '浮动值必须为数字值'}
                    ],
                    fineFloatType: [
                        {required: true, message: '请选择罚息浮动类型', trigger: 'blur'}
                    ],
                    fineFloatValue: [
                        {required: true, message: '请输入罚息浮动值'},
                        {type: 'number', message: '罚息浮动值必须为数字值'}
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
                visible: false,
                fineVisible: false,
                compVisible: false,
                rateFiag:false,

            };
        },
        components: {},
        watch: {},
        mounted: function () {
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.prdRateBaseAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/prdRateBaseAction.do?_md=addRateBaseInfo", _this.prdRateBaseAddForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("addPrdRateBaseDialog");
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
            rateModeChange(value) {
                this.prdRateBaseAddForm.rate = '';
                this.prdRateBaseAddForm.floatType = '';
                this.prdRateBaseAddForm.floatValue = '';
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
                this.prdRateBaseAddForm.fineFloatType = '';
                this.prdRateBaseAddForm.fineFloatValue = '';
                if (value === "1") {
                    this.fineVisible = true;
                } else {
                    this.fineVisible = false;
                }
            },
            compRateModeChange(value) {
                this.prdRateBaseAddForm.compFloatType = '';
                this.prdRateBaseAddForm.compFloatValue = '';
                if (value === "1") {
                    this.compVisible = true;
                } else {
                    this.compVisible = false;
                }
            }
        }

    };
</script>