<template>
    <div>
        <el-form ref="fundCreditInfoView" :model="fundCreditInfoView" label-width="80px" disabled="false">
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="业务编号">
                        <el-input v-model="fundCreditInfoView.applyNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="业务条线编号">
                        <el-input v-model="fundCreditInfoView.brPrdCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="客户编号">
                        <el-input v-model="fundCreditInfoView.custNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="客户姓名">
                        <el-input v-model="fundCreditInfoView.custName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="证件号码">
                        <el-input v-model="fundCreditInfoView.certNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="手机号码">
                        <el-input v-model="fundCreditInfoView.mobile"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="公积金查询编号">
                        <el-input v-model="fundCreditInfoView.fundTaskId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="百融全局设备标识">
                        <el-input v-model="fundCreditInfoView.brGid"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="发送时间">
                        <el-input v-model="fundCreditInfoView.reqTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="响应时间">
                        <el-input v-model="fundCreditInfoView.resTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="状态">
                        <elx-select selectKey="STD_SEND_STS" v-model="fundCreditInfoView.sts"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="百融流水号">
                        <el-input v-model="fundCreditInfoView.brSeriaNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="百融响应码">
                        <elx-select selectKey="BR_RES_CODE"  v-model="fundCreditInfoView.brSts"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="决策结果">
                        <el-input v-model="fundCreditInfoView.result"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="百融信用评分">
                        <el-input v-model="fundCreditInfoView.brCreditScore"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="百融建议额度">
                        <el-input v-model="fundCreditInfoView.adviceLines">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="本行余额">
                        <el-input v-model="fundCreditInfoView.orgBalance">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="其他金融机构余额">
                        <el-input v-model="fundCreditInfoView.otherOrgBalance">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :push="2">
                    <el-form-item label="最终授信额度">
                        <el-input v-model="fundCreditInfoView.creditLines">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="6">
                    <el-form-item label="客户评分档位系数">
                        <el-input v-model="fundCreditInfoView.gearsCoefficient"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "fundCreditInfoView",
        props:{rows:{}},
        data(){
            return {
                fundCreditInfoView:{}
            }
        },
        created(){
            this.selectInfoByKey()
        },
        methods:{
            selectInfoByKey(){
                const _this = this;
                this.$http.post('/loan/fundCreditInfoAction.do?_md=selectInfoByKey', {
                    'id': this.rows.id
                }).then(function (response) {
                    if (response.success) {
                        _this.fundCreditInfoView = response.data
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
