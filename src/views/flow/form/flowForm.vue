<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="8" >
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" :readonly="readonly"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" >
                    <el-form-item label="性别" prop="sex">
                        <el-input v-model="form.sex" :readonly="readonly"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" >
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="form.age" :readonly="readonly"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="24" >
                    <el-form-item label="建议" prop="comment">
                        <el-input type="textarea" v-model="form.comment" :readonly="readonly"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default{
        components: {},
        name: "flowFrom",
        props: {
            form: Object,
            readonly: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                rules: {
                    sex: [
                        {required: true, message: '性别不能为空'}
                    ], age: [
                        {required: true, message: '年龄不能为空'}
                    ], name: [
                        {required: true, message: '姓名不能为空'}
                    ],
                }
            }
        },
        methods: {
            gainChildRules() {
               this.$emit("gainChildRules", this.rules);
            }
        },
        created() {
            this.gainChildRules()
        },
    }
</script>