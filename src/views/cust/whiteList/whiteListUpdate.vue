<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="客户编号" prop="custNo">
                    <el-input v-model="updateForm.custNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="客户姓名" prop="custName">
                    <el-input v-model="updateForm.custName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="证件类型" prop="certType">
                    <elx-select v-model="updateForm.certType" selectKey="STD_ZJLX"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="证件号码" prop="certNo">
                    <el-input v-model="updateForm.certNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="产品名称" prop="prdCode">
                    <elx-select-tree type="text" v-model="updateForm.prdCode"
                                     :url="selectPrdTreeUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="updateForm.mobile"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="利率类型" prop="rateType">
                    <elx-select v-model="updateForm.rateType" selectKey="STD_RATE_FLAG"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="执行利率" prop="actualRate">
                    <el-input v-model="updateForm.actualRate"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="授信额度" prop="lmtAmt">
                    <el-input v-model="updateForm.lmtAmt"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="创建方式" prop="createType" >
                    <elx-select v-model="updateForm.createType" selectKey="STD_MDTJLX" disabled></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="生效日期" prop="beginDate">
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
                <el-form-item label="失效日期" prop="endDate">
                    <el-date-picker
                            v-model="updateForm.endDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="updateForm.remark" type="textarea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>
</template>
<script>
    export default {
        name: 'whiteListUpdate',
        props: {
            updateUrl: String,
            whiteList:{}
        },
        data() {
            return {
                updateForm: this.whiteList,
                selectPrdTreeUrl:'/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree',
                rules: {
                    custName: [
                        {required: true, message: '客户姓名不能为空'}
                    ],
                    custNo: [
                        {required: true, message: '客户表号不能为空'}
                    ]
                },
            }
        },
        methods: {
            onSubmit() {
                const _this = this;
                this.$refs.updateForm.validate(valid => {
                    if(!valid){
                        return false;
                    }
                    this.$http.post(_this.updateUrl,_this.updateForm)
                        .then((response) => {
                            if(response.success){
                                _this.$success(response.msg);
                                _this.$emit('refreshTable');
                                _this.$emit('closeDialog');
                            }else{
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