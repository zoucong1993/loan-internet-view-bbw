<template>
    <el-form ref="baseRateUpdateFrom" :rules="rules" :model="baseRateUpdateFrom" label-width="140px">
        <el-card class="box-card" shadow="never" >
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10" >
                    <el-form-item label="利率名称" prop="rateName">
                        <el-input v-model="baseRateUpdateFrom.rateName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" >
                    <el-form-item label="利率值" prop="rate">
                        <el-input v-model="baseRateUpdateFrom.rate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10" >
                    <el-form-item label="最小期限" prop="termMin">
                        <el-input v-model="baseRateUpdateFrom.termMin"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" >
                    <el-form-item label="最大期限" prop="termMax">
                        <el-input v-model="baseRateUpdateFrom.termMax"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10" :pull="6">
                    <el-form-item label="生效日期" prop="effectDate">
                        <el-date-picker
                                v-model="baseRateUpdateFrom.effectDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="22" >
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="baseRateUpdateFrom.remark"></el-input>
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
                        <el-input v-model="createUserName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" >
                    <el-form-item label="登记机构" prop="createOrg">
                        <elx-select-tree v-model="baseRateUpdateFrom.createOrg" :url="selectTreeUrl"  disabled></elx-select-tree>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10" :pull="6">
                    <el-form-item label="登记日期" prop="createTime">
                        <el-input v-model="baseRateUpdateFrom.createTime" disabled></el-input>
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
        name: "baseRateUpdate",
        props:{
            rows:Object
        },
        data() {
            return {
                selectTreeUrl: '/loan/orgAction.do?_md=findAllVueTree',
                baseRateUpdateFrom:{

                },
                createUserName: '',
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
        created(){
            this.selectBaseRateById()
        },
        methods:{
            onSubmit(){
                const _this = this;
                this.$http.post(
                    '/loan/baseRateAction.do?_md=updateBaseRate',
                    _this.baseRateUpdateFrom
                ).then(function (response) {
                    if (response.success) {
                        _this.onCancel()
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            selectBaseRateById(){
                const _this = this;
                this.$http.post(
                    '/loan/baseRateAction.do?_md=selectBaseRateById',
                    {'id': _this.rows.id}
                ).then(function (response) {
                    if (response.success) {
                        _this.baseRateUpdateFrom = response.data
                        _this.selectEmpName()
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            selectEmpName(){
                const _this = this;
                this.$http.post(
                    '/loan/userAction.do?_md=selectEmpNameByUserName',
                    {'userName': _this.baseRateUpdateFrom.createUser}
                ).then(function (response) {
                    if (response.success) {
                        _this.createUserName = response.data
                    }
                }).catch(function (error) {
                    _this.$error(error.message);
                })
            },
            onCancel(){
                this.$emit('closeDialog')
                this.$emit('refreshTable')
            }
        }
    }
</script>

<style scoped>

</style>