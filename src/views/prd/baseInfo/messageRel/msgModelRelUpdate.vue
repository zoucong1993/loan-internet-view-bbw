<template>
    <div>
        <div>
            <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="100px">
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label-width="110px" label="产品名称" prop="prdName">
                            <elx-select v-model="prdName" selectKey="STD_PRD_STATE" :disabled="true"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="110px" label="使用场景" prop="msgScene">
                            <elx-select v-model="updateForm.msgScene" selectKey="STD_MSG_SCENE"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label-width="110px" label="成功短信模板" prop="sucModelCodeName">
                            <el-input v-model="updateForm.sucModelCodeName" readonly="true">
                                <el-button icon="el-icon-search" slot="append" @click="getMsgModel('success')">
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="110px" label="失败短信模板" prop="failModelCodeName">
                            <el-input v-model="updateForm.failModelCodeName" readonly="true">
                                <el-button icon="el-icon-search" slot="append" @click="getMsgModel('failed')">
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex"  class="row-bg" justify="space-around">
                    <el-col :span="20">
                        <el-form-item label-width="110px" label="备注" prop="remark">
                            <el-input type="textarea" v-model="updateForm.remark"></el-input>
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
                           @click="closeAddDialog">取消
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import msgManageList from '@/views/biz/msg/msgManageList';

    export default {
        name: "msgModelRelUpdate",
        props: {
            rows: Object,
            prdName: String
        },
        components: {
            msgManageList
        },
        data() {
            return {
                updateForm:{},
                prdName: this.prdName,
                rules:{
                    sucModelCodeName: [
                        {required: true, message: '请输入目录名称', trigger: 'blur'}
                    ],
                    msgScene: [
                        {required: true, message: '请输入序号', trigger: 'change'},
                    ],
                },
                msgModelDialog: false,
                msgModelRelFlag: 'rel',
                flag: '',
            }
        },
        created(){
            this.selectMsgInfoByPrdCode()
        },
        methods:{
            onsubmit(){
                const _this = this
                _this.$refs.updateForm.validate(valid => {
                        if (!valid) {
                            return false;
                        }
                this.$http.post(
                    '/loan/bizMsgModelRelAction.do?_md=updateMsgModeRel',
                    _this.updateForm
                )
                    .then(function (response) {
                        if (response.success) {
                            _this.closeAddDialog()
                            _this.$success('修改成功')
                            _this.$emit('refresh')
                        } else {
                            _this.$error('修改失败')
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
                    this.updateForm.sucModelCode = val.msgModelCode
                    this.updateForm.sucModelCodeName = val.msgModelName

                } else if (this.flag === 'failed') {
                    this.updateForm.failModelCode = val.msgModelCode
                    this.updateForm.failModelCodeName = val.msgModelName
                }
            },
            closeAddDialog() {
                this.$emit('closeDialog')
            },
            selectMsgInfoByPrdCode(){
                const _this = this
                this.$http.post(
                    '/loan/bizMsgModelRelAction.do?_md=selectMsgInfoByPrdCode',
                    {'id': _this.rows.id}
                )
                    .then(function (response) {
                        if (response.success) {
                            _this.updateForm = response.data
                        } else {
                            _this.$error('查询失败')
                        }
                    }, function (error) {
                        _this.$error(error.message);
                    })
            }
        }
    }
</script>
