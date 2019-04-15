<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <el-form-item label="客户编号" prop="custNo">
            <el-input v-model="addForm.custNo" ></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="custName">
            <el-input v-model="addForm.custName" ></el-input>
        </el-form-item>
        <el-form-item label="模型编号" prop="modelNo">
            <el-input v-model="addForm.modelNo" ></el-input>
        </el-form-item>
        <el-form-item label="客户类型" prop="custType">
            <el-input v-model="addForm.custType" ></el-input>
        </el-form-item>
        <el-form-item label="申请日期" prop="applyBeginDate">
            <el-input v-model="addForm.applyBeginDate" ></el-input>
        </el-form-item>
        <el-form-item label="上次评定等级" prop="lastGrade">
            <el-input v-model="addForm.lastGrade" ></el-input>
        </el-form-item>
        <el-form-item label="客户经理" prop="custMgrId">
            <el-input v-model="addForm.custMgrId" ></el-input>
        </el-form-item>
        <el-form-item label="主管机构" prop="custOrgId">
            <el-input v-model="addForm.custOrgId" ></el-input>
        </el-form-item>
        <el-form-item label="登记人" prop="creditUser">
            <el-input v-model="addForm.creditUser" ></el-input>
        </el-form-item>
        <el-form-item label="登记机构" prop="creditOrg">
            <el-input v-model="addForm.creditOrg" ></el-input>
        </el-form-item>
        <el-form-item label="登记日期" prop="creditTime">
            <el-date-picker
                    v-model="addForm.creditTime"
                    type="datetime"
                    placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit(addForm)">提交</el-button>
            <el-button type="primary" @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'CcgApplyAdd',
        data() {
            return {
                addForm: {
                    custNo: '',
                    custName: '',
                    modelNo: '',
                    custType:'',
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            onSubmit(formName) {
                this.$http.post("/loan/applyAction.do?_md=insertApply",{apply:addForm})
                    .then((response) => {
                        if(response.success){
                            this.$message.success(response.msg);
                            this.$emit('refreshTable');
                            this.$emit('closeDialog');
                        }else{
                            this.$message.error(response.msg);
                        }
                    })
                    .catch((response) => {
                        this.$message.error('删除失败!');
                    });
            },
            onCancel() {
                this.$emit('closeDialog');
            }
        }
    };
</script>