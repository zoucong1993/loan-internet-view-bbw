<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="120px">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="8" :offset="2">
                <el-form-item label="产品编号" prop="prdCode">
                    <elx-select-tree v-model="updateForm.prdCode" :url="selectPrdTreeUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="最小逾期天数" prop="overMin">
                    <el-input v-model="updateForm.overMin"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="最大逾期天数" prop="overMax">
                    <el-input v-model="updateForm.overMax"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="担保方式" prop="grtType">
                    <elx-select v-model="updateForm.grtType" selectKey="STD_ZB_ASSURE_MEANS"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="分类级别" prop="classLevel">
                    <elx-select v-model="updateForm.classLevel" selectKey="STD_ZB_FIVE_SORT"></elx-select>
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
        name: 'riskClassModelUpdate',
        props: {
            updateUrl: String,
            classModel: {}
        },
        data() {
            var validateint = (rule, value, callback) => {
                setTimeout(() => {
                    if (value === '') {
                        callback(new Error('最小逾期天数不能为空'));
                    } else {
                        if (!(/^([1-9]\d*|[0]{1,1})$/.test(value))) {
                            callback(new Error('请输入正整数字值'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                updateForm: this.classModel,
                selectPrdTreeUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                rules: {
                    prdCode: [
                        {required: true, message: '产品不能为空'}
                    ],
                    overMin: [
                        { validator: validateint, trigger: 'blur' }
                    ],
                    overMax: [
                        { validator: validateint, trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            onSubmit() {
                const _this = this;
                this.$refs.updateForm.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.post(_this.updateUrl, _this.updateForm)
                        .then((response) => {
                            if (response.success) {
                                _this.$success(response.msg);
                                _this.$emit('refreshTable');
                                _this.$emit('closeDialog');
                            } else {
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