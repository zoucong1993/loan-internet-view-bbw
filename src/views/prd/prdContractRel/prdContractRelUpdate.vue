<template>
    <el-form :model="prdContractRelUpdateForm" :rules="rules" ref="prdContractRelUpdateForm" label-width="140px">
        <el-form-item label="产品编号" prop="prdCode">
            <elx-select-tree type="text" v-model="prdContractRelUpdateForm.prdCode" size="small" :url="prdUrl"
                             :disabled="true"></elx-select-tree>
        </el-form-item>
        <el-form-item label="合同模板编号" prop="rateCode">
            <el-select v-model="prdContractRelUpdateForm.modelNo" placeholder="请选择">
                <el-option
                        v-for="item in contractOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="渠道码" prop="chanCode">
            <el-select v-model="prdContractRelUpdateForm.chanCode" placeholder="请选择">
                <el-option
                        v-for="item in channelOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'prdContractRelUpdateForm',
        props: {
            row: {
                type: Object,
                default: {}
            },
            operate: String
        },
        data() {
            return {
                prdContractRelUpdateForm: this.row,
                rules: {
                    prdCode: [
                        {required: true, message: '请填写产品编号', trigger: 'blur'}
                    ],
                    modelNo: [
                        {required: true, message: '请填写合同模板编号', trigger: 'blur'}
                    ],
                    chanCode: [
                        {required: true, message: '请填写渠道码', trigger: 'blur'}
                    ]
                },
                disabled: this.operate === "view" ? true : false,
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                contractOptions: [],
                channelOptions: []
            };
        },
        mounted: function () {
            this.initOptions();
        },
        methods: {
            initOptions() {
                const _this = this;
                this.$http.post("/loan/contractModelAction.do?_md=findAllContractModels")
                    .then(function (response) {
                        if (response.success) {
                            _this.contractOptions = response.data;
                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch(function (error) {
                    _this.$error(error);
                });
                this.$http.post("/loan/channelAction.do?_md=findAllPrdChannels")
                    .then(function (response) {
                        if (response.success) {
                            _this.channelOptions = response.data;
                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch(function (error) {
                    _this.$error(error);
                });
            },
            submitForm() {
                const _this = this;
                this.$refs.prdContractRelUpdateForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/prdContModelRelAction.do?_md=updatePrdContModelRelById", _this.prdContractRelUpdateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("updatePrdContractRelDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("修改成功！");
                                } else {
                                    _this.$error(response.msg);
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    } else {
                        return;
                    }
                });
            },
            resetForm() {
                this.$refs.prdContractRelUpdateForm.resetFields();
            }
        }

    };
</script>