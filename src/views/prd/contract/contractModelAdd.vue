<template>
    <el-form :model="contractModelAddForm" :rules="rules" ref="contractModelAddForm" label-width="120px">
        <el-form-item label="模板类型" prop="modelType">
            <elx-select type="text" v-model="contractModelAddForm.modelType" selectKey="HTMBLX">
            </elx-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="modelName">
            <el-input type="text" v-model="contractModelAddForm.modelName">
            </el-input>
        </el-form-item>
        <el-form-item label="模板状态" prop="sts">
            <elx-select type="text" v-model="contractModelAddForm.sts" selectKey="HTMBZT" :aria-readonly="true">
            </elx-select>
        </el-form-item>
        <el-form-item label="模板文件">
            <input @change="uploading($event)" type="file" v-if="clearShow"/>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'contractModelAddForm',
        props: {},
        data() {
            return {
                contractModelAddForm: {
                    modelType: "01",
                    sts: "01"
                },
                rules: {
                    modelType: [
                        {required: true, message: '请选择模板类型', trigger: 'blur'}
                    ],
                    modelName: [
                        {required: true, message: '请填写模板名称', trigger: 'blur'}
                    ]
                },
                file: "",
                fileList: [],
                clearShow: true
            };
        },
        components: {},
        watch: {},
        mounted: function () {
        },
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.contractModelAddForm.validate(valid => {
                    if (valid) {
                        let formdata = new FormData();
                        formdata.append("modelType", this.contractModelAddForm.modelType);
                        formdata.append("modelName", this.contractModelAddForm.modelName);
                        formdata.append("sts", this.contractModelAddForm.sts);
                        formdata.append("file", this.file);
                        // this.clearShow = false;
                        this.$http.post("/loan/contractModelAction.do?_md=addContractModel", formdata, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }).then(function (response) {
                                if (response.success) {
                                    // this.clearShow = true;
                                    this.$emit("addContractModelDialog");
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
            uploading($event) {
                let a = this.beforeAvatarUpload($event.target.files[0]);
                if (a) {
                    this.file = $event.target.files[0];
                } else {
                    return;
                }
            },
            beforeAvatarUpload(file) {
                const isPdf = file.type === 'application/pdf';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isPdf) {
                    this.$error('上传文件只能是 PDF 格式!');
                }
                if (!isLt2M) {
                    this.$error('上传文件大小不能超过 2MB!');
                }
                return isPdf && isLt2M;
            },
            resetForm() {
                this.$refs.contractModelAddForm.resetFields();
            }
        }

    };
</script>