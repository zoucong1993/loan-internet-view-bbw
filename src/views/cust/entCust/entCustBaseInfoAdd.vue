<template>
    <el-dialog title ="新增对公客户" :visible.sync = "visible" >
        <el-form ref = "entCustAddForm" :model="entCustAddForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="客户类型" >
               <el-cascader code="20000" expand-trigger="hover"  v-model = "entCustAddForm.custType" :show-all-levels="false">
               </el-cascader>
            </el-form-item>
            <el-form-item label="客户名称" >
                <el-input v-model="entCustAddForm.custName" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('entCustAddForm')">立即创建</el-button>
                <el-button @click="resetForm('entCustAddForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        name:'entCustAddForm',
        data() {
            return {
                visible:true,
                entCustAddForm: {
                    custType: [],
                    custName: ""
                },
                options:[]
            };
        },
        components: {
            elCascader
        },
        methods: {
            submitForm(formName) {
                alert(this.entCustAddForm.custType)
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        alert("submit!");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
        
    };
</script>