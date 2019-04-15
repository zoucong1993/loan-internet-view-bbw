<template>
    <el-card class="box-card" shadow="never">
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="12" :offset="5">
                    <el-form-item label="系统认定结果">
                        <elx-select type="text" v-model="form.sysLevel" size="small" selectKey="STD_ZB_FIVE_SORT"
                                    disabled></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="12" :offset="5">
                    <el-form-item label="人工认定结果" prop="manLevel">
                        <elx-select v-model="form.manLevel" size="small" selectKey="STD_ZB_FIVE_SORT"
                        ></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div align="center" style="margin-top: 15px;">
                <el-button type="primary" @click.native="commit">提交</el-button>
                <el-button type="info" @click="cancel">取消</el-button>
            </div>
        </el-form>
    </el-card>
</template>

<script>


    export default {
        name: "riskClassAdjustApprove",
        props: {
            form: Object,
        },
        data() {
            return {
                rules: {
                    manLevel: [
                        {required: true, message: '人工认定结果不能为空'}
                    ]
                },
            }
        },

        methods: {
            commit() {
                this.$refs.form.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    if (parseInt(this.form.sysLevel) >= parseInt(this.form.manLevel)) {
                        this.$error("只能发起降级审批!");
                        return false;
                    }
                    const _this = this;
                    this.$http.post("/loan/activityAction.do?_md=publisActiviti", {
                        processDefinitionKey: "risk_class_adjust",
                        businessKey: this.form.duebillNo,
                        busiInfo: "风险分类审批",
                        assignee: this.$sessionStorage.getLoginUser().user.userName,
                        custNo: this.form.custNo,
                        custName: this.form.custName
                    }).then(response => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$emit('closeDialog');
                            _this.$emit('refreshTable');
                            _this.$emit('updateDialog', response.data);
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                        .catch((error) => {
                            _this.$error(error.message);
                        });
                })
            },
            cancel() {
                this.$emit('closeDialog');
            }
        }
    }
</script>
