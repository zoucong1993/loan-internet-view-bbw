<template>
    <el-form :model="msgModelViewForm" :rules="rules" ref="msgModelViewForm" label-width="100px">
        <el-row type="left" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="使用场景" prop="msgScene">
                    <elx-select v-model="msgModelViewForm.msgScene" selectKey="STD_MSG_SCENE" :disabled="disabled">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="模板名称" prop="msgModelName">
                    <el-input v-model="msgModelViewForm.msgModelName" :disabled="disabled" >
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="center" class="row-bg" justify="space-around">
            <el-col :span="21">
                <el-form-item label="短信内容" prop="msgContent">
                    <el-input type="textarea" v-model="msgModelViewForm.msgContent" :disabled="disabled" :autosize="{ minRows:5}">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="center" class="row-bg" justify="space-around">
            <el-col :span="21">
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="msgModelViewForm.remark" :disabled="disabled" :autosize="{ minRows:5}">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
    export default {
        name: 'msgModelUpdateForm',
        props: {
            row:{},
            operate:'',
        },
        data() {
            return {
                msgModelViewForm: this.row,
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
                disabled:this.operate === 'view'?true :false,
                visible: true,
                fineVisible: true
            };
        },
        components: {},
        watch: {},
        mounted: function () {
            this.msgModelViewForm = this.row
            this.msgModelViewForm.updateUser = this.$sessionStorage.getLoginUser().userName
            this.msgModelViewForm.updateOrg = this.$sessionStorage.getLoginUser().orgName

        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.msgModelViewForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/msgManageAction.do?_md=updateByMsgModelCode", _this.msgModelViewForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("viewMsgModelDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("修改成功！")
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
            resetForm() {
                this.$refs.msgModelViewForm.resetFields();
            }
        }

    };
</script>