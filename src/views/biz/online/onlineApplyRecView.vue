<template>
    <el-form :model="onlineApplyRecViewForm" :rules="rules" ref="onlineApplyRecViewForm"
             label-width="140px">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="交易流水号" prop="seriNo">
                            <el-input type="text" v-model="onlineApplyRecViewForm.seriNo" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="请求客户号" prop="custNo">
                            <el-input type="text" v-model="onlineApplyRecViewForm.custNo" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品名称" prop="prdCode">
                            <elx-select-tree v-model="onlineApplyRecViewForm.prdCode" :url="prdUrl"
                                             :disabled="true" size="mini"></elx-select-tree>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="交易码" prop="tranCode">
                            <el-input type="text" v-model="onlineApplyRecViewForm.tranCode" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="交易日期" prop="tranDate">
                            <el-input type="text" v-model="onlineApplyRecViewForm.tranDate" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="接入系统标识" prop="sysCode">
                            <el-input type="text" v-model="onlineApplyRecViewForm.sysCode" selectKey="STD_OL_APP_SYS_CODE" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="正反交易标识" prop="reverseTran">
                            <elx-select v-model="onlineApplyRecViewForm.reverseTran" selectKey="STD_TRADETYPE"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="金额" prop="bizAmt">
                            <el-input type="text" v-model="onlineApplyRecViewForm.bizAmt" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="处理流程时间" prop="processTime">
                            <el-input type="text" v-model="onlineApplyRecViewForm.processTime" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>请求与响应信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="24">
                        <el-form-item label="请求报文" prop="reqData">
                            <el-input type="textarea" v-model="onlineApplyRecViewForm.reqData" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="接收请求的时间" prop="reqTime">
                            <el-input type="text" v-model="onlineApplyRecViewForm.reqTime" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="24">
                        <el-form-item label="响应报文" prop="respData">
                            <el-input type="textarea" v-model="onlineApplyRecViewForm.respData" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="响应码" prop="respCode">
                            <el-input v-model="onlineApplyRecViewForm.respCode" :disabled="true" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="响应信息" prop="respMesg">
                            <el-input type="text" v-model="onlineApplyRecViewForm.respMesg" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="响应时间" prop="respTime">
                            <el-input type="text" v-model="onlineApplyRecViewForm.respTime" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>渠道信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="来源渠道" prop="chanCode">
                            <elx-select v-model="onlineApplyRecViewForm.chanCode" selectKey="STD_LYQD"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="渠道操作系统" prop="chanSystem">
                            <elx-select v-model="onlineApplyRecViewForm.chanSystem" selectKey="QDXT"
                                        :disabled="true" size="mini"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="设备识别码" prop="devices">
                            <el-input type="text" v-model="onlineApplyRecViewForm.devices" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="wifi mac地址" prop="wifiMac">
                            <el-input type="text" v-model="onlineApplyRecViewForm.wifiMac" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="gps地址信息" prop="gps">
                            <el-input type="text" v-model="onlineApplyRecViewForm.gps" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>地址信息</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg" justify="space-around">

                    <el-col :span="8">
                        <el-form-item label="省" prop="areaProvince">
                            <el-input type="text" v-model="onlineApplyRecViewForm.areaProvince" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="市" prop="areaCity">
                            <el-input type="text" v-model="onlineApplyRecViewForm.areaCity" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="县" prop="areaCounty">
                            <el-input type="text" v-model="onlineApplyRecViewForm.areaCounty" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="8">
                        <el-form-item label="乡镇街道" prop="areaTown">
                            <el-input type="text" v-model="onlineApplyRecViewForm.areaTown" :disabled="true"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </el-form>
</template>
<script>
    export default {
        name: 'onlineApplyRecViewForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {
                onlineApplyRecViewForm: this.row,
                rules: {},
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree"
            };
        },
        mounted: function () {
            this.initForm();
        },
        methods: {
            initForm() {
                this.onlineApplyRecViewForm.bizAmt = this.$moneyUtil.thousandsChange(this.onlineApplyRecViewForm.bizAmt);
            }
        }
    };
</script>