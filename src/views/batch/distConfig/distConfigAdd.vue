<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="job名称" prop="jobName">
                    <el-input v-model="addForm.jobName">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="切分数据的步长" prop="perCount">
                    <el-input v-model="addForm.perCount"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label="汇总sql" prop="summarySql">
                    <el-input v-model="addForm.summarySql" type="textarea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label="切分sql" prop="perSql">
                    <el-input v-model="addForm.perSql" type="textarea"></el-input>
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


    export default {
        name: 'distConfigAdd',
        props: {
            addUrl: String
        },
        components: {},
        data() {
            return {
                addForm: {},
                rules: {
                    jobName: [
                        {required: true, message: 'job名称不能为空'}
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