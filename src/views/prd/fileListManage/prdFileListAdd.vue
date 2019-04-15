<template>

    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="120px">
        <el-card class="box-card is-never-shadow">
            <div slot="header" class="clearfix">
                <span>档案列表</span>

            </div>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="24">
                    <el-form-item label="项目名称" prop="itemName">
                        <el-input v-model="addForm.itemName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="24">
                    <el-form-item label="检查说明" prop="itemDesc" class="el-form-reason" >
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 6}"
                                v-model="addForm.itemDesc">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
        <div slot="footer" class="dialog-footer" align="right">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button type="danger" @click="showVisible = false">取 消</el-button>
        </div>
    </el-form>
</template>
<script>
    export default {
        name: 'addForm',
        components: {},
        props: {
            addUrl: String
        },
        data() {
            return {
                addForm: {},
                rules: {
                    itemName: [
                        {required: true, message: '项目名称不能为空'}
                    ],
                },
                showVisible: false,
            }
        },
        mounted: function () {
        },
        methods: {
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            },
            onSubmit() {
                let result;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        result = true;
                        this.saveAdd();
                    } else {
                        result = false;
                        return false;
                    }
                });
            },
            saveAdd() {
                const _this = this;
                this.$http.post(this.addUrl,
                    this.addForm).then(
                    function (response) {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.addResult = response.data;
                            _this.$emit('addSuccess', _this.addResult);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog', _this.addResult);
                        } else {
                            _this.$error(response.msg);
                        }
                    }
                ).catch(function (error) {
                    _this.$error(error.message);
                });
            },
            resetForm() {
                this.$refs.addForm.resetFields();
            }

        }
    };
</script>
