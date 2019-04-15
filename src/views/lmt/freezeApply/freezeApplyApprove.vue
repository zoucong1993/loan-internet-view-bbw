<template>
    <el-form ref="viewForm" :model="viewForm" label-width="120px" disabled>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>业务申请基本信息</span>
            </div>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="客户编码" prop="custNo" disabled>
                        <el-input v-model="viewForm.custNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户姓名" prop="custName" disabled>
                        <el-input v-model="viewForm.custName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="申请编号" prop="applyNo" disabled>
                        <el-input v-model="viewForm.applyNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="授信协议编号" prop="agrNo" disabled>
                        <el-input v-model="viewForm.agrNo" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="冻结解冻类型" prop="bizType" disabled>
                        <elx-select v-model="viewForm.bizType" selectKey="STD_DJJD"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="授信币种" prop="ccy" disabled>
                        <elx-select v-model="viewForm.ccy" selectKey="STD_ZX_CUR_TYPE"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="授信金额" prop="agrAmt">
                        <el-input v-model="viewForm.agrAmt"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="冻结解冻金额" prop="bizAmt" disabled>
                        <el-input v-model="viewForm.bizAmt"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="冻结解冻原因" prop="bizReason" disabled>
                        <el-input v-model="viewForm.bizReason"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请状态" prop="approveSts" disabled>
                        <elx-select v-model="viewForm.approveSts" selectKey="SQZT"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="办结日期" prop="endDate" disabled>
                        <el-input v-model="viewForm.endDate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="登记人员" prop="createUser" disabled>
                        <el-input v-model="viewForm.createUser"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="登记机构" prop="createOrg" disabled>
                        <el-input v-model="viewForm.createOrg"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="登记日期" prop="createTime" disabled>
                        <el-input v-model="viewForm.createTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="冻结标志" prop="freezeFlag" disabled>
                        <el-input v-model="viewForm.freezeFlag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="备注" prop="remark" disabled>
                        <el-input v-model="viewForm.remark" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>

    </el-form>
</template>
<script>
    export default {
        name: 'freezeApplyApprove',
        props: {
            rowData: Object
        },
        data() {
            return {
                viewForm: {},
            }
        },
        mounted: function () {
            this.initForm();
        },
        methods: {
            initForm() {
                const _this = this;
                if(_this.rowData.busiInfo==='额度解冻')
                {
                    this.$http.post("/loan/freezeApplyAction.do?_md=selectByPrimaryKey", {"id": this.rowData.businessKey}
                    ).then(function (response) {
                        if (response.success) {
                            _this.viewForm = response.data;
                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch(function (error) {
                        _this.$error(error.message);
                    });
                }else if(_this.rowData.busiInfo==='额度冻结')
                {
                    this.$http.post("/loan/freezeApplyAction.do?_md=selectByApplyNoWhenFreeze", {"applyNo": this.rowData.businessKey}
                    ).then(function (response) {
                        if (response.success) {
                            _this.viewForm = response.data;
                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch(function (error) {
                        _this.$error(error.message);
                    });
                }

            },
        }
    };
</script>