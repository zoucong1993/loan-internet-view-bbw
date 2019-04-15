<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="交易号" prop="tranCode">
                    <el-input v-model="updateForm.tranCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="交易名称" prop="tranName">
                    <el-input v-model="updateForm.tranName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="交易状态" prop="tranStatus">
                    <elx-select selectKey="STD_START_STOP " v-model="updateForm.tranStatus"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1" >
                <el-form-item label="交易锁" prop="tranLock">
                    <elx-select v-model="updateForm.tranLock" selectKey="STD_YES_NO"></elx-select>
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
        components: {},
        name: 'tranConfigUpdate',
        props: {
            tranConfig: {}
        },
        data() {
            return {
                updateForm: this.tranConfig,
                rules: {
                    tranCode: [
                        {required: true, message: '交易号不能为空'}
                    ],
                    tranName: [
                        {required: true, message: '交易名称不能为空'}
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
                    this.$http.post("/loan/tranConfigAction.do?_md=updateConfig", _this.updateForm)
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




