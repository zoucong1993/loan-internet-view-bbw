<template>
    <el-form :model="indivCustAddForm" :rules="rules" ref="indivCustAddForm" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="客户类型" prop="custType">
                    <elx-select v-model="indivCustAddForm.custType" selectKey="STD_KHLX" :disabled="true">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="客户名称" prop="custName">
                    <el-input type="text" v-model="indivCustAddForm.custName" maxlength="100">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="客户简称" prop="custAbbrName">
                    <el-input type="text" v-model="indivCustAddForm.custAbbrName" maxlength="10">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="证件类型" prop="certType">
                    <elx-select v-model="indivCustAddForm.certType" placeholder="请选择证件类型" selectKey="STD_ZJLX">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="证件号码" prop="certNo">
                    <el-input type="text" v-model="indivCustAddForm.certNo" maxlength="32">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="证件号码复核" prop="certNo2">
                    <el-input type="text" v-model="indivCustAddForm.certNo2" maxlength="32">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="所属条线" prop="belongLine">
                    <elx-select v-model="indivCustAddForm.belongLine" selectKey="STD_ZB_BUSILINE" :disabled="true">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="主管客户经理" prop="custMgr">
                    <el-input placeholder="请输入内容" v-model="indivCustAddForm.custMgrName" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="selectMgr"></el-button>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="indivCustAddForm.custMgr" class="input-with-select" v-show="false"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="主管机构" prop="custOrg">
                    <el-input type="text" v-model="indivCustAddForm.custOrgName" :disabled="true"></el-input>
                    <el-input type="text" v-model="indivCustAddForm.custOrg" v-show="false"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item label="备注" prop="remark">
                    <el-input type="text" v-model="indivCustAddForm.remark" maxlength="100">
                    </el-input>
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
            </div>
        </el-dialog>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";
    import userList from './user';

    export default {
        name: 'indivCustAddForm',
        components: {
            userList
        },
        data() {
            let validateValue = (rule,value,callback) =>{
                if(value === ''){
                    callback(new Error('请填写证件号'));
                }else{
                    if(this.indivCustAddForm.certType === '110'){
                        //居民身份证做校验
                        let flag = regex.certNoExp.test(value);
                        if(!flag){
                            callback(new Error('请填写正确的大陆身份证件号码'));
                        }
                    }else{
                        callback();
                    }
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写证件号'));
                } else if (value !== this.indivCustAddForm.certNo) {
                    callback(new Error('两次输入证件号不一致!'));
                }else {
                    callback();
                }
            };
            return {
                indivCustAddForm: {
                    custType: "1",
                    certType: "110",
                    belongLine: "02",
                    custMgr: this.$sessionStorage.getLoginUser().user.userName,
                    custOrg: this.$sessionStorage.getLoginUser().user.orgId,
                    custOrgName: this.$sessionStorage.getLoginUser().org.name

                },
                rules: {
                    custType: [
                        {required: true, message: '请选择客户类型', trigger: 'blur'}
                    ],
                    custName: [
                        {required: true, message: '请输入客户名称', trigger: 'blur'}
                    ],
                    certType: [
                        {required: true, message: '请选择证件类型', trigger: 'blur'}
                    ],
                    certNo: [
                        {required: true,validator: validateValue, trigger: 'blur'}
                    ],
                    certNo2: [
                        {required: true,validator: validatePass, trigger: 'blur'}
                    ],
                    belongLine: [
                        {required: true, message: '请选择所属条线', trigger: 'blur'}
                    ],
                    custMgr: [
                        {required: true, message: '请填写客户主管经理', trigger: 'blur'}
                    ],
                    custOrg: [
                        {required: true, message: '请填写主管机构', trigger: 'blur'}
                    ]
                },
                userVisible: false
            };
        },
        watch: {},
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.indivCustAddForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/cusBaseInfoAction.do?_md=findCustByCertNo", {
                            certNo: this.indivCustAddForm.certNo
                        })
                            .then(function (response) {
                                if (response.success) {
                                    if(response.data != null){
                                        _this.$error("该客户已存在，不可重复添加！");
                                        return;
                                    }
                                    _this.$http.post("/loan/cusBaseInfoAction.do?_md=addCusBaseInfo", _this.indivCustAddForm)
                                        .then(function (response) {
                                            if (response.success) {
                                                _this.$emit('refreshTable');
                                                _this.$emit('addCustDialog');
                                                _this.$message({
                                                    showClose: true,
                                                    message: '新增成功！',
                                                    type: 'success',
                                                    duration: 2000
                                                });
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
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            selectMgr() {
                this.userVisible = true;
            },
            choose(){
                let user = this.$refs.userList.getSelectRows();
                this.indivCustAddForm.custMgr = user.userName;
                this.indivCustAddForm.custMgrName = user.empName;
                this.indivCustAddForm.custOrg = user.orgId;
                this.userVisible = false;
            },
            resetForm() {
                this.$refs.indivCustAddForm.resetFields();
            }
        }

    };
</script>