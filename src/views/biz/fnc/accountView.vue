<template>
    <el-form ref="viewForm" :model="viewForm" label-width="170px" size="small" disabled>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>账户基本信息</span>
            </div>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="收款账户名称" prop="acctName">
                        <el-input type="text" v-model="viewForm.acctName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="收款账户账号" prop="acctNo">
                        <el-input type="text" v-model="viewForm.acctNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="收款账户预留手机号:" prop="acctPhone">
                        <el-input type="text" v-model="viewForm.acctPhone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="收款账户类型" prop="acctType">
                        <elx-select type="text" v-model="viewForm.acctType" placeholder="请选择"
                                    selectKey="STD_ACTYPE"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="收款账户开户行名称" prop="acctBankName">
                        <el-input type="text" v-model="viewForm.acctBankName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="收款账户超网行号" prop="acctBankSuperNo">
                        <el-input type="text" v-model="viewForm.acctBankSuperNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="收款账户银联行号" prop="acctBankUnionPayNo">
                        <el-input type="text" v-model="viewForm.acctBankUnionPayNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="收款账户支行联行号" prop="acctBankSubNo">
                        <el-input type="text" v-model="viewForm.acctBankSubNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="10">
                    <el-form-item label="产品名称" prop="prdCode">
                        <elx-select-tree type="text" v-model="viewForm.prdCode"
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
                        <el-input v-model="viewForm.createUserName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="登记机构:" prop="createOrgName">
                        <elx-select-tree v-model="viewForm.createOrg" disabled :url="selectTreeUrl"></elx-select-tree>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="登记日期:" prop="createTime">
                        <el-input v-model="viewForm.createTime" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="更新人员:" prop="updateUserName">
                        <el-input v-model="viewForm.updateUserName" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="更新机构:" prop="updateOrgName">
                        <elx-select-tree v-model="viewForm.updateOrg" disabled :url="selectTreeUrl"></elx-select-tree>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="更新日期:" prop="updateTime">
                        <el-input v-model="viewForm.updateTime" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    export default {
        name: "accountView",
        props: {
            accountInfo: Object,
        },
        data() {
            return {
                viewForm: this.accountInfo,
                selectTreeUrl: '/loan/orgAction.do?_md=findAllVueTree',
                selectPrdTreeUrl: '/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree',
            }
        }
    }
</script>
