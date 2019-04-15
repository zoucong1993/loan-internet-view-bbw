<template>
    <el-form :model="prdTermRelAddForm" :rules="rules" ref="prdTermRelAddForm" label-width="180px">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="产品" prop="prdCode">
                    <elx-select-tree type="text" v-model="prdTermRelAddForm.prdCode" size="small" :url="prdUrl"
                                     :disabled="true"></elx-select-tree>
                </el-form-item>
            </el-col>
            <el-col :span="12">

                <el-form-item label="对应核心产品" prop="corePrdCode">
                    <el-input type="text" v-model="prdTermRelAddForm.corePrdCode">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="最小期限" prop="termMin">
                    <el-input type="text" v-model="prdTermRelAddForm.termMin">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="最大期限" prop="termMax">
                    <el-input type="text" v-model="prdTermRelAddForm.termMax">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="担保方式" prop="grtType">
                    <elx-select type="text" v-model="prdTermRelAddForm.grtType" selectKey="STD_ZB_ASSURE_MEANS">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="定价依据" prop="rateBasic">
                    <elx-select type="text" v-model="prdTermRelAddForm.rateBasic" selectKey="RATE_BASIC">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="利率模型" prop="rateCode">
                    <el-select v-model="prdTermRelAddForm.rateCode" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="放款当天是否允许还款" prop="alRepaySameDay">
                    <elx-select type="text" v-model="prdTermRelAddForm.alRepaySameDay" selectKey="STD_ZX_YES_NO">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="还款间隔" prop="repayTerm">
                    <el-input type="text" v-model="prdTermRelAddForm.repayTerm">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdTermRelAddForm',
        props: {
            prdCode: String
        },
        data() {
            return {
                prdTermRelAddForm: {
                    prdCode: this.prdCode,
                    grtType: "40",
                    rateBasic: "1"
                },
                rules: {
                    prdCode: [
                        {required: true, message: '请填写产品', trigger: 'blur'}
                    ],
                    termMin: [
                        {required: true, message: '请输入最小期限', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}

                    ],
                    termMax: [
                        {required: true, message: '请输入最大期限', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}

                    ],
                    corePrdCode: [
                        {required: true, message: '请输入对应核心产品码', trigger: 'blur'}
                    ],
                    grtType: [
                        {required: true, message: '请选择担保方式', trigger: 'blur'}
                    ],
                    rateBasic: [
                        {required: true, message: '请选择定价依据', trigger: 'blur'}
                    ],
                    rateCode: [
                        {required: true, message: '请选择利率模型', trigger: 'blur'}
                    ],
                    alRepaySameDay: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ],
                    repayTerm: [
                        {required: true, message: '请输入还款间隔', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}
                    ]
                },
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
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
                this.$refs.prdTermRelAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/prdTermRelAction.do?_md=addPrdTermRel", _this.prdTermRelAddForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("addTermRelDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("新增成功！")
                                } else if (response.data === 2) {
                                    _this.$error("子产品期限填写有重叠，请重新输入");
                                    _this.prdTermRelAddForm.termMin = "";
                                    _this.prdTermRelAddForm.termMax = "";
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
                this.$refs.prdTermRelAddForm.resetFields();
            }
        }

    }
    ;
</script>