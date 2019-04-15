<template>
    <div>
        <el-form ref="viewForm" :rules="rules" :model="viewForm" label-width="100px" disabled>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="产品名称" prop="prdName">
                        <elx-select v-model="prdName" selectKey="STD_PRD_STATE"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="使用场景" prop="remark">
                        <elx-select v-model="viewForm.msgScene" selectKey="STD_MSG_SCENE"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="成功短信模板" prop="sucModelCode">
                        <el-input v-model="viewForm.sucModelCodeName">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="失败短信模板" prop="failModelCode">
                        <el-input v-model="viewForm.failModelCodeName">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <el-form-item label="成功短信编号" prop="sucModelCode">
                        <el-input v-model="viewForm.sucModelCode">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="失败短信编号" prop="failModelCode">
                        <el-input v-model="viewForm.failModelCode">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="20">
                    <el-form-item label="成功短信内容" prop="sucModelCode">
                        <el-input type="textarea" v-model="viewForm.sucModelContent" :autosize="{minRows:5}">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="20">
                    <el-form-item label="失败短信内容" prop="failModelCode">
                        <el-input type="textarea" v-model="viewForm.failModelContent" :autosize="{minRows:5}">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="20">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="viewForm.remark" :autosize="{minRows:5}" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <div align="center">
            <el-button size="mini" type="primary" icon="el-icon-close"
                       @click="claseAddDialog">关闭
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "msgModelRelView",
        props: {
            rows: Object,
            prdName: String
        },
        data () {
            return {
                viewForm: {},
                prdName: this.prdName
            }
        },
        created() {
            this.selectMsgViewByPrdCode()
        },
        methods: {
            selectMsgViewByPrdCode() {
                const _this = this
                this.$http.post(
                    '/loan/bizMsgModelRelAction.do?_md=selectMsgInfoByPrdCode',
                    {'id': _this.rows.id}
                ).then(function (response) {
                    if (response.success) {
                        _this.viewForm = response.data
                    }
                }, function (error) {
                    _this.$error(error.message);
                })
            },
            claseAddDialog() {
                this.$emit('closeDialog')
            }
        }
    }
</script>
