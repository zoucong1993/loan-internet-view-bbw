<!--liuyang-->
<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="job名称" prop="jobName">
                    <el-input type="text" v-model="form.jobName" placeholder="请输入job名称"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="job类型" prop="jobType">
                    <elx-select v-model="form.jobType" selectKey="JOBTYPE"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="交易日期类型" prop="trandateType">
                    <elx-select v-model="form.trandateType" selectKey="TRANDATETYPE"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="执行周期" prop="executePeriod">
                    <elx-select v-model="form.executePeriod" selectKey="EXECUTETYPE"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="job描述信息" prop="remark">
                    <el-input type="text" v-model="form.remark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
    import * as regex from "@/utils/regex";
    export default {
        name: 'jobDetailUpdate',
        props: {data: Object},
        data() {
            return {
                form: this.data,
                rules: {
                    jobName: [
                        {required: true, message: 'Job名称不能为空'}
                    ],
                    jobType: [
                        {required: true, message: 'Job类型不能为空'}
                    ],
                    trandateType: [
                        {required: true, message: '交易类型不能为空'}
                    ],
                    executePeriod: [
                        {required: true, message: '执行周期不能为空'}
                    ],
                    remark: [
                        {required: true, message: 'Job信息不能为空'}
                    ],
                }
            }
        },
        mounted() {
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.updateUser();
                    } else {
                        return false;
                    }
                });
            },
            updateUser() {
                const _this = this;
                this.$http.post("/loan/jobDetailAction.do?_md=updateByPrimaryKeySelective",
                    this.form).then(
                    function (response) {
                        if(response.success) {
                            _this.$success(response.msg);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog');
                        } else {
                            _this.$error(response.msg);
                        }
                    }
                ).catch(function (error) {
                    _this.$error(error.message);
                });
            }
        }
    };
</script>