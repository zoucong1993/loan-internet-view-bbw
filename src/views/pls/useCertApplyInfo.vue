<template>
    <div>
        <el-container style="height:700px; border: 1px solid #eee">
            <el-aside width="220px" style="background-color: #eee">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-aside>
            <el-container  v-if="viewImg">
                <el-main>
                    <div class="imgwrap">
                        <div class="img_inner" v-for="src in imgData" align="center">
                            <viewer :imgData="imgData">
                                <img :src="src[1]" width="200px" height="140px"/>
                            </viewer>
                        </div>
                    </div>
                </el-main>
            </el-container>
            <el-container v-if="viewInfo">
                <el-main>
                    <div>
                        <el-card  class="box-card" shadow="never">
                            <el-form :model="useCertApplyForm" ref="useCertApplyForm"
                                     :disabled="true">
                                <el-row type="flex" class="row-bg" justify="space-around">
                                    <el-col :span="6">
                                        <el-form-item label="申请编号" prop="applyNo">
                                            <el-input v-model="useCertApplyForm.applyNo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="客户编号" prop="custNo">
                                            <el-input v-model="useCertApplyForm.custNo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" justify="space-around">
                                    <el-col :span="6">
                                        <el-form-item label="客户名称" prop="custName">
                                            <el-input v-model="useCertApplyForm.custName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="产品编码" prop="prdCode">
                                            <el-input v-model="useCertApplyForm.prdCode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" justify="space-around">
                                    <el-col :span="6">
                                        <el-form-item label="合同编号" prop="contNo">
                                            <el-input v-model="useCertApplyForm.contNo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="借据编号" prop="duebillNo">
                                            <el-input v-model="useCertApplyForm.duebillNo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" justify="space-around">
                                    <el-col :span="6">
                                        <el-form-item label="放款日期" prop="payoutDate">
                                            <el-input v-model="useCertApplyForm.payoutDate"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="贷款金额" prop="loanAmt">
                                            <el-input v-model="useCertApplyForm.loanAmt"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" justify="space-around">
                                    <el-col :span="6">
                                        <el-form-item label="贷款用途" prop="loanUse">
                                            <el-input v-model="useCertApplyForm.loanUse"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="申请时间" prop="applyTime">
                                            <el-input v-model="useCertApplyForm.applyTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" justify="space-around">
                                    <el-col :span="6">
                                        <el-form-item label="完成时间" prop="endTime">
                                            <el-input v-model="useCertApplyForm.endTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="审批状态" prop="approveSts">
                                            <el-input v-model="useCertApplyForm.approveSts"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" justify="space-around">
                                    <el-col :span="6">
                                        <el-form-item label="登记人员" prop="createUser">
                                            <el-input v-model="useCertApplyForm.createUser"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="登记机构" prop="createOrg">
                                            <el-input v-model="useCertApplyForm.createOrg"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row  type="flex" class="row-bg" justify="space-around">
                                    <el-col :span="6" :pull="6">
                                        <el-form-item   label="登记日期" prop="createTime">
                                            <el-input v-model="useCertApplyForm.createTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </el-card>

                    </div>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "useCertApplyInfo",
        props:{
            applyNo:String
        },
        data() {
            return {
                useCertApplyForm:{},
                imgData:{},
                viewImg:false,
                viewInfo:true,
                manageId:'',
                data: [{
                    label: '凭证基本信息',
                    id:'1'
                }, {
                    label: '凭证图片信息',
                    id:'2'
                },]

            };
        },
        mounted(){
            this.selectVoucherInfo()
            this.selectVoucherManageId();
        },
        methods:{
            selectVoucherInfo(){
                const _this = this;
                this.$http.post (
                    "/loan/plsUseCertApplyAction.do?_md=selectVoucherInfo",
                    {"applyNo": this.applyNo}
                ) .then((response) => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.useCertApplyForm = response.data

                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch((error) => {
                        _this.$error(error.message);
                    });

            },
            selectVoucherManageId() {
                const _this = this;
                this.$http.post (
                    "/loan/bizFileManageAction.do?_md=selectByApplyNo",
                    {"applyNo": this.applyNo}
                ) .then((response) => {
                    if (response.success) {
                        _this.manageId = response.data.id
                        this.selectVoucherImg();
                    } else {
                        _this.$error(response.msg);
                    }
                })
                    .catch((error) => {
                        _this.$error(error.message);
                    });
            },
            selectVoucherImg(){
                const _this = this;
                this.$http.post (
                    "/loan/upDownloadAction.do?_md=previewPicture",
                    {"id": _this.manageId}
                ) .then((response) => {
                    if (response.success) {
                        _this.$success(response.msg);
                        this.imgData = response.data
                    } else {
                        _this.$error(response.msg);
                    }
                })
                    .catch((error) => {
                        _this.$error(error.message);
                    });
            },
            handleNodeClick(data){
                if (data.id === '1'){
                    this.viewInfo = true
                    this.viewImg = false
                }
                if (data.id === '2'){
                    this.viewInfo = false
                    this.viewImg = true
                }

            }
        }
    }
</script>


<style>
    .imgwrap {
        display: flex;
        flex-wrap: wrap;
    }

    .img_inner {
        margin: 1rem;
        cursor: pointer;
    }
</style>
