<template>
    <el-form ref="viewForm" :model="viewForm" label-width="100px" disabled>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="job名称" prop="jobName">
                    <el-input v-model="viewForm.jobName">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="切分数据的步长" prop="perCount">
                    <el-input v-model="viewForm.perCount"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label="汇总sql" prop="summarySql">
                    <el-input v-model="viewForm.summarySql" type="textarea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label="切分sql" prop="perSql">
                    <el-input v-model="viewForm.perSql" type="textarea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="创建人" prop="createUser">
                    <el-input v-model="viewForm.createUser"/>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="创建时间" prop="createTime">
                    <el-date-picker
                            v-model="viewForm.createTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy年MM月dd日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="更新人" prop="updateUser">
                    <el-input v-model="viewForm.updateUser"/>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="更新时间" prop="updateDate">
                    <el-date-picker
                            v-model="viewForm.updateTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy年MM月dd日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
</template>
<script>
    export default {
        components: {},
        name: 'distConfigView',
        props: {
            distConfigList: Object
        },
        data() {
            return {
                viewForm: this.distConfigList,
            }
        },
        methods: {}
    };
</script>