<template>
    <div>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="8">
            <el-form-item label-width="110px" label="产品名称" prop="prdName">
                <elx-select v-model="prdName" selectKey="STD_PRD_STATE" :disabled="true"></elx-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label-width="110px" label="使用场景" prop="msgScene">
                <elx-select v-model="addForm.msgScene" selectKey="STD_MSG_SCENE"></elx-select>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label-width="110px" label="成功短信模板" prop="sucModelCode">
                    <el-input v-model="sucModelCodeName" readonly="true">
                        <el-button icon="el-icon-search" slot="append" @click="getMsgModel('success')">
                        </el-button>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item  label-width="110px" label="失败短信模板" prop="failModelCode">
                    <el-input v-model="failModelCodeName" readonly="true">
                        <el-button icon="el-icon-search" slot="append" @click="getMsgModel('failed')">
                        </el-button>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label-width="110px" label="备注" prop="remark">
                    <el-input type="textarea" v-model="addForm.remark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
        <el-dialog title="选择"
                   :visible.sync="msgModelDialog"
                   v-if="msgModelDialog"
                   append-to-body="true"
                   width="70%">
            <msg-manage-list
                    :msgModelRelFlag="msgModelRelFlag"
                    @closeRelDialog="msgModelDialog = false"
                    @getRows="getRows"
            >
            </msg-manage-list>
        </el-dialog>
        <div align="center">
            <el-button size="mini" type="success" icon="el-icon-check"
                       @click="onsubmit">确定
            </el-button>
            <el-button size="mini" type="primary" icon="el-icon-close"
                       @click="claseAddDialog">取消
            </el-button>
        </div>
    </div>
</template>

<script>

    import msgManageList from '@/views/biz/msg/msgManageList';

    export default {
        name: "msgModelRelAdd",
        props: {
            prdName: String,
            prdCode: String,
        },
        components:{
            msgManageList,
        },
        data () {
            return {
                addForm:{
                    sucModelCode: '',
                    failModelCode: '',
                    sucModelCodeName: '',
                    msgScene: '',
                    prdCode: this.prdCode,
                },
                sucModelCodeName: '',
                failModelCodeName: '',
                prdName: this.prdName,
                msgModelDialog: false,
                msgModelRelFlag: 'rel',
                flag: '',
                rules :{
                    sucModelCode: [
                        {required: true, message: '请输入目录名称', trigger: 'blur'},
                    ],
                    msgScene: [
                        {required: true, message: '请输入序号', trigger: 'change'},
                    ],
                },
            }
        },
        methods:{
            onsubmit(){
                const _this = this
                _this.$refs.addForm.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.post(
                        '/loan/bizMsgModelRelAction.do?_md=installMsgModeRel',
                        _this.addForm
                    )
                        .then(function (response) {
                            if (response.success) {
                                _this.claseAddDialog()
                                _this.$success('新增成功')
                                _this.$emit('refresh')
                            } else {
                                _this.$error('新增失败')
                            }
                        }, function (error) {
                            _this.$error(error.message);
                        })
                })
            },
            getMsgModel(val) {
                this.msgModelDialog = true
                this.flag = val

            },
            getRows(val) {
                if (this.flag === 'success') {
                    this.addForm.sucModelCode = val.msgModelCode
                    this.sucModelCodeName = val.msgModelName

                } else if (this.flag === 'failed') {
                    this.addForm.failModelCode = val.msgModelCode
                    this.failModelCodeName = val.msgModelName
                }
            },
            claseAddDialog() {
                this.$emit('closeDialog')
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
