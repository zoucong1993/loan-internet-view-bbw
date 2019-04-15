<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="24">
                    <el-form-item label="降级原因" prop="lowReason">
                        <el-input type="textarea" v-model="form.lowReason" :readonly="readonly"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        components: {},
        name: "riskClassAdjustForm",
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
                    lowReason: [
                        {required: true, message: '原因不能为空'}
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