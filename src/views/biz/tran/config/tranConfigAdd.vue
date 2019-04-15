<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="交易号" prop="tranCode">
                    <el-input v-model="addForm.tranCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="交易名称" prop="tranName">
                    <el-input v-model="addForm.tranName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="交易状态" prop="tranStatus">
                    <elx-select v-model="addForm.tranStatus" selectKey="STD_START_STOP"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="交易锁" prop="tranLock">
                    <elx-select v-model="addForm.tranLock" selectKey="STD_YES_NO"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit('addForm')">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>

</template>
<script>

    import tranConfigList from './tranConfigList';

    export default {
        name: 'tranConfigAdd',
        props: {
            addUrl: String
        },
        components: {
            tranConfigList
        },
        data() {
            return {
                addForm: {
                },
                rules: {
                    tranCode: [
                        {required: true, message: '交易号不能为空'}
                    ],
                    tranName: [
                        {required: true, message: '交易名称不能为空'}
                    ],
                    tranLock: [
                        {required: true, message: '交易锁不能为空'}
                    ]
                },
            }
        },
        mounted: function () {
        },
        methods: {
            onSubmit() {
                const _this = this;
                this.$refs.addForm.validate(valid => {
                    if(!valid){
                        return false;
                    }
                    this.$http.post(_this.addUrl,_this.addForm)
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