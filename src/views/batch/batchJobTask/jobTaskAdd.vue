<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
                <el-form-item label="工作组编码" prop="groupCode">
                    <el-input v-model="addForm.groupCode" placeholder="请输入工作组编码">
                    </el-input>
                </el-form-item>
                <el-form-item label="工作组名称" prop="groupName">
                    <el-input v-model="addForm.groupName" placeholder="请输入工作组名称"></el-input>
                </el-form-item>
                <el-form-item label="描述信息" prop="remark">
                    <el-input  v-model="addForm.remark" placeholder="请输入描述信息" ></el-input>
                </el-form-item>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit('addForm')">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>

</template>
<script>
    export default {
        name: 'jobTaskAdd',
        props: {
            addUrl: String
        },
        components: {},
        data() {
            return {
                addUserVisible: false,
                addForm: {},
                rules: {
                    groupCode: [
                        {required: true, message: 'groupCode不能为空'}
                    ],
                    groupName: [
                        {required: true, message: 'groupName不能为空'}
                    ],
                    remark: [
                        {required: true, message: 'remark不能为空'}
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