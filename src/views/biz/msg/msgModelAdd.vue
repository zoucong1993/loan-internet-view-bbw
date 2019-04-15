<template>
    <el-form :model="msgModelAddForm" :rules="rules" ref="msgModelAddForm" label-width="100px">
        <el-row type="left" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="使用场景" prop="msgScene">
                    <elx-select v-model="msgModelAddForm.msgScene" selectKey="STD_MSG_SCENE">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="模板名称" prop="msgModelName">
                    <el-input v-model="msgModelAddForm.msgModelName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="left" class="row-bg" justify="space-around">
            <el-col :span="21">
                <el-form-item label="短信内容" prop="msgContent">
                    <el-input type="textarea" v-model="msgModelAddForm.msgContent" :autosize="{ minRows:5}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="center" class="row-bg" justify="space-around">
            <el-col :span="21">
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="msgModelAddForm.remark" :autosize="{ minRows:5}">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
    export default {
        name: 'msgModelAddForm',
        props: {},
        data() {
            return {
                msgModelAddForm:{
                    createUser:this.$sessionStorage.getLoginUser().userName,
                    createOrg: this.$sessionStorage.getLoginUser().orgName
                },
                rules: {
                    msgScene: [
                        {required: true, message: '请输入使用场景', trigger: 'blur'}
                    ],
                    msgModelName: [
                        {required: true, message: '请输入模板名称', trigger: 'blur'}
                    ],
                    msgContent: [
                        {required: true, message: '请输入短信内容', trigger: 'blur'}
                    ]
                        },
                visible: false,
                fineVisible: false
            };
        },
        components: {},
        watch: {},
        mounted: function () {
            console.info(this.$sessionStorage.getLoginUser().userName),
            console.info(this.$sessionStorage.getLoginUser().orgName)
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.msgModelAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/msgManageAction.do?_md=addMsgModel", _this.msgModelAddForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("addMsgModelDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("新增成功！")
                                } else {
                                    _this.$error(response.msg);
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    }
                });
            },
            /*resetForm() {
                this.$refs.prdRateBaseAddForm.resetFields();
            }*/
        }

    };
</script>