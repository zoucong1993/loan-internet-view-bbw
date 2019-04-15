<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="170px" size="small">
        <el-input v-model="updateForm.approveSts" v-show="false"></el-input>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>账户基本信息</span>
            </div>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="收款账户名称" prop="acctName">
                        <el-input type="text" v-model="updateForm.acctName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="收款账户账号" prop="acctNo">
                        <el-input type="text" v-model="updateForm.acctNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="收款账户预留手机号:" prop="acctPhone">
                        <el-input type="text" v-model="updateForm.acctPhone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="收款账户类型" prop="acctType">
                        <elx-select type="text" v-model="updateForm.acctType" placeholder="请baseRateUpdateFrom"
                                    selectKey="STD_ACTYPE"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="收款账户开户行名称" prop="acctBankName">
                        <el-input type="text" v-model="updateForm.acctBankName">
                            <!--<el-button icon="el-icon-circle-plus" slot="append" @click="custMgrViewVisible = true">选择-->
                            <!--</el-button>-->
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="收款账户超网行号" prop="acctBankSuperNo">
                        <el-input type="text" v-model="updateForm.acctBankSuperNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="收款账户银联行号" prop="acctBankUnionPayNo">
                        <el-input type="text" v-model="updateForm.acctBankUnionPayNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="收款账户支行联行号" prop="acctBankSubNo">
                        <el-input type="text" v-model="updateForm.acctBankSubNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="产品名称" prop="prdCode">
                        <elx-select-tree type="text" v-model="updateForm.prdCode"
                                         :url="selectPrdTreeUrl"></elx-select-tree>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>登记信息</span>
            </div>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="登记人员:" prop="createUserName">
                        <el-input v-model="updateForm.createUserName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="登记机构:" prop="createOrgName">
                        <elx-select-tree v-model="updateForm.createOrg" disabled :url="selectTreeUrl"></elx-select-tree>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="登记日期:" prop="createTime">
                        <el-input v-model="updateForm.createTime" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="更新人员:" prop="updateUserName">
                        <el-input v-model="updateForm.updateUserName" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="更新机构:" prop="updateOrgName">
                        <elx-select-tree v-model="updateForm.updateOrg" disabled :url="selectTreeUrl"></elx-select-tree>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="更新日期:" prop="updateTime">
                        <el-input v-model="updateForm.updateTime" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    export default {
        name: "accountUpdate",
        props: {
            accountInfo: Object,
        },
        data() {
            return {
                updateForm: this.accountInfo,
                selectTreeUrl: '/loan/orgAction.do?_md=findAllVueTree',
                selectPrdTreeUrl: '/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree',
                rules: {
                    acctNo: [
                        {required: true, message: '收款账户账号不能为空'}
                    ],
                    acctName: [
                        {required: true, message: '收款账户名称不能为空'}
                    ],
                    acctPhone: [
                        {required: true, message: '收款账户预留手机号不能为空'},
                    ],
                    acctType: [
                        {required: true, message: '收款账户类型不能为空'},
                    ],
                    acctBankName: [
                        {required: true, message: '收款账户开户行名称不能为空'},
                    ],
                    prdCode: [
                        {required: true, message: '产品名称不能为空'},
                    ],
                }
            }
        }
        ,
        methods: {
            onSubmit() {
                this.$refs.updateForm.validate((valid) => {
                    if (valid) {
                        this.saveAccount();
                    } else {
                        return false;
                    }
                });
            }
            ,
            saveAccount() {
                const _this = this;
                this.$http.post("/loan/accountAction.do?_md=updateAccount",
                    this.updateForm).then(
                    function (response) {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog');
                        } else {
                            _this.$error(response.msg);
                        }
                    }
                ).catch(function (error) {
                    _this.$error(error.message);
                });
            }
            ,
        }
    }
</script>
