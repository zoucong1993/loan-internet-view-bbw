<template>
       <el-form :model="prdOrgRelAddForm" :rules="rules" ref = "prdOrgRelAddForm" label-width="120px">
            <el-form-item label="产品" prop="prdCode">
                <elx-select-tree type="text" v-model="prdOrgRelAddForm.prdCode" size="small" :url="prdUrl"
                                 :disabled="true"></elx-select-tree>
            </el-form-item>
            <el-form-item label="机构" prop="orgId">
                <elx-select-tree type="text" v-model="prdOrgRelAddForm.orgId" :url="selectOrgTreeUrl">
                </elx-select-tree>
            </el-form-item>
            <el-form-item label="适用范围" prop="applyScope">
                <el-input type="text" v-model="prdOrgRelAddForm.applyScope">
                </el-input>
            </el-form-item>
            <el-form-item label="包含关系" prop="includeType">
                <el-input  type="text" v-model="prdOrgRelAddForm.includeType">
                </el-input>
            </el-form-item>
        </el-form>
</template>
<script>
    export default {
        name:'prdOrgRelAddForm',
        props: {
            prdCode: String
        },
        data() {
            return {
                prdOrgRelAddForm: {
                    prdCode: this.prdCode
                },
                rules: {
                    prdCode: [
                        { required: true, message: '请选择产品', trigger: 'blur'}
                    ],
                    orgId: [
                        { required: true, message: '请选择机构', trigger: 'blur'}
                    ],
                    applyScope: [
                         { required: true, message: '请填写适用范围',trigger: 'blur'}
                    ],
                    includeType: [
                         { required: true, message: '请选择包含关系',trigger: 'blur'}
                    ]
                },
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                selectOrgTreeUrl: "/loan/orgAction.do?_md=findAllVueTree",
            };
        },
        components: {},
        watch : {},
        mounted: function() {},
        methods: {
            submitForm() {
                const _this = this;
                this.$refs.prdOrgRelAddForm.validate(valid => {
                    if (!valid) {
                        console.log("请检查表单！");
                    }else{
                        this.$http.post("/loan/prdOrgRelAction.do?_md=addPrdOrgRel", _this.prdOrgRelAddForm)
                        .then(function(response) {
                            if (response.success) {
                                 _this.$emit("addPrdOrgRelDialog");
                                 _this.$emit("refreshTable");
                                 _this.$success("新增成功！")
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                        .catch(function(error) {
                             _this.$error(error);
                        });
                    }
                });
            },
            resetForm() {
                this.$refs.prdOrgRelAddForm.resetFields();
            }
        }
        
    };
</script>