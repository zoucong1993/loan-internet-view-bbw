<template>
    <el-form :model="indivCustWorkUpdateForm" :rules="rules" ref="indivCustWorkUpdateForm" label-width="120px">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="客户编号" prop="custNo">
                    <el-input v-model="indivCustWorkUpdateForm.custNo" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="职业" prop="occupation">
                    <elx-select type="text" v-model="indivCustWorkUpdateForm.occupation" selectKey="STD_OCCUP"
                                :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="单位名称" prop="compName">
                    <el-input v-model="indivCustWorkUpdateForm.compName" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="公司所属行业" prop="industry">
                    <elx-select v-model="indivCustWorkUpdateForm.industry" placeholder="请选择行业类型"
                                selectKey="STD_GB_COM_TYPE" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="公司地址" prop="compAddr">
                    <el-input v-model="indivCustWorkUpdateForm.compAddr" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="单位邮政编码" prop="compZip">
                    <el-input type="text" v-model="indivCustWorkUpdateForm.compZip" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="入职日期" prop="beginDate">
                    <el-date-picker v-model="indivCustWorkUpdateForm.beginDate" type="date" value-format="yyyy-MM-dd"
                                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="本人职务" prop="duty">
                    <elx-select type="text" v-model="indivCustWorkUpdateForm.duty" selectKey="STD_DUTY"
                                :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="职级" prop="dutyLevel">
                    <elx-select v-model="indivCustWorkUpdateForm.dutyLevel" selectKey="XDZW" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="职称" prop="caste">
                    <elx-select type="text" v-model="indivCustWorkUpdateForm.caste" selectKey="STD_ZX_TITLE"
                                :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否本单位" prop="interComp">
                    <elx-select type="text" v-model="indivCustWorkUpdateForm.interComp" selectKey="STD_YES_NO"
                                :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="内部职级" prop="interDutyLevel">
                    <elx-select v-model="indivCustWorkUpdateForm.interDutyLevel" selectKey="XDZW" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="工作年限" prop="workYear">
                    <el-input type="text" v-model="indivCustWorkUpdateForm.workYear" :disabled="disabled">
                        <template slot="append">年</template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="年收入" prop="annualIncome">
                    <el-input type="text" v-model="indivCustWorkUpdateForm.annualIncome" :disabled="disabled" @change="handleMoney">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所在部门" prop="dept">
                    <el-input type="text" v-model="indivCustWorkUpdateForm.dept" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="单位性质" prop="compNature">
                    <elx-select type="text" v-model="indivCustWorkUpdateForm.compNature" selectKey="STD_ZB_UNIT_TYPE"
                                :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="单位规模" prop="compScale">
                    <el-input type="text" v-model="indivCustWorkUpdateForm.compScale" :disabled="disabled">
                        <template slot="append">人</template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="工资账户开户行" prop="salAcctBank">
                    <el-input type="text" v-model="indivCustWorkUpdateForm.salAcctBank" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="工资账号" prop="salAcctNo">
                    <el-input type="text" v-model="indivCustWorkUpdateForm.salAcctNo" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around" v-if="operate === 'update'">
            <el-col :span="12">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('indivCustWorkUpdateForm')">保 存</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'indivCustWorkUpdateForm',
        props: {
            custNo: String,
            operate: String
        },
        data() {
            var validateAnnualIncome = (rule, value, callback) => {
                if (!regex.moneyExp.test(value)) {
                    callback(new Error('请输入正确的金额!'));
                } else {
                    callback();
                }
            };
            return {
                indivCustWorkUpdateForm: {},
                rules: {
                    compZip: [
                        {pattern: regex.postExp, message: "邮政编码格式不正确"}
                    ],
                    workYear: [
                        {pattern: regex.posInteExp, message: "请输入正整数"}
                    ],
                    annualIncome: [
                        {validator: validateAnnualIncome, trigger: 'blur'}
                    ],
                    compScale: [
                        {pattern: regex.posInteExp, message: "请输入正整数"}
                    ],
                },
                disabled: false
            };
        },
        components: {},
        mounted: function () {
            this.initForm();
        },
        methods: {
            initForm() {
                const _this = this;
                if (this.operate === "view") {
                    this.disabled = true;
                }
                this.$http.post("/loan/cusIndivWorkAction.do?_md=findCusIndivWorkInfoByCustNo", {
                    custNo: this.custNo
                }).then(function (response) {
                    if (response.success && response.data) {
                        _this.indivCustWorkUpdateForm = response.data;
                        _this.indivCustWorkUpdateForm.annualIncome = _this.$moneyUtil.thousandsChange(_this.indivCustWorkUpdateForm.annualIncome)
                    }
                }).catch(function (error) {
                    _this.$error(error);
                });

            },
            submitForm(formName) {
                const _this = this;
                let annualIncome = this.$moneyUtil.deThousandsChange(this.indivCustWorkUpdateForm.annualIncome);
                let data ={...this.indivCustWorkUpdateForm};
                data.annualIncome = annualIncome;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        _this.$http.post("/loan/cusIndivWorkAction.do?_md=updateCusIndivWorkInfoByCustNo", data)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$success("保存成功!");
                                } else {
                                    _this.$error(response.msg)
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    } else {
                        _this.$error(response.msg);
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleMoney(value){
                this.indivCustWorkUpdateForm.annualIncome = this.$moneyUtil.thousandsChange(value)
            }
        }

    };
</script>