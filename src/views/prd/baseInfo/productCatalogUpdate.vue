<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="100px">
        <!--<el-form-item label="id" prop="id">
            <el-input v-model="updateForm.id"></el-input>
        </el-form-item>-->
        <!--<el-form-item label="父ID" prop="parentCatId">-->
            <!--<el-input v-model="updateForm.parentCatId"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="目录名称" prop="catName">
            <el-input v-model="updateForm.catName"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="catOrder">
            <el-input v-model="updateForm.catOrder"></el-input>
        </el-form-item>
        <!--<el-form-item label="目录ID" prop="catId" disabled>-->
            <!--<el-input v-model="updateForm.catId"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="有效状态" prop="inUseFlag">
            <elx-select v-model="updateForm.inUseFlag" selectKey="STD_VALID_STS"></elx-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('updateForm')">提交</el-button>
            <el-button type="primary" @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";
    export default {
        name :'productCatalogUpdate',
        props : {
            catalog:{},
            updateCatalogUrl :String
        },
        data (){
            return{
                updateForm:this.catalog,
                rules :{
                    catName: [
                        {required: true, message: '请输入目录名称', trigger: 'blur'}
                    ],
                    catOrder: [
                        {required: true, message: '请输入序号', trigger: 'blur'},
                        {pattern: regex.posInteExp, message: "请输入正整数"}
                    ],
                    inUseFlag: [
                        {required: true, message: '请输入有效状态', trigger: 'blur'}
                    ],
                }
            }

        },
        methods :{
            onSubmit(a){
                console.log(this.updateCatalogUrl);
                const _this = this;
                this.$refs[a].validate(valid => {

                    if(!valid){
                        return false;
                    }
                    this.$http
                        .post(this.updateCatalogUrl,
                            this.updateForm,
                        )
                        .then(function (response) {
                            console.log(response.success);
                            if (response.success) {
                                _this.$emit('refreshLeftTree');
                                _this.$emit('refreshTable');
                                _this.$emit('closeDialog');
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                        .catch(function (error) {
                            _this.$error(error.message);
                        });
                });
            },
            onCancel(){
                this.$success("已取消");
                this.$emit('closeDialog');
            }
        }
    }
</script>