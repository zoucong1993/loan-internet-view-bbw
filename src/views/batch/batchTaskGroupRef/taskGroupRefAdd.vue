<!--yangzhu-  添加任务组下工作组  -->
<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="150px">
                <el-form-item label="任务编码" prop="taskCode">
                    <el-input v-model="addForm.taskCode" placeholder="请输入任务编码">
                    </el-input>
                </el-form-item>
                <el-form-item label="任务名称" prop="taskName">
                    <el-input v-model="addForm.taskName" placeholder="请输入任务名称"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <elx-select v-model="addForm.status" selectKey="BTH_TASK_STATUS">
                    </elx-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="addForm.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit('addForm')">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>
</template>

<script>
    export default {
        name: 'taskGroupRefAdd',
        components: {},
        data() {
            return {
                addUrl: "/loan/jobTaskAction.do?_md=addJobTask",
                addForm: {},
                rules: {
                    taskCode: [
                        {required: true, message: '任务编码不能为空'}
                    ],
                    taskName: [
                        {required: true, message: '任务名称不能为空'}
                    ],
                    remark: [
                        {required: true, message: '标示不能为空'}
                    ]
                },
            }
        },
        methods: {
            onSubmit() {
                const _this = this;
                this.$refs.addForm.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.post(_this.addUrl, _this.addForm)
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