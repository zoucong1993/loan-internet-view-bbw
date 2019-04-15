<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="job名称" prop="jobName">
                    <el-input v-model="updateForm.jobName">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="切分数据的步长" prop="perCount">
                    <el-input v-model="updateForm.perCount"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label="汇总sql" prop="summarySql">
                    <el-input v-model="updateForm.summarySql" type="textarea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label="切分sql" prop="perSql">
                    <el-input v-model="updateForm.perSql" type="textarea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('updateForm')">保存</el-button>
                    <el-button type="danger" @click="onCancel">取消</el-button>
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
</template>
<script>
    export default {
        name: 'jobTaskUpdate',
        props: {
            updateUrl: String,
            distConfigList: {}
        },
        data() {
            return {

                updateForm: this.distConfigList,

                rules: {
                    jobName: [
                        {required: true, message: 'job名称不能为空'}
                    ]
                }
            }
        },

        methods: {

            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        _this.$http.post(_this.updateUrl, _this.updateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$success("保存成功!");
                                    _this.$emit('refreshTable');
                                    _this.$emit('closeDialog');
                                } else {
                                    _this.$error(response.msg)
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    } else {
                        _this.$error(response.msg);
                    }
                })

            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            }
        }
    };
</script>