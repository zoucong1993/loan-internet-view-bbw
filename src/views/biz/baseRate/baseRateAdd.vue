<template>
    <el-form ref="baseRateAddFrom" :rules="rules" :model="baseRateAddFrom" label-width="140px">
        <el-card class="box-card" shadow="never" >
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="利率名称" prop="rateName">
                    <el-input v-model="baseRateAddFrom.rateName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" >
                <el-form-item label="利率值" prop="rate">
                    <el-input v-model="baseRateAddFrom.rate"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="最小期限" prop="termMin">
                    <el-input v-model="baseRateAddFrom.termMin"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" >
                <el-form-item label="最大期限" prop="termMax">
                    <el-input v-model="baseRateAddFrom.termMax"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" :pull="6">
                <el-form-item label="生效日期" prop="effectDate">
                    <el-date-picker
                            v-model="baseRateAddFrom.effectDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="22">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="baseRateAddFrom.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card" shadow="never" >
            <div slot="header" class="clearfix">
                <span>登记人信息</span>
            </div>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10" >
                    <el-form-item label="登记人员" prop="createUserName">
                        <el-input v-model="baseRateAddFrom.createUserName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" >
                    <el-form-item label="登记机构" prop="createOrg">
                        <el-input v-model="baseRateAddFrom.createOrgName" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10" :pull="6">
                    <el-form-item label="登记日期" prop="createTime">
                        <el-input v-model="baseRateAddFrom.createTime" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>
</template>

<script>

    import * as regex from "@/utils/regex";

    export default {
        name: "baseRateAdd",
        data() {
            return {
                baseRateAddFrom: {
                    effectDate: this.$dateUtil.getNowFormatDmatDate(),
                    createUser: this.$sessionStorage.getLoginUser().user.userName,
                    createUserName: this.$sessionStorage.getLoginUser().user.empName,
                    createOrg: this.$sessionStorage.getLoginUser().user.orgId,
                    createOrgName: this.$sessionStorage.getLoginUser().orgName,
                    createTime: this.$dateUtil.getNowFormatDmatTime(),
                },
                rules: {
                    rateName:[
                        {required: true, message: '利率名称不能为空'}
                    ],
                    rate:[
                        {required: true, message: '利率值不能为空'},
                        {pattern: regex.numExp, message: "请输入正确的格式"}
                    ],
                    termMin:[
                        {required: true, message: '最小期限不能为空'},
                        {pattern: regex.posInteExp2, message: "请输入正确的格式"}
                    ],
                    termMax:[
                        {required: true, message: '最大期限不能为空'},
                        {pattern: regex.posInteExp2, message: "请输入正确的格式"}
                    ],
                    effectDate:[
                        {required: true, message: '生效日期不能为空'}
                    ],
                },
            }
        },
        methods:{
            onSubmit(){
                const _this = this;
                this.$http.post(
                    '/loan/baseRateAction.do?_md=installBaseRate',
                    _this.baseRateAddFrom
                ).then(function (response) {
                    if (response.success) {
                        _this.onCancel()
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            onCancel(){
                this.$emit('closeDialog')
                this.$emit('refreshTable')
            }
            },

    }
</script>
