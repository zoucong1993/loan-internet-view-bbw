<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="渠道管理" name="first">
            <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="140px">

                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="渠道编码" prop="chanCode">
                            <el-input v-model="updateForm.chanCode" maxlength="32"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="渠道名称" prop="chanName">
                            <el-input v-model="updateForm.chanName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="渠道类型" prop="chanType">
                            <elx-select v-model="updateForm.chanType" selectKey="STD_LYQD"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="接入方式" prop="accessMode">
                            <elx-select v-model="updateForm.accessMode" selectKey="ACCESS_MODE"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="接入密钥" prop="secretKey">
                            <el-input v-model="updateForm.secretKey" maxlength="32"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="放款总额度" prop="lmtAmt">
                            <el-input v-model="updateForm.lmtAmt"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="单户限额" prop="dayLmtAmt">
                            <el-input v-model="updateForm.dayLmtAmt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否允许授信申请" prop="lmtApplyFlag">
                            <elx-select v-model="updateForm.lmtApplyFlag" selectKey="STD_ZX_YES_NO"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="是否允许签约" prop="loanSignFlag">
                            <elx-select v-model="updateForm.loanSignFlag" selectKey="STD_ZX_YES_NO"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否允许放款" prop="loanPayFlag">
                            <elx-select v-model="updateForm.loanPayFlag" selectKey="STD_ZX_YES_NO"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="生效时间" prop="beginDate">
                            <el-date-picker
                                    v-model="updateForm.beginDate"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="失效时间" prop="endDate">
                            <el-date-picker
                                    v-model="updateForm.endDate"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    @change="changeDate">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="渠道状态" prop="sts">
                            <elx-select v-model="updateForm.sts" selectKey="STD_QDSNZT"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="updateForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div align="center" style="margin-top: 15px;">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button type="danger" @click="onCancel">取消</el-button>
                </div>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="产品关联" name="second">
            <channel-prd-rel-list
                    :chanCode="chanCode" :chanName="chanName"
            >
            </channel-prd-rel-list>
        </el-tab-pane>
    </el-tabs>

</template>
<script>
    import * as regex from "@/utils/regex";
    import channelPrdRelList from './channelPrdRelList.vue';

    export default {
        name: 'channelUpdate',
        props: {
            chanCode: String,
            chanName: String,
            channel: {}
        },
        components: {
            channelPrdRelList
        },
        data() {
            /*let validateNumber = (rule, value, callback) =>{
                debugger
                let xx = this.$stringUtil.isNumeric();
                if (!xx) {
                    callback(new Error('请输入，请重新填写！'));
                } else {
                    callback();
                }
            };*/
            return {
                activeName: 'first',
                updateForm: this.channel,
                rules: {
                    chanCode: [
                        {required: true, message: '渠道编码不能为空'}
                    ],
                    chanName: [
                        {required: true, message: '渠道名称不能为空'}
                    ],
                    sts: [
                        {required: true, message: '状态不能为空'}
                    ],
                    lmtAmt: [
                        {pattern: regex.moneyExp, message: '请输入正确的金额格式'}
                    ],
                    dayLmtAmt: [
                        {pattern: regex.moneyExp, message: '请输入正确的金额格式'}
                    ]
                    /*secretKey:[{
                        required: true, validator:validateNumber, trigger:'change'
                    }]*/
                },
            }
        },
        methods: {
            changeDate: function () {
                this.$nextTick(function () {
                    if (this.updateForm.beginDate > this.updateForm.endDate) {
                        this.$error("失效日期不能小于生效日期");
                    }
                })
            },
            onSubmit() {
                const _this = this;
                this.$refs.updateForm.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.post("/loan/channelAction.do?_md=updateChannelDetail", _this.updateForm)
                        .then((response) => {
                            if (response.success) {
                                _this.$success(response.msg);
                                _this.$emit("closeDialog");
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                        .catch((error) => {
                            _this.$error(error.message);
                        });
                });
            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            }
        }
    };
</script>