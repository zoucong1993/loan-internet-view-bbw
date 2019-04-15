<template>
            <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="10" >
                        <el-form-item label="方案编号" prop="schemeId">
                            <el-input type="text" v-model="form.schemeId" >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="方案描述" prop="schemeDesc">
                            <el-input type="text" v-model="form.schemeDesc" >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="10" >
                        <el-form-item v-if="false" label="方案分类" prop="itemType">
                            <elx-select selectKey="STD_ZB_ITEM_TYPE" v-model="form.itemType" >
                            </elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                    </el-col>
                </el-row>
            </el-form>
</template>
<script>

    export  default {
        name: 'prdFileManSchemeAdd',
        props:
            {
                addUrl:String,
            },
        components:{
        },
        data(){
            return{
                addVisible:false,
                form: {},
                rules: {
                    schemeId:[{
                        required:true,message:'方案编号不能为空'
                    }],
                    schemeDesc:[{
                        required:true,message:'方案描述不能为空'
                    }],
                    itemType:[{
                        required:true,message:'方案分类不能为空'
                    }],
                },
            }
        },
        mounted:function () {
        },
        methods:{

            onSubmit() {
                let result;
                this.$refs.form.validate((valid) => {
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
                    this.form).then(
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
            onCancel(){
                this.$success("已取消");
                this.$emit('closeDialog');

            },

        }
    };
</script>