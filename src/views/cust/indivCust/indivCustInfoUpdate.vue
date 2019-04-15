<template>
    <el-form :model="indivCustUpdateForm" :rules="rules" ref="indivCustUpdateForm" label-width="135px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="客户编号" prop="custNo">
                    <el-input v-model="indivCustUpdateForm.custNo" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户名称" prop="custName">
                    <el-input type="text" v-model="indivCustUpdateForm.custName" maxlength="100" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="性别" prop="sex">
                    <elx-select type="text" v-model="indivCustUpdateForm.sex" selectKey="STD_SEX" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="民族" prop="ethnic">
                    <elx-select type="text" v-model="indivCustUpdateForm.ethnic" selectKey="STD_ZB_NATION" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="政治面貌" prop="politicalSts">
                    <elx-select type="text" v-model="indivCustUpdateForm.politicalSts" selectKey="STD_ZB_POLITICAL" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="出生日期" prop="birthDate">
                    <el-date-picker v-model="indivCustUpdateForm.birthDate" type="date"  value-format="yyyy-MM-dd" :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="婚姻状态" prop="maritalSts">
                    <elx-select v-model="indivCustUpdateForm.maritalSts" selectKey="STD_ZB_MARITAL_STATUS" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="户口性质" prop="residNature">
                    <elx-select type="text" v-model="indivCustUpdateForm.residNature" selectKey="HKLX" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="籍贯" prop="nativePlace">
                    <el-input type="text" v-model="indivCustUpdateForm.nativePlace" maxlength="100" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="户籍地址" prop="regAddr">
                    <el-input type="text" v-model="indivCustUpdateForm.regAddr" maxlength="100" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="毕业年份" prop="gradYear">
                    <el-date-picker type="year" placeholder="选择年" v-model="indivCustUpdateForm.gradYear" value-format="yyyy" :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="毕业学校" prop="gradSchool">
                    <el-input type="text" v-model="indivCustUpdateForm.gradSchool" maxlength="50" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="最高学历" prop="education">
                    <elx-select type="text" v-model="indivCustUpdateForm.education" selectKey="STD_ZX_EDU" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="最高学位" prop="degree">
                    <elx-select type="text" v-model="indivCustUpdateForm.degree" selectKey="STD_ZX_DEGREE" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="通讯地址" prop="postAddr">
                    <el-input type="text" v-model="indivCustUpdateForm.postAddr" maxlength="100" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="通讯地址邮政编码" prop="postCode">
                    <el-input type="text" v-model="indivCustUpdateForm.postCode" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="居住地址" prop="residAddr">
                    <el-input type="text" v-model="indivCustUpdateForm.residAddr" maxlength="100" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="居住地邮政编码" prop="residZipCode">
                    <el-input type="text" v-model="indivCustUpdateForm.residZipCode" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="居住状况" prop="residSts">
                    <elx-select type="text" v-model="indivCustUpdateForm.residSts" selectKey="STD_ZB_RESIDE_STATUS" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="家庭电话" prop="homePhone">
                    <el-input type="text" v-model="indivCustUpdateForm.homePhone" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="单位电话" prop="officePhone">
                    <el-input type="text" v-model="indivCustUpdateForm.officePhone" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input type="text" v-model="indivCustUpdateForm.mobile" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="传真" prop="faxNo">
                    <el-input type="text" v-model="indivCustUpdateForm.faxNo" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="电子邮箱" prop="email">
                    <el-input type="text" v-model="indivCustUpdateForm.email" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="其他联系方式" prop="otherMobile">
                    <el-input type="text" v-model="indivCustUpdateForm.otherMobile" maxlength="20" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="是否拥有外国护照或居住权" prop="haveFrgnPassport">
                    <elx-select type="text" v-model="indivCustUpdateForm.haveFrgnPassport" selectKey="STD_ZX_YES_NO" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否为长期证件" prop="longCertFlag">
                    <elx-select type="text" v-model="indivCustUpdateForm.longCertFlag" selectKey="STD_ZX_YES_NO" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>

        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="证件签发日期" prop="certBeginDate">
                    <el-date-picker v-model="indivCustUpdateForm.certBeginDate" type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd" :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="证件到期日" prop="certEndDate">
                    <el-date-picker  v-model="indivCustUpdateForm.certEndDate" type="date"
                                     placeholder="选择日期"
                                     @change="changeDate" value-format="yyyy-MM-dd" :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="是否我行员工" prop="innerEmpFlag">
                    <elx-select type="text" v-model="indivCustUpdateForm.innerEmpFlag" selectKey="STD_ZX_YES_NO" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="在我行开立账户情况" prop="holdOurAcct">
                    <el-input type="text" v-model="indivCustUpdateForm.holdOurAcct" maxlength="5" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="曾用名" prop="formerName">
                    <el-input type="text" v-model="indivCustUpdateForm.formerName" maxlength="100" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="推荐人" prop="presenter">
                    <el-input type="text" v-model="indivCustUpdateForm.presenter" maxlength="32" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="征信上报标志" prop="reportFlag">
                    <elx-select type="text" v-model="indivCustUpdateForm.reportFlag" selectKey="ZXJL" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="indivCustUpdateForm.remark" placeholder="请输入内容" maxlength="300" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around" v-if="operate === 'update'">
            <el-col :span="12">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('indivCustUpdateForm')">保 存</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
    import * as regex from "@/utils/regex";
    export default {
        name: 'indivCustUpdateForm',
        props: {
            custNo: String,
            operate:String

        },
        data() {
            return {
                indivCustUpdateForm: {},
                rules: {
                    homePhone: [
                        {pattern: regex.telExp, message: "座机号码格式不正确"}
                    ],
                    mobile: [
                        {pattern: regex.mbExp, message: "手机号码格式不正确"}
                    ],
                    officePhone: [
                        {pattern: regex.telExp, message: "座机号码格式不正确"}
                    ],
                    residZipCode: [
                        {pattern: regex.postExp, message: "邮政编码格式不正确"}
                    ],
                    postCode: [
                        {pattern: regex.postExp, message: "邮政编码格式不正确"}
                    ],
                    email: [
                        {pattern: regex.emailExp, message: "邮政编码格式不正确"}
                    ],
                    faxNo: [
                        {pattern: regex.faxExp, message: "传真格式不正确"}
                    ],

                },
                disabled:false,
                phoneVisible:false

            };
        },
        mounted: function () {
            this.initForm();
        },
        methods: {
            changeDate:function(){
                this.$nextTick(function () {
                    if(this.indivCustUpdateForm.certBeginDate > this.indivCustUpdateForm.certEndDate){
                        this.$error("证件到期日不能小于证件签发日期");
                    }
                })
            },
            initForm() {
                const _this = this;
                if(this.operate==="view"){
                    this.disabled = true;
                }
                this.$http.post("/loan/cusIndivAction.do?_md=findCustByCustNo", {
                    'custNo': _this.custNo
                }).then(function (response) {
                    if (response.success) {
                        _this.indivCustUpdateForm = response.data;
                       /* if (response.data.isSmsAlert === "1") {
                            _this.phoneVisible = true;
                        }*/

                    } else {
                        _this.$error(response.msg);
                    }
                }).catch(function (error) {
                    _this.$error(error);
                });

            },
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        _this.$http.post("/loan/cusIndivAction.do?_md=updateCusIndivInfoByCustNo", _this.indivCustUpdateForm).then(function (response) {
                            if (response.success) {
                                _this.$success("保存成功!");
                            } else {
                                _this.$error(response.msg)
                            }
                        }).catch(function (error) {
                            _this.$error(error);
                        });
                    } else {
                        _this.$error(response.msg);
                    }
                })

            },
            isPhone(value) {
                if (value == "1") {
                    this.phoneVisible = true;
                } else {
                    this.phoneVisible = false;
                }

            }
        }

    };
</script>