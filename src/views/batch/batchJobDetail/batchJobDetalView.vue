<!--liuyang-->
<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px" disabled>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="job名称" prop="jobName">
                    <el-input type="text" v-model="data.jobName" placeholder="请输入job名称"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="job类型" prop="jobType">
                    <elx-select v-model="data.jobType" selectKey="JOBTYPE"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="交易日期类型" prop="trandateType">
                    <elx-select v-model="data.trandateType" selectKey="TRANDATETYPE"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="执行周期" prop="executePeriod">
                    <elx-select v-model="data.executePeriod" selectKey="EXECUTETYPE"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="job描述信息" prop="remark">
                    <el-input type="text" v-model="data.remark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
    export default {
        name: "jobDetailView",
        props: {
            data: Object
        },
        method: {}
    };
</script>