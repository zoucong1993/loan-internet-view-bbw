<template>
    <el-form ref="addForm" :model="addForm" label-width="100px" disabled>
        <el-form-item label="工作组编码" prop="groupCode">
            <el-input v-model="addForm.groupCode" placeholder="请输入工作组编码">
            </el-input>
        </el-form-item>
        <el-form-item label="工作组名称" prop="groupName">
            <el-input v-model="addForm.groupName"></el-input>
        </el-form-item>
        <el-form-item label="描述信息" prop="remark">
            <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        components: {},
        name: 'jobTaskView',
        props: {
            jobTaskList: {}
        },
        data() {
            return {
                addForm: this.jobTaskList,
            }
        },
        methods: {}
    };
</script>