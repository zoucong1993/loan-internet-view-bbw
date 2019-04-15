<template>
    <el-form :model="updateForm" :rules="rules" ref="updateForm"
             label-width="140px">


        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col>
                <el-form-item label="机构更改" prop="orgChange">
                    <elx-select-tree type="text" v-model="updateForm.orgChange" :url="selectUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
        </el-row>

        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>


    </el-form>
</template>
<script>
    export default {
        name: 'loanContractOrgChange',
        props: {
            row: {
                type: Array,
                default: []

            }
        },
        data() {
            return {
                selectUrl: "/loan/orgAction.do?_md=findAllVueTree",
                updateUrl1: "/loan/loanContractAction.do?_md=updateCustOrgByContNo",
                updateUrl2: "/loan/creditApplyAction.do?_md=updateCustOrgByApplyNo",
                updateUrl3: "/loan/creditAgreeAction.do?_md=updateCustOrgByApplyNo",
                updateUrl4: "/loan/loanDuebillAction.do?_md=updateCustOrgByContNo",
                updateUrl5: "/loan/repayAction.do?_md=updateCustOrgByContNo",
                updateUrl6: "/loan/payoutApplyAction.do?_md=updateCustOrgByContNo",
                updateForm: {},
                rules: {},
                orgChange: '',

            };
        },
        mounted: function () {

        },
        methods: {
            onSubmit() {
                const _this = this;
                _this.$refs.updateForm.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    let arry = new Array();
                    for (let i = 0; i < _this.row.length; i++) {
                        arry[i] = {
                            "contNo": _this.row[i].contNo,
                            "custOrg": _this.updateForm.orgChange,
                            "custNo": _this.row[i].custNo,
                            "applyNo": _this.row[i].applyNo,
                            "updateOrg": _this.updateForm.orgChange
                        };
                    }
                    //贷款出账表
                    this.$http.post(_this.updateUrl1, {"contracts": arry}
                    ).then(function (response) {
                        console.log(response.success);
                        if (response.success) {
                            _this.$success("修改成功!");
                            _this.$emit('closeDialog');
                            _this.$emit('refreshTable');
                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch(function (error) {
                        _this.$error(error.message);
                    });
                });

            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            }
        }
    };
</script>