<!--liuyang-->
<!--yangzhu改动-->
<template>
    <el-form ref="addForm" :model="form" label-width="120px">
        <el-form-item label="job名称" prop="jobName">
            <el-input type="text" v-model="form.jobName" placeholder="请输入job名称"></el-input>
        </el-form-item>
        <el-form-item label="job类型" prop="jobType">
            <elx-select v-model="form.jobType" selectKey="JOBTYPE" placeholder="请输入job类型"></elx-select>
        </el-form-item>
        <el-form-item label="交易日期类型" prop="trandateType">
            <elx-select v-model="form.trandateType" selectKey="TRANDATETYPE" placeholder="请输入日期类型"></elx-select>
        </el-form-item>
        <el-form-item label="执行周期" prop="executePeriod">
            <elx-select v-model="form.executePeriod" selectKey="EXECUTETYPE" placeholder="请输入执行周期"></elx-select>
        </el-form-item>
        <el-form-item label="job描述信息" prop="remark">
            <el-input type="text" v-model="form.remark" placeholder="请输入job描述信息"></el-input>
        </el-form-item>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>

    </el-form>


</template>
<script>
    import * as regex from "@/utils/regex";

    export default {
        name: 'batchJobDetailAdd',

        data() {
            return {
                addUrl: "/loan/jobDetailAction.do?_md=addJobDetail",
                form: {},
            }
        },
        mounted() {
        },
        methods: {
            onSubmit() {
                const _this = this;

                this.$refs.addForm.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.post(_this.addUrl, _this.form)
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