<template>
    <el-form ref="addBaseInfoForm" :rules="rules" :model="addBaseInfoForm" label-width="160px" size="mini">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="产品名称" prop="prdName">
                            <el-input type="text" v-model="addBaseInfoForm.prdName" placeholder="产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="产品编号" prop="prdCode">
                            <el-input type="text" v-model="addBaseInfoForm.prdCode" placeholder="产品ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="上级目录" prop="supCatalog">
                            <elx-select-tree type="text" v-model="addBaseInfoForm.supCatalog"
                                             :url="findCatalogSelectTreeUrl" placeholder="上级目录"></elx-select-tree>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="客户类型" prop="prdCustType">
                            <elx-select type="text" v-model="addBaseInfoForm.prdCustType" :disabled="disabled"
                                        selectKey="STD_KHLX"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="担保方式" prop="grtType">
                            <elx-select type="text" v-model="addBaseInfoForm.grtType" :disabled="disabled"
                                        selectKey="STD_ZB_ASSURE_MEANS"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="币种" prop="prdCcy">
                            <elx-select type="text" v-model="addBaseInfoForm.prdCcy" selectKey="STD_CCY_TYPE"
                                        :disabled="disabled" placeholder="币种"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="产品经理" prop="prdManager">
                            <el-input type="text" v-model="prdManagerName">
                                <el-button icon="el-icon-search" slot="append" @click="userVisible=true">
                                </el-button>
                            </el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="7" :offset="1">
                        <el-form-item label="生效日期" prop="beginDate">
                            <el-date-picker v-model="addBaseInfoForm.beginDate" type="date" placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                            :picker-options="startDateUtil"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="结束日期" prop="endDate">
                            <el-date-picker v-model="addBaseInfoForm.endDate" type="date" placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                            :picker-options="endDateUtil"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">

                    <el-col :span="7" :offset="1">
                        <el-form-item label="产品状态" prop="prdStatus">
                            <elx-select v-model="addBaseInfoForm.prdStatus" selectKey="STD_VALID_STS"
                                        style="width:100%;"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>期限信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="期限单位" prop="prdTermUnit">
                            <elx-select type="text" v-model="addBaseInfoForm.prdTermUnit" selectKey="TERM_UNIT"
                                        placeholder="期限单位"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="贷款期限下限（月）" prop="prdTermMin">
                            <el-input type="text" v-model="addBaseInfoForm.prdTermMin"
                                      placeholder="贷款期限下限（月）"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="贷款期限上限（月）" prop="prdTermMax">
                            <el-input type="text" v-model="addBaseInfoForm.prdTermMax"
                                      placeholder="贷款期限上限（月）"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="宽限期(天)" prop="gracePeriod">
                            <el-input type="text" v-model="addBaseInfoForm.gracePeriod" placeholder="宽限期"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="免息期(天)" prop="interestFree">
                            <el-input type="text" v-model="addBaseInfoForm.interestFree" placeholder="免息期"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>限额信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="产品总限额" prop="prdLimitAmt">
                            <elx-input type="money" v-model.number="addBaseInfoForm.prdLimitAmt" placeholder="产品总限额"></elx-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="单户限额金额" prop="sigLimitAmt">
                            <elx-input type="money" v-model.number="addBaseInfoForm.sigLimitAmt" placeholder="单户限额金额"></elx-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="额度循环标志" prop="creditCycle">
                            <elx-select type="text" v-model="addBaseInfoForm.creditCycle"
                                        selectKey="STD_YES_NO"></elx-select>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row type="flex" class="row-bg" justify="start">
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="额度有效期单位" prop="creditTermUnit">
                            <elx-select type="text" v-model="addBaseInfoForm.creditTermUnit"
                                        selectKey="CREDIT_TERM_UNIT"></elx-select>
                        </el-form-item>

                    </el-col>
                    <el-col :span="7"  :offset="1">
                        <el-form-item label="额度有效期" prop="creditTerm">
                            <el-input type="text" v-model="addBaseInfoForm.creditTerm" placeholder="额度有效期"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7"  :offset="1">
                    <el-form-item label="利率类型" prop="rateType">
                            <elx-select type="text" v-model="addBaseInfoForm.rateType" placeholder="利率类型"
                                        selectKey="STD_RATE_FLAG"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>放款信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7"  :offset="1">
                        <el-form-item label="放款控制金额" prop="payCtlAmt">
                            <elx-input type="money" v-model.number="addBaseInfoForm.payCtlAmt"
                                        placeholder="放款控制金额"
                                                             ></elx-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7"  :offset="1">
                        <el-form-item label="放款控制类型" prop="payCtlType">
                            <elx-select type="text" v-model="addBaseInfoForm.payCtlType"
                                        placeholder="放款控制类型"
                                        selectKey="PRD_PAY_CTL_TYPE"
                                                            ></elx-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7"  :offset="1">
                        <el-form-item label="放款控制单位" prop="payCtlUnit">
                            <elx-select type="text" v-model="addBaseInfoForm.payCtlUnit"
                                        placeholder="放款控制单位"
                                        selectKey="PRD_PAY_CTL_UNIT"
                                                            ></elx-select>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7"  :offset="1">
                        <el-form-item label="单笔提款最大金额" prop="sigPayAmtMax">
                            <elx-input type="money" v-model.number="addBaseInfoForm.sigPayAmtMax"
                                                    placeholder="单笔提款最大金额">

                            </elx-input>
                            </el-form-item>
                    </el-col>
                    <el-col :span="7"  :offset="1">
                        <el-form-item label="单笔提款最小金额" prop="sigPayAmtMin">
                            <elx-input type="money" v-model.number="addBaseInfoForm.sigPayAmtMin"
                                      placeholder="单笔提款最小金额">

                            </elx-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>白名单信息</span>
            </div>
            <div>
                <el-col :span="7"  :offset="1">
                    <el-form-item label-width="180px" label="白名单额度领取期限(天)" prop="whiteLmtTerm">
                        <el-input type="text" v-model="addBaseInfoForm.whiteLmtTerm" placeholder="白名单额度领取期限"></el-input>
                    </el-form-item>
                </el-col>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>管理信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="账务机构" prop="finaOrg">
                            <elx-select-tree :url="selectOrgTreeUrl" v-model="addBaseInfoForm.finaOrg" placeholder="账务机构"></elx-select-tree>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="登记人员" prop="createUserName">
                            <el-input type="text" v-model="createUserName" placeholder="登记人员" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="登记机构" prop="createUserOrg">
                            <el-input type="text" v-model="createUserOrg" placeholder="登记机构" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="登记日期" prop="createTime">
                            <elx-input  type="text" v-model="addBaseInfoForm.createTime" disabled
                            ></elx-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="7" :offset="1">
                        <el-form-item label="更新人员" prop="updateUserName">
                            <el-input type="text" v-model="updateUserName" placeholder="更新人员" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="更新机构" prop="updateUserOrgName">
                            <el-input type="text" v-model="updateUserOrgName" placeholder="更新机构" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="更新日期" prop="updateTime">
                            <el-input type="text" v-model="addBaseInfoForm.updateTime" placeholder="更新日期" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>

        <el-dialog
                title="选择"
                :visible.sync="userVisible"
                :close-on-click-modal="false"
                v-if="userVisible"
                :appendToBody="true"
                width="60%"
                v-drag>
            <prd-user-list ref="prdUserList" @closeDialog="userVisible=false" @getRows="getRows"
            ></prd-user-list>
        </el-dialog>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit('addBaseInfoForm')">提交</el-button>
            <el-button type="primary" @click="onCancel">取消</el-button>
        </div>
    </el-form>
</template>
<script>

    import * as regex from "@/utils/regex";
    import prdUserList from "./prdUser.vue";

    export default {
        name: 'productBaseInfoAdd',
        props: {
            addBaseInfoUrl: String,
            findCatalogSelectTreeUrl: String,
        },
        components:{
            prdUserList
        },
        data() {
            return {
                userVisible:false,
                selectOrgTreeUrl:"/loan/orgAction.do?_md=findAllVueTree",
                prdManagerName:'',
                addBaseInfoForm: {
                    prdManager:this.$sessionStorage.getLoginUser().user.userName,
                    prdStatus: '1',
                    supCatalog: '',
                    prdCcy: 'CNY',
                    beginDate: this.$dateUtil.getNowFormatDmatDate(),
                    creditTerm:'',
                    creditTermUnit:'D',
                    gracePeriod:'0',
                    interestFree:'0',
                    payCtlAmt:'',
                    payCtlType:'',
                    payCtlUnit:'',
                    sigPayAmtMin:'',
                    sigPayAmtMax:'',
                    whiteLmtTerm:'',
                    updateTime:this.$dateUtil.getNowFormatDmatTime(),
                    createTime:this.$dateUtil.getNowFormatDmatTime(),
                    createUser:this.$sessionStorage.getLoginUser().user.userName,
                    createOrg:this.$sessionStorage.getLoginUser().sessionMap.code,
                    updateUser:this.$sessionStorage.getLoginUser().user.userName,
                    updateOrg:this.$sessionStorage.getLoginUser().sessionMap.code,
                    selectKey: []
                },
                startDateUtil:{
                    disabledDate: (time) => {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                endDateUtil:{
                    disabledDate: (time) => {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                createUserName:this.$sessionStorage.getLoginUser().user.empName,
                empName:this.$sessionStorage.getLoginUser().user.empName,
                createUserOrg:this.$sessionStorage.getLoginUser().sessionMap.orgName,
                updateUserName:this.$sessionStorage.getLoginUser().user.empName,
                updateUserOrgName:this.$sessionStorage.getLoginUser().sessionMap.orgName,
                rules: {
                    prdName: [
                        {required: true, message: '请输入目录名称', trigger: 'blur'}
                    ],
                    prdCode: [
                        {required: true, message: '请输入产品编号', trigger: 'blur'}
                    ],
                    supCatalog: [
                        {required: true, message: '请输入上级目录', trigger: 'blur'}
                    ],
                    prdStatus: [
                        {required: true, message: '请输入有效状态', trigger: 'blur'}
                    ],
                    prdCustType: [
                        {required: true, message: '请输入客户类型', trigger: 'blur'}
                    ],
                    grtType: [
                        {required: true, message: '请输入担保方式', trigger: 'blur'}
                    ],
                    prdCcy: [
                        {required: true, message: '请输入币种', trigger: 'blur'}
                    ],
                    prdManager: [
                        {required: true, message: '请输入产品经理', trigger: 'blur'}
                    ],
                    beginDate: [
                        {required: true, message: '请输入生效日期', trigger: 'blur'}
                    ],
                    endDate: [
                        {required: true, message: '请输入结束日期', trigger: 'blur'}
                    ],
                    prdTermUnit: [
                        {required: true, message: '请输入期限单位', trigger: 'blur'}
                    ],
                    prdTermMin: [
                        {required: true, message: '请输入贷款期限下限（月）', trigger: 'blur'},
                        { pattern: regex.posInteExp2, message: '请输入正确的贷款期限下限'}
                    ],
                    prdTermMax: [
                        {required: true, message: '请输入贷款期限上限（月）', trigger: 'blur'},
                        { pattern: regex.posInteExp2, message: '请输入正确的贷款期限上限'}
                    ],
                    gracePeriod: [
                        {required: true, message: '请输入宽限期', trigger: 'blur'},
                        { pattern: regex.posInteExp2, message: '请输入正确的宽限期' }
                    ],
                    interestFree: [
                        {required: true, message: '请输入免息期', trigger: 'blur'},
                        { pattern: regex.posInteExp2, message: '请输入正确的免息期' }
                    ],
                    prdLimitAmt: [
                        {required: true, message: '请输入产品总限额', trigger: 'blur'},
                        { type: 'number', message: '请输入正确的产品总限额'}
                    ],
                    sigLimitAmt: [
                        {required: true, message: '请输入单户限额金额', trigger: 'blur'},
                        { type: 'number' , message: '请输入正确的单户限额金额'}
                    ],
                    payCtlAmt: [
                        {required: true, message: '请输入放款控制金额', trigger: 'blur'},
                        { type: 'number' , message: '请输入正确的放款控制金额'}
                    ],
                    sigPayAmtMin: [
                        {required: true, message: '请输入单笔提款最小金额', trigger: 'blur'},
                        { type: 'number' , message: '请输入正确的单笔提款最小金额'}
                    ],
                    sigPayAmtMax: [
                        {required: true, message: '请输入单笔提款最大金额', trigger: 'blur'},
                        { type: 'number' , message: '请输入正确的单笔提款最大金额'}
                    ],
                    payCtlType: [
                        {required: true, message: '请输入放款控制类型', trigger: 'blur'},
                    ],
                    payCtlUnit: [
                        {required: true, message: '请输入放款控制单位', trigger: 'blur'},
                    ],
                    sigLimitRate: [
                        {required: true, message: '请输入单户限额比例%', trigger: 'blur'}
                    ],
                    sigLimitType: [
                        {required: true, message: '请输入单户限额方式', trigger: 'blur'}
                    ],
                    creditCycle: [
                        {required: true, message: '请输入额度循环标志', trigger: 'blur'}
                    ],
                    limitedCustCredit: [
                        {required: true, message: '请输入是否受控客户额度', trigger: 'blur'}
                    ],
                    creditTermUnit: [
                        {required: true, message: '请输入额度有效期单位', trigger: 'blur'}
                    ],
                    creditTerm: [
                        {required: true, message: '请输入额度有效期', trigger: 'blur'},
                        { pattern: regex.posInteExp2, message: '请输入正确的额度有效期'}
                    ],
                    rateType: [
                        {required: true, message: '请输入利率类型', trigger: 'blur'}
                    ],
                    whiteLmtTerm: [
                        { pattern: regex.posInteExp2, message: '请输入正确的白名单额度领取期限'}
                    ],

                }
            }

        },
        created(){
            this.selectUserName(this.$sessionStorage.getLoginUser().user.userName)
        },
        methods: {
            getRows(rows){
                this.addBaseInfoForm.prdManager=rows.userName;
                this.selectUserName(this.addBaseInfoForm.prdManager)
                this.userVisible=false;
            },
            selectUserName(userName){
                const _this = this;
                this.$http
                    .post("/loan/userAction.do?_md=selectEmpNameByUserName",
                        {"userName": userName}
                    )
                    .then(function (response) {
                        if (response.success) {
                            _this.prdManagerName = response.data
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch(function (error) {
                        _this.$error(error.message);
                    });
            },
            onSubmit(a) {
                const _this = this;
                this.$refs[a].validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    this.$http
                        .post(this.addBaseInfoUrl,
                            this.addBaseInfoForm,
                        )
                        .then(function (response) {
                            console.log(response.success);
                            if (response.success) {
                                _this.$emit('refreshLeftTree');
                                _this.$emit('refreshTable');
                                _this.$emit('addBaseInfoDialog', _this.addBaseInfoForm.prdCode);
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                        .catch(function (error) {
                            _this.$error(error.message);
                        });
                });
            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            }
        }
    }
</script>