<template>
       <el-form :model="prdOrgRelUpdateForm" :rules="rules" ref = "prdOrgRelUpdateForm" label-width="140px">
           <el-form-item label="产品" prop="prdCode">
               <elx-select-tree type="text" v-model="prdOrgRelUpdateForm.prdCode" size="small" :url="prdUrl"
                                :disabled="true"></elx-select-tree>
            </el-form-item>
            <el-form-item label="机构" prop="orgId">
                <elx-select-tree type="text" v-model="prdOrgRelUpdateForm.orgId" :disabled="disabled"
                                 :url="selectOrgTreeUrl">
                </elx-select-tree>
            </el-form-item>
            <el-form-item label="适用范围" prop="applyScope">
                <el-input type="text" v-model="prdOrgRelUpdateForm.applyScope" :disabled="disabled">
                </el-input>
            </el-form-item>
            <el-form-item label="包含关系" prop="includeType">
                <el-input  type="text" v-model="prdOrgRelUpdateForm.includeType" :disabled="disabled">
                </el-input>
            </el-form-item>
        </el-form>
</template>
<script>
    export default {
        name:'prdOrgRelUpdateForm',
        props:{
            row:{
                type:Object,
                default:{}
            },
            operate:String
        },
        data() {
            return {
                prdOrgRelUpdateForm: this.row,
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
                disabled: this.operate === "view" ? true : false,
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                selectOrgTreeUrl: "/loan/orgAction.do?_md=findAllVueTree",
            };
        },
        methods: {      
            submitForm() {
                const _this = this;
                this.$refs.prdOrgRelUpdateForm.validate(valid => {
                    if (valid) {
                        this.$http.post("/loan/prdOrgRelAction.do?_md=updatePrdOrgRelById", _this.prdOrgRelUpdateForm)
                        .then(function(response) {
                            if (response.success) {
                                _this.$emit("updatePrdOrgRelDialog");
                                _this.$emit("refreshTable");
                                _this.$success("修改成功！");
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                        .catch(function(error) {
                             _this.$error(error);
                        });
                    } else {
                        _this.$error("表单填写不正确，请重新确认！");
                    }
                });
            },
            resetForm() {
                this.$refs.prdOrgRelUpdateForm.resetFields();
            }
        }
        
    };
</script>