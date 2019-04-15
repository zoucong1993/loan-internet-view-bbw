<template>
    <el-form :model="indivCustBaseInfoUpdateForm" :rules="rules" ref="indivCustBaseInfoUpdateForm" label-width="135px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="客户类型" prop="custType">
                    <elx-select v-model="indivCustBaseInfoUpdateForm.custType" selectKey="STD_KHLX" :disabled="true">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户名称" prop="custName">
                    <el-input type="text" v-model="indivCustBaseInfoUpdateForm.custName" maxlength="100" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="客户简称">
                    <el-input type="text" v-model="indivCustBaseInfoUpdateForm.custAbbrName" maxlength="10" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="证件类型" prop="certType">
                    <elx-select v-model="indivCustBaseInfoUpdateForm.certType" placeholder="请选择证件类型" selectKey="STD_ZJLX"
                                style="width:100%;" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="证件号码" prop="certNo">
                    <el-input type="text" v-model="indivCustBaseInfoUpdateForm.certNo" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所属条线" prop="belongLine">
                    <elx-select v-model="indivCustBaseInfoUpdateForm.belongLine" selectKey="STD_ZB_BUSILINE" :disabled="true">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="国家" prop="custCountry">
                    <elx-select type="text" v-model="indivCustBaseInfoUpdateForm.custCountry" selectKey="STD_GB_2659-2000" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="开户日期" prop="openDate">
                    <el-input type="text" v-model="indivCustBaseInfoUpdateForm.openDate" :disabled="true" >
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="主管客户经理" prop="custMgr">
                    <el-input placeholder="请输入内容" v-model="indivCustBaseInfoUpdateForm.custMgrName" class="input-with-select" :disabled="disabled">
                    </el-input>
                    <el-input v-model="indivCustBaseInfoUpdateForm.custMgr" type="text" v-show="false"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="主管机构" prop="custOrg">
                    <el-input type="text" v-model="indivCustBaseInfoUpdateForm.custOrgName" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="信用等级" prop="custCredGrade">
                    <elx-select type="text" v-model="indivCustBaseInfoUpdateForm.custCredGrade" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户等级" prop="custGrade">
                    <elx-select type="text" v-model="indivCustBaseInfoUpdateForm.custGrade" selectKey="STD_ZB_CREDIT_GRADE" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">

            <el-col :span="12">
                <el-form-item label="担保信用等级" prop="grtCredGrade">
                    <elx-select type="text" v-model="indivCustBaseInfoUpdateForm.grtCredGrade" selectKey="STD_ZB_CREDIT_GRADE" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="信用评定到期日期" prop="custCredEndDate">
                    <el-date-picker
                            v-model="indivCustBaseInfoUpdateForm.custCredEndDate"
                            type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd" :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="客户状态" prop="custSts">
                    <elx-select type="text" v-model="indivCustBaseInfoUpdateForm.custSts" selectKey="CUST_STS" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否开通短信通知" prop="isSmsAlert">
                    <elx-select type="text" v-model="indivCustBaseInfoUpdateForm.isSmsAlert" selectKey="STD_ZX_YES_NO"
                                @input="isPhone" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start" v-if="phoneVisible">
            <el-col :span="12">
                <el-form-item label="手机号码" prop="smsPhone">
                    <el-input type="text" v-model="indivCustBaseInfoUpdateForm.smsPhone" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder="请输入内容" v-model="indivCustBaseInfoUpdateForm.remark" maxlength="100" :disabled="disabled">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around" v-if="operate === 'update'">
            <el-col :span="12">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('indivCustBaseInfoUpdateForm')">保 存</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-dialog
                title="选择客户经理"
                :visible.sync="userVisible"
                v-if="userVisible"
                append-to-body
                width="60%">
            <user-list ref="userList"></user-list>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button type="primary" @click="choose">选 择</el-button>
                <el-button type="danger" @click="userVisible = false">取 消</el-button>
                <el-button type="primary" size="small" icon="el-icon-search">查询</el-button>
                <el-button type="info" size="small" icon="el-icon-loan-reset">重置</el-button>
            </div>
        </el-dialog>
    </el-form>

</template>
<script>
    import userList from './user';
    import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";
    export default {
        name: 'indivCustBaseInfoUpdateForm',
        props: {
            addVisible: {
                type: Boolean,
                default: false
            },
            custNo: String,
            operate:String

        },
        components: {
            ElInput,
            userList
        },
        data() {
            return {
                indivCustBaseInfoUpdateForm: {},
                rules: {
                    custName: [
                        {required: true, message: '请输入客户名称', trigger: 'change'}
                    ],
                    certType: [
                        {required: true, message: '请选择证件类型', trigger: 'blur'}
                    ],
                    certNo: [
                        {required: true, message: '请输入证件号码', trigger: 'change'}
                    ],
                   ngLine: [
                        {required: true, message: '请选择所属条线', trigger: 'blur'}
                    ],
                    custMgrName: [
                        {required: true, message: '请填写客户主管经理', trigger: 'blur'}
                    ],
                    custOrgName: [
                        {required: true, message: '请填写主管机构', trigger: 'blur'}
                    ]
                },
                phoneVisible: false,
                userVisible:false,
                disabled:false
            };
        },
        mounted: function () {
            this.initForm();
        },
        methods: {
            initForm() {
                const _this = this;
                if(this.operate==="view"){
                    this.disabled = true;
                }
                this.$http.post("/loan/cusBaseInfoAction.do?_md=findCustByCustNo", {
                    custNo: this.custNo
                }).then(function (response) {
                    if (response.success) {
                        _this.indivCustBaseInfoUpdateForm = response.data;
                        if (response.data.isSmsAlert === "1") {
                            _this.phoneVisible = true;
                        }

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
                        _this.$http.post("/loan/cusBaseInfoAction.do?_md=updateCusBaseInfoByCustNo", _this.indivCustBaseInfoUpdateForm)
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
            selectMgr() {
                this.userVisible = true;
            },
            choose(){
                let user = this.$refs.userList.getSelectRows();
                this.indivCustBaseInfoUpdateForm.custMgr = user.userName;
                this.indivCustBaseInfoUpdateForm.custMgrName = user.empName;
                this.indivCustBaseInfoUpdateForm.custOrg = user.orgId;
                this.userVisible = false;
            },
            isPhone(value) {
                this.indivCustBaseInfoUpdateForm.smsPhone="";
                if (value == "1") {
                    this.phoneVisible = true;
                } else {
                    this.phoneVisible = false;
                }

            }
        }

    };
</script>