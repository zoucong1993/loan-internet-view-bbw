<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="24" >
                    <el-form-item label="冻结解冻原因" prop="bizReason">
                        <el-input type="textarea" v-model="form.bizReason" :readonly="readonly"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default{
        components: {},
        name: "freezeFrom",
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