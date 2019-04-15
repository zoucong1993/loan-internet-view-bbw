<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="客户编号" prop="custNo">
                    <el-input v-model="updateForm.custNo" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="客户姓名" prop="custName">
                    <el-input v-model="updateForm.custName" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="证件类型" prop="certType">
                    <elx-select v-model="updateForm.certType" disabled selectKey="STD_ZJLX"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="证件号码" prop="certNo">
                    <el-input v-model="updateForm.certNo" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="移入日期" prop="blackDate">
                    <el-date-picker
                            v-model="updateForm.blackDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="注销日期" prop="cancelDate">
                    <el-date-picker
                            v-model="updateForm.cancelDate"
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
            <el-button type="primary" @click="onSubmit()">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>
</template>
<script>
    export default {
        name: 'blackListUpdate',
        props: {
            updateUrl: String,
            blackList: {}
        },
        data() {
            return {
                updateForm: this.blackList,
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
                    if (!valid) {
                        return false;
                    }
                    this.$http.post(_this.updateUrl, _this.updateForm)
                        .then((response) => {
                            if (response.success) {
                                _this.$success(response.msg);
                                _this.$emit('refreshTable');
                                _this.$emit('closeDialog');
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