<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="130px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8" v-if="false">
                <el-form-item label="渠道编码" prop="chanCode">
                    <el-input v-model="updateForm.chanCode" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="渠道名称" prop="chanName">
                    <el-input v-model="updateForm.chanName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="产品名称" prop="prdCode">
                    <elx-select-tree v-model="updateForm.prdCode" :url="selectTreeUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="产品状态" prop="sts">
                    <elx-select v-model="updateForm.sts" selectKey="STD_PRD_STATE"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="updateForm.remark"></el-input>
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
        name: 'channelPrdRelUpdate',
        props: {
            channelPrdRel:{}
        },
        data() {
            return {
                updateForm: this.channelPrdRel,
                selectTreeUrl:"/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                rules: {
                    chanCode: [
                        {required: true, message: '渠道编码不能为空'}
                    ],
                    chanName: [
                        {required: true, message: '渠道名称不能为空'}
                    ],
                    prdCode: [
                        {required: true, message: '产品编码不能为空'}
                    ]
                },
            }
        },
        methods: {
            onSubmit() {
                const _this = this;
                this.$refs.updateForm.validate(valid => {
                    if(!valid){
                        return false;
                    }
                    this.$http.post("/loan/channelAction.do?_md=updatePrdRelDetail",_this.updateForm)
                        .then((response) => {
                            if(response.success){
                                _this.$success(response.msg);
                                _this.$emit('refreshTable');
                                _this.$emit('closeDialog');
                            }else{
                                _this.$error(response.msg);
                            }
                        })
                        .catch((error) => {
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