<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="120px">
        <el-card class="box-card is-never-shadow">
            <div slot="header" class="clearfix">
                <span>档案列表</span>

            </div>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="12">
                    <el-form-item label="项目编号" prop="itemId">
                        <el-input v-model="updateForm.itemId" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="项目名称" prop="itemName">
                        <el-input v-model="updateForm.itemName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="24">
                    <el-form-item label="检查说明" prop="itemDesc" class="el-form-reason">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 6}"
                                v-model="updateForm.itemDesc">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="submitForm('updateForm')">保存</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>
</template>
<script>
    import clientInfoList from './clientInfoList'
    
    export default {
        name: 'prdFileListUpdate',
        components: {
            clientInfoList,
       
        },
        props: {
            updateUrl: String,
            data:{}
        },
        data() {
            return {
                updateForm: this.$props.data,
                rules: {
                    itemId: [
                        {required: true, message: '项目编号不能为空'}
                    ],
                    itemName: [
                        {required: true, message: '项目名称不能为空'}
                    ],
                },
                showVisible: false,
                viewVisible: false,
                viewVisible2: false,
            }
        },
        methods: {
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        _this.$http.post("/loan/prdFileListAction.do?_md=updatePrdFileListByPrimaryKey", _this.updateForm)
                            .then(function (response) {
                                if (response.success) {
                                    _this.$success("保存成功!");
                                    _this.$emit('refreshTable');
                                    _this.$emit('closeDialog');
                                } else {
                                    _this.$error(response.msg)
                                }
                            })
                            .catch(function (error) {
                                _this.$error(error);
                            });
                    } else {
                        _this.$error(response.msg);
                    }
                });
            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            },
            custUserSelect() {

                const rows = this.$refs.userInfoList.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    this.updateForm.createUser = {...rows[0]}.empName
                    _this.viewVisible2 = false;
                }
            }
        }
    };
</script>
