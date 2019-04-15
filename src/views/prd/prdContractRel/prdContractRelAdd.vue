<template>
    <el-form :model="prdContracRelAddForm" :rules="rules" ref="prdContracRelAddForm" label-width="120px">
        <el-form-item label="产品" prop="prdCode">
            <elx-select-tree type="text" v-model="prdContracRelAddForm.prdCode" size="small" :url="prdUrl"
                             :disabled="true"></elx-select-tree>
        </el-form-item>
        <el-form-item label="合同模板编号" prop="rateCode">
            <el-select v-model="prdContracRelAddForm.modelNo" placeholder="请选择">
                <el-option
                        v-for="item in contractOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="渠道码" prop="chanCode">
            <el-select v-model="prdContracRelAddForm.chanCode" placeholder="请选择">
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
        name: 'prdContracRelAddForm',
        props: {
            prdCode: String
        },
        data() {
            return {
                prdContracRelAddForm: {
                    prdCode: this.prdCode
                },
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
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                contractOptions: [],
                channelOptions: []
            };
        },
        components: {},
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
                this.$refs.prdContracRelAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    } else {
                        this.$http.post("/loan/prdContModelRelAction.do?_md=addPrdContModelRel", _this.prdContracRelAddForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$emit("addPrdContractRelDialog");
                                    _this.$emit("refreshTable");
                                    _this.$success("新增成功！")
                                } else {
                                    _this.$error(response.msg);
                                }
                            }).catch(function (error) {
                            _this.$error(error);
                        });
                    }
                });
            },
            resetForm() {
                this.$refs.prdContracRelAddForm.resetFields();
            }
        }

    }
</script>