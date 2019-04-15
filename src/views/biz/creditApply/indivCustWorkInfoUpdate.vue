<template>
    <div>
        <el-form :model="indivCustWorkUpdateForm" :rules="rules" ref="indivCustWorkUpdateForm" label-width="120px" disabled >
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
                                    >
                        </elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位名称" prop="compName">
                        <el-input v-model="indivCustWorkUpdateForm.compName" >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form-item label="公司所属行业" prop="industry">
                        <elx-select v-model="indivCustWorkUpdateForm.industry" placeholder="请选择行业类型"
                                    selectKey="STD_GB_COM_TYPE" >
                        </elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司地址" prop="compAddr">
                        <el-input v-model="indivCustWorkUpdateForm.compAddr" >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form-item label="单位邮政编码" prop="compZip">
                        <el-input type="text" v-model="indivCustWorkUpdateForm.compZip" >
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="入职日期" prop="beginDate">
                        <el-date-picker v-model="indivCustWorkUpdateForm.beginDate" type="date" value-format="yyyy-MM-dd"
                                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form-item label="本人职务" prop="duty">
                        <elx-select type="text" v-model="indivCustWorkUpdateForm.duty" selectKey="STD_ZX_DUTY"
                                    >
                        </elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="职级" prop="dutyLevel">
                        <elx-select v-model="indivCustWorkUpdateForm.dutyLevel" selectKey="XDZW" >
                        </elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form-item label="职称" prop="caste">
                        <elx-select type="text" v-model="indivCustWorkUpdateForm.caste" selectKey="STD_ZX_TITLE"
                                    >
                        </elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否本单位" prop="interComp">
                        <elx-select type="text" v-model="indivCustWorkUpdateForm.interComp" selectKey="STD_ZX_YES_NO"
                                    >
                        </elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form-item label="内部职级" prop="interDutyLevel">
                        <elx-select v-model="indivCustWorkUpdateForm.interDutyLevel" selectKey="XDZW" >
                        </elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工作年限" prop="workYear">
                        <el-input type="text" v-model="indivCustWorkUpdateForm.workYear" >
                            <template slot="append">年</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form-item label="年收入" prop="annualIncome">
                        <el-input type="text" v-model="indivCustWorkUpdateForm.annualIncome"  @change="handleMoney">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在部门" prop="dept">
                        <el-input type="text" v-model="indivCustWorkUpdateForm.dept" >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form-item label="单位性质" prop="compNature">
                        <elx-select type="text" v-model="indivCustWorkUpdateForm.compNature" selectKey="STD_ZB_UNIT_TYPE"
                                    >
                        </elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位规模" prop="compScale">
                        <el-input type="text" v-model="indivCustWorkUpdateForm.compScale" >
                            <template slot="append">人</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form-item label="工资账户开户行" prop="salAcctBank">
                        <el-input type="text" v-model="indivCustWorkUpdateForm.salAcctBank" >
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工资账号" prop="salAcctNo">
                        <el-input type="text" v-model="indivCustWorkUpdateForm.salAcctNo" >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "indivCustWorkInfoUpdate",
        props: {
            applyNo1:'',
        },
        data(){
            return{
                indivCustWorkUpdateForm:{},
            }
        },
        mounted(){
            this.selectByApplyNo()
        },
        methods:{
            selectByApplyNo(){
                const _this = this;
                this.$http.post('/loan/bizCusIndivWorkAction.do?_md=selectByApplyNo', {
                    'applyNo': _this.applyNo1
                }).then(function (response) {
                    if (response.success) {
                        _this.indivCustWorkUpdateForm = response.data
                    } else {
                        _this.$error(response.msg)
                    }
                }).catch(function (error) {
                    _this.$error(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>