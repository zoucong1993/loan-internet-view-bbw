<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <el-form-item label="父目录">
            <el-input v-model="parentCat.name" :disabled="true"></el-input>
        </el-form-item>
        <!--<el-form-item label="目录ID" prop="catId">-->
            <!--<el-input v-model="addForm.catId"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="目录名称" prop="catName">
            <el-input v-model="addForm.catName"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="catOrder">
            <el-input v-model="addForm.catOrder"></el-input>
        </el-form-item>
        <el-form-item label="有效状态" prop="inUseFlag">
            <elx-select type="text" v-model="addForm.inUseFlag" selectKey="STD_VALID_STS" :disabled="true"></elx-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('addForm')">提交</el-button>
            <el-button type="primary" @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import * as regex from "@/utils/regex";
    export default {
        name :'productCatalogAdd',
        props : {
            parentCat :Object,
            addCatalogUrl :String
        },
        data (){
            return{
                addForm: {
                    inUseFlag: '1',
                    parentCatId : this.parentCat.id
                },
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
                const _this = this;
                this.$refs[a].validate(valid => {

                    if(!valid){
                        return false;
                    }
                    this.$http
                        .post(this.addCatalogUrl,
                            this.addForm,
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