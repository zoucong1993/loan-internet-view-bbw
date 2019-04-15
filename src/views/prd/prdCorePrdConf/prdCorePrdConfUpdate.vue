<template>
    <el-form :model="prdCorePrdConfUpdateForm" :rules="rules" ref="prdCorePrdConfUpdateForm" label-width="180px"
             :disabled="disabled">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="主产品编号" prop="prdCode">
                    <el-input type="text" v-model="prdCorePrdConfUpdateForm.prdCode" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="核心产品代码" prop="corePrdCode">
                    <el-input type="text" v-model="prdCorePrdConfUpdateForm.corePrdCode">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="最小期限" prop="termMin">
                    <el-input type="text" v-model="prdCorePrdConfUpdateForm.termMin">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="最大期限" prop="termMax">
                    <el-input type="text" v-model="prdCorePrdConfUpdateForm.termMax">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="担保方式" prop="grtType">
                    <elx-select type="text" v-model="prdCorePrdConfUpdateForm.grtType" selectKey="STD_ZB_ASSURE_MEANS">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="系统标识" prop="sysCode">
                    <elx-select type="text" v-model="prdCorePrdConfUpdateForm.sysCode" selectKey="XTQDBZ">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdCorePrdConfUpdateForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
            operate: String
        },
        data() {
            let validateMinValue = (rule,value,callback) =>{
                if(value === '' || value === undefined){
                    callback(new Error('请输入最小期限值'));
                }else{
                    let flag = regex.posInteExp.test(value);
                    if(!flag){
                        callback(new Error('请输入正整数'));
                    }
                    if(value >= this.prdCorePrdConfUpdateForm.termMax){
                        callback(new Error('最小期限值不能大于最大值'));
                    }else{
                        callback();
                    }
                }
            };
            let validateMaxValue = (rule,value,callback) =>{
                if(value === '' || value === undefined){
                    callback(new Error('请输入最大期限值'));
                }else{
                    let flag = regex.posInteExp.test(value);
                    if(!flag){
                        callback(new Error('请输入正整数'));
                    }
                    if(value <= this.prdCorePrdConfUpdateForm.termMin){
                        callback(new Error('最小期限值不能大于最大值'));
                    }else{
                        callback();
                    }
                }
            };
            return {
                prdCorePrdConfUpdateForm: this.row,
                rules: {
                    prdCode: [
                        {required: true, message: '请填写产品', trigger: 'blur'}
                    ],
                    termMin: [
                        {required: true,validator: validateMinValue, trigger: 'blur'}
                    ],
                    termMax: [
                        {required: true,validator: validateMaxValue, trigger: 'blur'}
                    ],
                    corePrdCode: [
                        {required: true, message: '请输入对应核心产品码', trigger: 'blur'}
                    ],
                    grtType: [
                        {required: true, message: '请选择担保方式', trigger: 'blur'}
                    ],
                    sysCode: [
                        {required: true, message: '请选择系统标识', trigger: 'blur'}
                    ]
                },
                disabled: this.operate === "view" ? true : false
            };
        },
        mounted: function () {
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.prdCorePrdConfUpdateForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/prdCorePrdConfAction.do?_md=updateBySelective", _this.prdCorePrdConfUpdateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("updatePrdCoreConfRelDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("修改成功！");
                                } else {
                                    _this.prdCorePrdConfUpdateForm.termMin="";
                                    _this.prdCorePrdConfUpdateForm.termMax="";
                                    _this.$error("请输入正确期限区间");
                                }
                            }).catch(function (error) {
                                _this.$error(error);
                            });
                    } else {
                        _this.$error("表单填写不正确，请重新确认！");
                    }
                });
            },
            resetForm() {
                this.$refs.prdCorePrdConfUpdateForm.resetFields();
            }
        }

    }
    ;
</script>