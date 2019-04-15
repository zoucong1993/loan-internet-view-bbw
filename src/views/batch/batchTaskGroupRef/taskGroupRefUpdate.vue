<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="工作组编码" prop="taskCode">
                    <el-input v-model="addForm.taskCode">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="工作组名称" prop="taskName">
                    <el-input v-model="addForm.taskName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <el-form-item label="状态" prop="status">
                    <elx-select v-model="addForm.status" selectKey="BTH_TASK_STATUS">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="描述信息" prop="remark">
                    <el-input v-model="addForm.remark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit('addForm')">修改</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>
</template>
<script>
    export default {
        name: 'jobTaskUpdate',

        props: {
            updateUrl: String,
            jobTaskList: {}
        },
        data() {
            return {
                addForm: this.jobTaskList,
                disabled: false
            }
        },
        methods: {
            onSubmit() {
                const _this = this;
                this.$refs.addForm.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.post(_this.updateUrl, _this.addForm)
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