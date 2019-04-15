<template>
    <el-form :model="prdCoreConflAddForm" :rules="rules" ref="prdCoreConflAddForm" label-width="180px">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="主产品编号" prop="prdCode">
                    <el-input type="text" v-model="prdCoreConflAddForm.prdCode" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="核心产品代码" prop="corePrdCode">
                    <el-input type="text" v-model="prdCoreConflAddForm.corePrdCode">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="最小期限" prop="termMin">
                    <el-input type="text" v-model="prdCoreConflAddForm.termMin">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="最大期限" prop="termMax">
                    <el-input type="text" v-model="prdCoreConflAddForm.termMax" @change="check">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="担保方式" prop="grtType">
                    <elx-select type="text" v-model="prdCoreConflAddForm.grtType" selectKey="STD_ZB_ASSURE_MEANS">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="系统标识" prop="sysCode">
                    <elx-select type="text" v-model="prdCoreConflAddForm.sysCode" selectKey="XTQDBZ">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'prdCoreConflAddForm',
        props: {
            prdCode: String
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
                    if(value >= this.prdCoreConflAddForm.termMax){
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
                    if(value <= this.prdCoreConflAddForm.termMin){
                        callback(new Error('最小期限值不能大于最大值'));
                    }else{
                        callback();
                    }
                }
            };
            return {
                prdCoreConflAddForm: {
                    prdCode: this.prdCode
                },
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
                }
            };
        },
        mounted: function () {
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.prdCoreConflAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/prdCorePrdConfAction.do?_md=addPrdCorePrdConf", _this.prdCoreConflAddForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("addPrdCoreRelDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("新增成功！")
                                } else {
                                    _this.prdCoreConflAddForm.termMin="";
                                    _this.prdCoreConflAddForm.termMax="";
                                    _this.$error("期限区间重复，请重新输入！");
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    }
                });
            },
            resetForm() {
                this.$refs.prdCoreConflAddForm.resetFields();
            }
        }

    }
    ;
</script>